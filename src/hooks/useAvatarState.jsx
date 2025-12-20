/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef, useState } from "react";

export const AvatarContext = createContext({
  animation: "Idle",
  setAnimation: () => {},
  message: null,
  setMessage: () => {},
  action: "Idle",
  setAction: () => {},
  audioRef: null,
});

export const AvatarProvider = ({ children }) => {
  const [animation, setAnimation] = useState("Idle");
  const [message, setMessage] = useState(null);
  const [action, setAction] = useState("Idle");
  const audioRef = useRef(null);

  return (
    <AvatarContext.Provider
      value={{
        animation,
        setAnimation,
        message,
        setMessage,
        action,
        setAction,
        audioRef,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatarState = () => useContext(AvatarContext);
