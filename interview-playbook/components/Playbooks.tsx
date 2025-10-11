/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import Playbook from "./Playbook";

const Playbooks = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  async function handleGenerate(url: string) {
    setLoadingStates(prev => ({ ...prev, [url]: true }));
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
      setLoadingStates(prev => ({ ...prev, [url]: false }));
    }
  }

  const reactLink = "https://raw.githubusercontent.com/YogeshSinghChilwal/Interview-Preparation/main/React/react.md";
  const nextLink = "https://raw.githubusercontent.com/YogeshSinghChilwal/Interview-Preparation/main/Nextjs/nextjs.md";

  return (
    <div className="mt-10">
      <Playbook
        handleGenerate={handleGenerate}
        loading={loadingStates[reactLink] || false}
        title="React Interview Ques/Ans"
        link={reactLink}
      />
      <Playbook
        handleGenerate={handleGenerate}
        loading={loadingStates[nextLink] || false}
        title="Next.js Interview Ques/Ans"
        link={nextLink}
      />
    </div>
  );
};

export default Playbooks;