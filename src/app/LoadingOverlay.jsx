import React from "react"; // standard React import
import { Html } from "@react-three/drei"; // for rendering inside the Canvas
import Loading from "./Loading"; // your existing Loading component
export default function LoadingOverlay({ isLoading }) {
  return (
    <Html center>
      {isLoading && <Loading scale={[1, 1, 1]} />}
    </Html>
  );
}