export default function ResponseView({ response }) {
  if (!response) return null;

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "6px",
        background: "#f9f9f9",
      }}
    >
      <strong>Response:</strong> {response}
    </div>
  );
}
