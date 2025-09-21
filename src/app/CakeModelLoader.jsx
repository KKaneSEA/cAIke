import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// always call hook inside a child component
function CakeModelLoader({ url, scale = 1 }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} scale={scale} />;
}

// Wrapper to render only if URL exists
export default function CakeModel({ url, scale = 1 }) {
  if (!url) return null; // ✅ prevents hook violation
  return <CakeModelLoader url={url} scale={scale} />;
}
