import React from "react";
import { Spinner } from "./ui/spinner";

const Playbook = ({handleGenerate, loading, title, link}: {handleGenerate: (link: string) => void, loading: boolean, title: string, link: string}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between text-xl font-semibold mb-4">
      <h2>{title}</h2>
      <div className="flex items-center gap-2">
        {loading && <Spinner className="size-5 text-blue-500" />}
        <button
          onClick={() =>
            handleGenerate(
              link
            )
          }
          className="border-b-2 border-foreground hover:text-blue-500 hover:border-blue-500 transition-all duration-200"
        >
          PDF
        </button>
      </div>
    </div>
  );
};

export default Playbook;
