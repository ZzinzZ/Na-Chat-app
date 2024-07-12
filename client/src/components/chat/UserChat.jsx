import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import moment from "moment";
import { useFetchRecipientUser } from "../../customHooks/useFetchRecipient";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unReadNotifications } from "../../utils/unReadNotifications";
import { useFetchLatestMessage } from "../../customHooks/useFetchLatestMessage";

const UserChat = ({ chat, user }) => {
  const [lastMessage, setLastMessage] = useState(null)
  const { recipientUser } = useFetchRecipientUser(chat, user);
  
  const {
    onlineUser,
    notifications,
    markThisUserNotificationsAsRead,
    newMessages,
  } = useContext(ChatContext);

  const unreadNotifications = unReadNotifications(notifications);
  const thisUserNotifications = unreadNotifications?.filter((n) => {
    return n?.senderId === recipientUser?.user?._id;
  });

  const isOnline = onlineUser?.some(
    (user) => user?.userId === recipientUser?.user?._id
  );
  const { latestMessage } = useFetchLatestMessage(chat);
  useEffect(() => {
    setLastMessage(latestMessage)
  }, [latestMessage]);
  console.log(newMessages);
  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText += "...";
    }
    return shortText;
  };
  

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length > 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} alt="avatar" height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.user?.name}</div>
          <div className="text">
            {lastMessage?.content && (
              <span>{truncateText(lastMessage?.content)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">{moment(lastMessage?.createdAt).calendar()}</div>
        <div
          className={
            thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
          }
        >
          {thisUserNotifications?.length > 0
            ? thisUserNotifications?.length
            : null}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
