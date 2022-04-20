import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useLoadingComplete,
  useMutation,
  useQuery,
  useWunderGraph,
} from "../components/generated/hooks";
import { NextPage } from "next";
import { MessagesResponse } from "../components/generated/models";
import { RequestOptions, Response } from "@wundergraph/sdk";

export interface DisplayProps {
  messages: {
    response: Response<MessagesResponse>;
    refetch: (
      options?: RequestOptions<never, MessagesResponse> | undefined
    ) => void;
  };
}
const DisplayResult: NextPage<DisplayProps> = ({ messages }) => {
  const { user } = useWunderGraph();
  let loading = useLoadingComplete(messages?.response);
  const [message, setMessage] = useState<string>("");
  const { mutate: addMessage, response: messageAdded } = useMutation.AddMessage(
    { refetchMountedQueriesOnSuccess: false }
  );
  const [fectchQueriesOnSuccess, setFectchQueriesOnSuccess] =
    useState<boolean>(true);
  useEffect(() => {
    if (messageAdded.status === "ok") {
      setMessage("");
    } else if (messageAdded.status === "requiresAuthentication") {
      console.log("messageAdded : requiresAuthentication");
    }
  }, [messageAdded]);

  return (
    <>
      <fieldset disabled={!user}>
        <input
          type="text"
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <button
          onClick={() =>
            addMessage({
              refetchMountedQueriesOnSuccess: fectchQueriesOnSuccess,
              input: { message: message },
            })
          }
        >
          submit
        </button>
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="fetchOnFocus">Refetch queries on success</label>
        <input
          type="checkbox"
          id="fetchOnSuccess"
          checked={fectchQueriesOnSuccess === true}
          onChange={(event) =>
            setFectchQueriesOnSuccess(event.currentTarget.checked)
          }
        />
      </fieldset>

      <div></div>
      <div>
        {!user ? (
          <div>
            <p>
              <em>Please Login on Home page to test mutation!</em>
            </p>
          </div>
        ) : (
          ""
        )}
        <></>
      </div>
      <br></br>
      <div>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <button onClick={() => messages?.refetch()}>Refetch</button>
        )}
        <br></br>
        <pre>{JSON.stringify(messages?.response, null, 2)}</pre>
      </div>
    </>
  );
};

export default DisplayResult;
