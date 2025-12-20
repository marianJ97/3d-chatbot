import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useAvatarState } from "../hooks/useAvatarState";

export function AssistantCamera() {
  const { camera, pointer, clock } = useThree();
  const { action } = useAvatarState();

  const targetRotation = useRef(new THREE.Euler());
  const currentRotation = useRef(new THREE.Euler());
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastPointerMove = useRef(0);

  useFrame(() => {
    const time = clock.getElapsedTime();

    const maxYaw = 0.05; // left/right
    const maxPitch = 0.05; // up/down

    const idleYaw = 0.03; // left/right
    const idlePitch = 0.02; //up/down
    const idleDelay = 1.2;

    const pointerX = pointer.x || 0;
    const pointerY = pointer.y || 0;

    const moved =
      Math.abs(pointerX - lastPointer.current.x) > 0.001 ||
      Math.abs(pointerY - lastPointer.current.y) > 0.001;

    if (moved) {
      lastPointerMove.current = time;
      lastPointer.current.x = pointerX;
      lastPointer.current.y = pointerY;
    }

    const isIdle = time - lastPointerMove.current > idleDelay;

    if (isIdle) {
      targetRotation.current.y = Math.sin(time * 0.4) * idleYaw;
      targetRotation.current.x = Math.sin(time * 0.6) * idlePitch;
    } else {
      targetRotation.current.y = pointerX * maxYaw;
      targetRotation.current.x = -pointerY * maxPitch;
    }

    if (action !== "Idle") {
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        0,
        0.05
      );

      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        0,
        0.05
      );
      return camera.rotation.copy(currentRotation.current);
    }

    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      0.05
    );

    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      0.05
    );

    camera.rotation.copy(currentRotation.current);
  });

  return null;
}
