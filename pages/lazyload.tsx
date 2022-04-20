import { useQuery } from "../components/generated/hooks";
import { NextPage } from "next";
import DisplayResult from "./displayresult";

export interface QueryOptions {
  refetchOnWindowFocus: boolean;
}
const LazyLoad: NextPage<QueryOptions> = ({ refetchOnWindowFocus }) => {
  const messages = useQuery.Messages({
    lazy: true,
    refetchOnWindowFocus,
  });
  return <DisplayResult messages={messages} />;
};

export default LazyLoad;
