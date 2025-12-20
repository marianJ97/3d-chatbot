import React from "react";
import { useAvatarState } from "../hooks/useAvatarState";
import styles from "./LoadingIndicator.module.css";

export default function LoadingIndicator() {
  const { action } = useAvatarState();

  if (action === "Loading") {
    return (
      <div className={styles.typingIndicator}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}
