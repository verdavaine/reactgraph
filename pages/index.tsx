import styles from "../styles/Home.module.css";
import {
  useLiveQuery,
  useLoadingComplete,
  useMutation,
  useQuery,
  useWunderGraph,
} from "../components/generated/hooks";
import { useEffect, useState } from "react";
import type {
  MessagesResponse,
  MessagesResponseData,
  UserInfoResponse,
} from "../components/generated/models";
import { GetServerSideProps, NextPage } from "next";
import { Client } from "../components/generated/wundergraph.web.client";
import type { User } from "../components/generated/wundergraph.server";
import { ResponseOK } from "@wundergraph/sdk";

type Messages = MessagesResponseData["findManymessages"];

interface Props {
  messages?: Messages;
  user: User | null;
}

const Chat: NextPage<Props> = ({
  messages: serverSideMessages,
  user: serverSideUser,
}) => {
  // use the serverSideUser as the default value in case the client is not yet initialized
  const {
    user: clientSideUser,
    client: { login, logout },
    initialized,
  } = useWunderGraph();
  const user =
    typeof window !== "undefined" && initialized
      ? clientSideUser
      : serverSideUser;
  const [message, setMessage] = useState("");
  const { mutate: addMessage, response: messageAdded } = useMutation.AddMessage(
    { refetchMountedQueriesOnSuccess: true }
  );
  const { response: loadMessages, refetch: messageRefetch } =
    useQuery.Messages();
  const [messages, setMessages] = useState<Messages>(
    (user !== undefined && serverSideMessages) || []
  );
  const { response: userInfo, refetch: userRefetch } = useQuery.UserInfo();

  useEffect(() => {
    if (loadMessages.status === "ok" || loadMessages.status === "cached") {
      setMessages([
        ...(loadMessages.body.data?.findManymessages || []).reverse(),
      ]);
    }
    if (loadMessages.status === "requiresAuthentication") {
      setMessages([]);
    }
  }, [loadMessages]);

  useEffect(() => {
    if (messageAdded.status === "ok") {
      setMessage("");
    }
  }, [messageAdded]);
  return (
    <>
      <h3>Add Message</h3>
      <fieldset disabled={!user}>
        <input
          type="text"
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() =>
            addMessage({
              refetchMountedQueriesOnSuccess: true,
              input: { message: message },
            })
          }
        >
          submit
        </button>
      </fieldset>
      {user ? (
        <>
          <h3>User</h3>
          <fieldset>
            <button onClick={() => userRefetch()}>Refetch</button>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{user?.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>Roles</td>
                  <td>{JSON.stringify(user?.roles)}</td>
                </tr>
                <tr>
                  <td>Last Login</td>
                  {userInfo.status === "loading" ? (
                    <td>loading...</td>
                  ) : (
                    (userInfo.status === "ok" ||
                      userInfo.status === "cached") &&
                    userInfo.body.data?.findFirstusers?.lastlogin && (
                      <td>{userInfo.body.data?.findFirstusers?.lastlogin}</td>
                    )
                  )}
                </tr>
              </tbody>
            </table>

            <button
              onClick={async () => {
                await logout();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </fieldset>
        </>
      ) : (
        <div>
          <p>
            <em>Please Login to be able to use the chat!</em>
          </p>

          <button onClick={() => login.github()}>Login Github</button>
          {process.env.NODE_ENV !== "development" ? (
            <button onClick={() => login.google()}>Login Google</button>
          ) : (
            ""
          )}
        </div>
      )}

      {messages !== null && messages.length !== 0 && (
        <>
          <h3>Messages</h3>

          <fieldset>
            <button onClick={() => messageRefetch()}>Refetch</button>

            <table style={{ columnWidth: "100px" }}>
              <colgroup>
                <col style={{ width: "15em" }} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>from</th>
                  <th>message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => {
                  return (
                    <tr key={message.id}>
                      <td>{message.users.name}</td>
                      <td>{message.message}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </fieldset>
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  // for SSR, simply create a new client and pass on the cookie header from the client context
  // this way, we can make authenticated requests via SSR
  const client = new Client({
    extraHeaders: {
      cookie: context.req.headers.cookie || "",
    },
  });
  // fetch the user so that we can render the UI based on the user name and email
  const user = await client.fetchUser();
  // fetch the initial messages
  const messages = await client.query.Messages({});
  return {
    props: {
      // pass on the data to the page renderer
      user: user || null,
      messages:
        (messages.status === "ok" &&
          messages.body.data?.findManymessages.reverse()) ||
        [],
    },
  };
};

export default Chat;
