import { useState } from "react";

export default function RequestInput({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSubmit(input); // pass user input up to parent
    setInput(""); // clear input
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe how you want your cake to be decorated..."
        style={{ padding: "0.5rem", width: "70%", marginRight: "0.5rem" }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>
        Send
      </button>
    </form>
  );
}
