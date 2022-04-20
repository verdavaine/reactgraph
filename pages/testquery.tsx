import { NextPage } from "next";
import { useState } from "react";
import LazyLoad from "./lazyload";
import InitialState from "./initialstate";
import None from "./none";

const TestQuery: NextPage = () => {
  const [choice, setChoice] = useState(1);
  const [fetchOnFocus, setFectchOnFocus] = useState(true);

  return (
    <>
      <p>Initial conditions:</p>
      <div>
        <input
          type="radio"
          id="lazyload"
          name="init"
          onChange={() => setChoice(1)}
          checked={choice === 1}
        />
        <label htmlFor="lazyload">Lazy Load</label>
      </div>
      <div>
        <input
          type="radio"
          id="initialstate"
          name="init"
          onChange={() => setChoice(2)}
          checked={choice === 2}
        />
        <label htmlFor="initialstate">Inital State</label>
      </div>
      <div>
        <input
          type="radio"
          id="none"
          name="init"
          onChange={() => setChoice(3)}
          checked={choice === 3}
        />
        <label htmlFor="none">None</label>
      </div>
      <br></br>
      <div>
        <label htmlFor="fetchOnFocus">Refetch on window focus</label>
        <input
          type="checkbox"
          id="fetchOnFocus"
          checked={fetchOnFocus === true}
          onChange={(event) =>
            setFectchOnFocus(event.currentTarget.checked ? true : false)
          }
        />
      </div>
      <br></br>
      <br></br>

      {choice === 1 ? (
        <LazyLoad refetchOnWindowFocus={fetchOnFocus} />
      ) : choice === 2 ? (
        <InitialState refetchOnWindowFocus={fetchOnFocus} />
      ) : choice === 3 ? (
        <None refetchOnWindowFocus={fetchOnFocus} />
      ) : (
        ""
      )}
    </>
  );
};

export default TestQuery;
