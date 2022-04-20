import { useQuery } from "../components/generated/hooks";
import { NextPage } from "next";
import DisplayResult from "./displayresult";

export interface QueryOptions {
  refetchOnWindowFocus: boolean;
}
const InitialState: NextPage<QueryOptions> = ({ refetchOnWindowFocus }) => {
  const messages = useQuery.Messages({
    initialState: {
      data: {
        findManymessages: [
          {
            id: 123456,
            message: "initial message",
            users: {
              id: 1,
              name: "webmaster",
              email: "webmaster@solidgraph.ovh",
            },
          },
        ],
      },
    },
    refetchOnWindowFocus,
  });
  return <DisplayResult messages={messages} />;
};

export default InitialState;
