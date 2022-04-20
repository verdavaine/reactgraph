import { useMutation, useWunderGraph } from ".././components/generated/hooks";
import { useEffect, useState } from "react";
import { NextPage } from "next";

const UpdateUser: NextPage = () => {
  const {
    user,
    client: { login },
  } = useWunderGraph();
  const [userName, setUserName] = useState<string>(user?.name || "");
  const { mutate: changeName, response: newName } = useMutation.ChangeUserName({
    input: { newName: "" },
  });
  useEffect(() => {
    if (newName.status === "ok") {
      setUserName("");
      console.dir(newName);
    }
  }, [newName]);

  return (
    <fieldset disabled={!user}>
      <label>
        <input
          style={{ width: "50%" }}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.currentTarget.value)}
        />
      </label>

      <button
        style={{ width: "50%" }}
        onClick={() => changeName({ input: { newName: userName } })}
      >
        Change user name
      </button>

      {!user ? (
        <p>
          <em>You must log in to change user name</em>
        </p>
      ) : (
        ""
      )}
    </fieldset>
  );
};

export default UpdateUser;
