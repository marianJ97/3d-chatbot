import React, { startTransition } from "react";
import { useAvatarState } from "../hooks/useAvatarState";
import styles from "./TalkingPopup.module.css";
import { avatarState } from "../utils/helperConfig";

export default function TalkingPopup({ abortRef }) {
  const { action, setAction, setAnimation, setMessage } = useAvatarState();

  const stopEverything = () => {
    startTransition(() => {
      setAction(avatarState.idle);
      setAnimation("Idle");
      setMessage(null);
    });
  };

  if (action !== "Idle") {
    return (
      <div className={styles.overlay}>
        <div className={styles.overlayCard}>
          <p>{action === "Loading" ? "Thinking..." : "Speaking..."}</p>

          <button
            className={styles.cancelButton}
            onClick={() => {
              abortRef.current?.abort();
              stopEverything();
            }}
          >
            Stop
          </button>
        </div>
      </div>
    );
  }
}
