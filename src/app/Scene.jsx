import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import CakeModel from "./CakeModelLoader.jsx";

import * as THREE from "three";

export default function Scene({ modelUrl }) {
  const model = useGLTF("./models/cakeModel.glb");

  return (
    <>
      <OrbitControls
        minDistance={5}
        maxDistance={7.5}
        target={[0, 0, 0]}
        enablePan={true}
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={15}
      />

      <Environment preset="apartment" />

      <Physics>
        {modelUrl ? (
          <CakeModel url={modelUrl} scale={0.3} />
        ) : (
          <primitive object={model.scene} scale={7.2} position={[0, 0.35, 0]} />
        )}
      </Physics>
    </>
  );
}
