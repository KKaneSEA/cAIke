export async function POST(req) {
  try {
    const { query } = await req.json();

    const lfRes = await fetch(`${process.env.LANGFLOW_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LANGFLOW_API_KEY}`,
      },
      body: JSON.stringify({
        input_value: query,
        input_type: "chat",
        output_type: "text", // make sure this matches your Text Output node
      }),
    });

    const lfData = await lfRes.json();

    // Log the full raw response
    console.log("Langflow raw response:", JSON.stringify(lfData, null, 2));

    // Safely extract the text from likely fields
    const message =
      lfData.outputs?.[0]?.outputs?.[0]?.results?.output || // most common for Text Output
      lfData.outputs?.[0]?.outputs?.[0]?.results?.text ||
      "";

    console.log("Extracted Langflow message text:", message);

    return new Response(JSON.stringify({ outputText: message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Langflow API error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}



