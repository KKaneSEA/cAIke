import "./app.css";

import { Text, Center } from "@react-three/drei";
import * as THREE from "three";
export default function Loading() {
  return (
    <>
      <Text
        anchorX="center"
        anchorY="middle"
        position={[0, 1, -9]}
        color="black"
        fontSize={0.5}
      >
        LOADING...
      </Text>
    </>
  );
}
