import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unReadNotifications } from "../../utils/unReadNotifications";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationsAsRead,
  } = useContext(ChatContext);
  

  const unreadNotifications = unReadNotifications(notifications);
  const modifiedNotifications = notifications.map((notify) => {
    const sender = allUsers.find((user) => user._id === notify.senderId);

    return {
      ...notify,
      senderName: sender?.name,
    };
  });

  console.log("modify notifications",modifiedNotifications );
  return (
    <div className="notifications">
      <div className="notifications-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chat-square-text-fill"
          viewBox="0 0 16 16"
          onClick={() => setIsOpen(!isOpen)}
        >
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
        </svg>
        {unreadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            {unreadNotifications?.length}
          </span>
        )}
      </div>
      {isOpen && (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div
              className="mark-as-read"
              onClick={() => markAllNotificationsAsRead(notifications)}
            >
              Mark all as read
            </div>
          </div>
          {modifiedNotifications?.length === 0 ? (
            <span className="notification">No notification yet...</span>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.isRead ? "notification" : "notification not-read"
                  }
                  onClick={() =>{
                    markNotificationsAsRead(n, userChats, user, notifications)
                    setIsOpen(false);
                  }
                    
                  }
                >
                  <span>{`${n.senderName} sent you a message`}</span>
                  <span className="notification-time">
                    {moment(n.date).calendar()}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Notification;
