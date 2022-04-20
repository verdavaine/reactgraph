import {
  useMutation,
  useQuery,
  useWunderGraph,
} from "../../components/generated/hooks";
import { useEffect, useMemo, useState } from "react";
import { ResponseOK, User } from "@wundergraph/sdk";
import {
  DeleteAllMessagesByUserEmailResponse,
  MessagesResponse,
} from "../../components/generated/models";
import { MessagesResponseData } from "../../components/generated/models";
import { NextPage } from "next";

type Aggregation = [string, number][];
type Messages = MessagesResponseData["findManymessages"];

const getMessagesByUser = (messages: Messages = []) => {
  let result: Aggregation = Object.entries(
    messages.reduce((res: any, { users }) => {
      return {
        ...res,
        [users.email]: (res[users.email] || 0) + 1,
      };
    }, {})
  );
  return result;
};
const AdminPage: NextPage = () => {
  const { user } = useWunderGraph();
  const [email, setEmail] = useState<string>("");
  const { response: loadMessages } = useQuery.Messages({
    refetchOnWindowFocus: true,
  });
  const [messages, setMessages] = useState<Messages>([]);
  useEffect(() => {
    if (loadMessages.status === "ok" || loadMessages.status == "cached") {
      setMessages(
        (loadMessages as ResponseOK<MessagesResponse>).body.data
          ?.findManymessages || []
      );
    }
    if (loadMessages.status === "requiresAuthentication") {
      console.log("Messages requiresAuthentication");
      setMessages([]);
    }
  }, [loadMessages]);
  const { mutate: deleteAllMessagesFrom, response: deletedMessages } =
    useMutation.DeleteAllMessagesByUserEmail({
      refetchMountedQueriesOnSuccess: true,
    });
  const disabled = useMemo(
    () => (user ? !user!.roles!.includes("superadmin") : true),
    [user]
  );
  useEffect(() => setEmail(user?.email || ""), [user]);
  const messageAggregation = () => getMessagesByUser(messages);

  return (
    <div>
      <h1>Admin</h1>

      <h2>Delete all messages by user email</h2>
      <fieldset disabled={disabled}>
        <label>
          <input
            style={{ width: "50%" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </label>

        <button
          style={{ width: "50%" }}
          onClick={() => deleteAllMessagesFrom({ input: { email: email } })}
        >
          Delete all messages by user email
        </button>

        {disabled ? (
          <p>
            <em>Only superadmin users can delete other users messages</em>
          </p>
        ) : (
          ""
        )}

        {deletedMessages.status === "ok" ? (
          <p>
            <em>{`deleted: ${
              (
                deletedMessages as ResponseOK<DeleteAllMessagesByUserEmailResponse>
              ).body.data?.deleteManymessages?.count
            } messages`}</em>
          </p>
        ) : (
          ""
        )}
      </fieldset>

      <h2>Messages By User</h2>
      <fieldset style={{ display: "flex", flexDirection: "column" }}>
        {disabled ? (
          <p>
            <em>Only superadmin users can see other users Email</em>
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Message Count</th>
              </tr>
            </thead>
            <tbody>
              {messageAggregation().map(([email, count]) => {
                return (
                  <tr>
                    <td>{email}</td>
                    <td>{count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </fieldset>
    </div>
  );
};

export default AdminPage;
