import { useEffect, useState } from "react";
import CommonInputField from "./common-input-field";
import type { Dispatch, SetStateAction } from "react";
import CommonAnimationWrapper from "./common-animation-wrapper";

interface SearchBarProps {
  searchFunction: (search: string) => Promise<{ name: string; id: string }[]>;
  setChoice: Dispatch<SetStateAction<{ name: string; id: string } | null>>;
  choice: { name: string; id: string } | null;
  label: string;
}

function SearchBar({
  searchFunction,
  setChoice,
  choice,
  label,
}: SearchBarProps) {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, SetResults] = useState<{ name: string; id: string }[] | null>(
    null,
  );

  useEffect(() => {
    let timer: number | undefined = undefined;
    async function loadUsers() {
      if (value && value.length >= 3) {
        setLoading(true);
        timer = setTimeout(async () => {
          try {
            const response = await searchFunction(value);
            SetResults(response);
          } catch {
            console.log("sorry");
          } finally {
            setLoading(false);
          }
        }, 1000);
      }
    }

    void loadUsers();
    if (timer) {
      return () => clearTimeout(timer);
    }
  }, [value, searchFunction]);

  return (
    <>
      <CommonInputField
        type="text"
        value={value}
        setValue={setValue}
        label={label}
        id={"search"}
        loading={loading}
        icon="bx bx-search"
        locked={choice !== null}
        unlock={() => setChoice(null)}
      ></CommonInputField>
      <CommonAnimationWrapper
        scaleOnY={true}
        fade={true}
        condition={
          !loading && value.length >= 3 && results !== null && choice === null
        }
      >
        <div className="w-full absolute top-1 border border-slate-500 rounded-xl bg-white flex flex-col gap-2 max-h-80 overflow-y-auto  overflow-x-hidden">
          {results && results.length === 0 ? (
            <h1 className="m-auto text-slate-600 my-4"> No Results Found</h1>
          ) : (
            results &&
            results.map((result) => (
              <h1
                key={`${result.name}-${result.id}`}
                className="text-sm py-3 px-5 hover:bg-slate-300 cursor-pointer"
                onClick={() => setChoice(result)}
              >
                {result.name}
              </h1>
            ))
          )}
        </div>
      </CommonAnimationWrapper>
    </>
  );
}
export default SearchBar;
