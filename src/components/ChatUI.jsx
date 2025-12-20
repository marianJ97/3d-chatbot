import React, { useRef } from "react";
import { useAvatarState } from "../hooks/useAvatarState";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Mic, Square, MicOff, Send } from "lucide-react";
import styles from "./ChatUI.module.css";
import { avatarState } from "../utils/helperConfig";
import TalkingPopup from "./TalkingPopup";

const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ChatUI() {
  const { setAnimation, setMessage, setAction, action } = useAvatarState();
  const abortRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const isBusy = action !== avatarState.idle;
  const disabledInput = listening || isBusy;

  const askQuestion = async (message) => {
    if (!message || isBusy) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setAnimation("Angry");
    setAction(avatarState.loading);

    try {
      const res = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: abortRef.current.signal,
      });

      setAction(avatarState.speaking);

      const data = await res.json();
      setMessage(data);
    } catch (error) {
      console.error(error);
      setAction(avatarState.idle);
    }
  };

  const toggleRecording = async () => {
    if (!browserSupportsSpeechRecognition || isBusy) {
      return;
    }

    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
      await askQuestion(transcript);
      resetTranscript();
    }
  };

  return (
    <div className={styles.container}>
      <TalkingPopup abortRef={abortRef} />
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.message.value);
          askQuestion(e.target.message.value);
          e.target.reset();
        }}
      >
        <input
          disabled={disabledInput}
          name="message"
          placeholder={isBusy ? "Please wait..." : "Ask me something..."}
          className={styles.input}
        />
        <button disabled={disabledInput} className={styles.sendButton}>
          <Send size={18} />
        </button>
      </form>

      <button
        onClick={toggleRecording}
        disabled={!browserSupportsSpeechRecognition || isBusy}
        className={`${styles.recordButton} ${
          listening ? styles.recording : ""
        } ${
          !browserSupportsSpeechRecognition || isBusy ? styles.disabled : ""
        }`}
      >
        <span className={styles.icon}>
          {browserSupportsSpeechRecognition ? (
            listening ? (
              <Square size={18} />
            ) : (
              <Mic size={18} />
            )
          ) : (
            <MicOff size={18} />
          )}
        </span>

        {browserSupportsSpeechRecognition
          ? listening
            ? "Listening..."
            : "Record"
          : "Speech recognition not supported"}
      </button>
    </div>
  );
}
