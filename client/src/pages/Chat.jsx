import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isLoading, updateCurrentChat } =
    useContext(ChatContext);

  return (
    <Container>
      <PotentialChats/>
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isLoading && (
              <Stack direction="horizontal" gap={2}>
                <span>Loading chat</span>
                <LoadingBox />
              </Stack>
            )}
            {userChats?.map((chat, index) => {
              return (
                <Stack key={index} direction="column" className="flex-grow-0" gap={2} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </Stack>
              );
            })}
          </Stack>
          <ChatBox/>
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
