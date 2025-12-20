import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { AvatarProvider } from "./hooks/useAvatarState";
import ChatUI from "./components/ChatUI";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  return (
    <AvatarProvider>
      <Loader />
      <LoadingIndicator />
      <ChatUI />
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 30 }}>
        <Scene />
      </Canvas>
    </AvatarProvider>
  );
}

export default App;
