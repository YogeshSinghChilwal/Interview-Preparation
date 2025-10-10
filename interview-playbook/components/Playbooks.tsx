/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const Playbooks = () => {
  const [loading, setLoading] = useState(false);

  async function handleGenerate(url: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Request failed with ${res.status}`);
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      const contentDisposition = res.headers.get("Content-Disposition") || "";
      const match = /filename\*?=(?:UTF-8''|"?)([^";]+)/i.exec(
        contentDisposition
      );
      const filename = match ? decodeURIComponent(match[1]) : "document.pdf";

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between text-xl font-semibold ">
        <h2>React Interview Ques/Ans</h2>
        <div className="flex items-center gap-2">
          {loading && <Spinner className="size-5 text-blue-500" />}
          <button
            onClick={() =>
              handleGenerate(
                "https://raw.githubusercontent.com/YogeshSinghChilwal/Interview-Preparation/main/React/react.md"
              )
            }
            className="border-b-2 border-foreground hover:text-blue-500 hover:border-blue-500 transition-all duration-200"
          >
            PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playbooks;
