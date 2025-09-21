"use client";
import "./app.css";
import Scene from "./Scene.jsx";
import Loading from "./Loading";

import { Suspense, useState } from "react";

import { Canvas } from "@react-three/fiber";

import { Physics } from "@react-three/rapier";

export default function App() {
  const [modelUrl, setModelUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  //input area
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  //without meshy
  // const handleSend = async () => {
  //   setLoading(true);

  //   try {
  //     const res = await fetch("/api/langflow", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ query: input }),
  //     });

  //     const data = await res.json();

  //     if (data.error) {
  //       console.error(data.error);
  //       return;
  //     }

  //     setResponse(data.outputText || "");
  //     setModelUrl(data.glbModelUrl || null); // This URL will be passed to CakeModel
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSend = async () => {
    setLoading(true);

    try {
      // Step 1: Get AI response from Langflow
      const res = await fetch("/api/langflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        return;
      }

      const aiText = data.outputText || "";
      setResponse(aiText);

      // Step 2: Send AI text to Meshy to generate a .glb

      const meshyRes = await fetch("/api/meshy", {
        method: "POST", // Must be POST!
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiText }),
      });

      const meshyData = await meshyRes.json();
      console.log("Meshy GLB URL:", meshyData.glbUrl);
      setModelUrl(meshyData.glbUrl || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">cAIke </header>
      <div className="inputArea">
        <div className="textArea">
          <textarea
            className="textArea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the cake decorations that you would like..."
          />
          <button onClick={handleSend}>Send</button>
          {response && (
            <div>
              <p>{response.text || response.outputText || "No message"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="threeD-Container">
        <div className="threeD-Portal">
          <Canvas
            camera={{ position: [0, 5, 5], fov: 30, near: 1, far: 100 }}
            resize={{ scroll: false }}
          >
            <Suspense fallback={<Loading scale={[1, 1, 1]} />}>
              <spotLight
                position={[0, 5, 0]}
                angle={3.5}
                // penumbra={0.4}
                intensity={1.2}
                castShadow
                color={"#fff7e6"}
              />
              <ambientLight intensity={0.2} />
              <directionalLight
                position={[0, 1, 0]}
                intensity={0.2}
                color={"#ffd9b3"}
              />

              <Scene modelUrl={modelUrl} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
