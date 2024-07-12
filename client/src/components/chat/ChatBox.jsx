import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../customHooks/useFetchRecipient";
import LoadingBox from "../LoadingBox";
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import moment from "moment";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessageLoading, messagesError, sendMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!recipientUser) {
    return (
      <span style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </span>
    );
  }

  if (isMessageLoading) {
    return (
      <div style={{ textAlign: "center", width: "100%" }}>
        <Stack
          direction="horizontal"
          style={{
            justifyContent: "center",
            textAlign: "center",
          }}
          gap={3}
        >
          <span>Loading chat</span>
          <LoadingBox />
        </Stack>
      </div>
    );
  }

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.user?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages && messages.map((message, index) => {
          return (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message  align-self-start flex-grow-0"
              }`}
              ref={messagesEndRef}
            >
              <span>{message.content}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          );
        })}
      
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2)"
          forceStrutHeight={true}
          style={{}}
        />
        <button className="send-btn" onClick={() => sendMessage(textMessage, user, currentChat?._id, setTextMessage)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
