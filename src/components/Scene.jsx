import { ContactShadows, Environment } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { Background } from "./Background";
import { AssistantCamera } from "./Camera";

export const Scene = () => {
  return (
    <>
      <AssistantCamera />
      <Environment preset="sunset" />
      <Background />
      <Avatar position={[0, -1.2, 0]} />
      <ContactShadows position={[0, -1.2, 0]} opacity={0.7} />
    </>
  );
};
