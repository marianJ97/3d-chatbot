import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function Background() {
  const sizeWidth = 6;
  const sizeHeight = 5;

  const wallTexture = useTexture("images/background.png");
  const floorTexture = useTexture("images/floor.png", (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(sizeWidth / 1, sizeHeight / 1);
  });

  return (
    <group>
      <mesh position={[0, -1.2 + sizeHeight / 2, 1 - sizeHeight / 2]}>
        <planeGeometry args={[sizeWidth, sizeHeight]} />
        <meshBasicMaterial
          map={wallTexture}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 1]}>
        <planeGeometry args={[sizeWidth, sizeHeight]} />
        <meshBasicMaterial
          map={floorTexture}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
