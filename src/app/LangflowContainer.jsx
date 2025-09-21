"use client";
import { useState } from "react";
import RequestInput from "./RequestInput";
import ResponseView from "./ResponseView";

export default function LangflowContainer() {
  const [response, setResponse] = useState("");

  // Called from RequestInput when the form is submitted
  const handleRequest = async (userInput) => {
    try {
      const res = await fetch("/api/langflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput }),
      });

      const data = await res.json();
      setResponse(data.output); // adjust this based on Langflow’s API shape
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong.");
    }
  };

  return (
    <div>
      <RequestInput onSubmit={handleRequest} />
      <ResponseView response={response} />
    </div>
  );
}
