import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, getRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendMessagesError, setSendMessagesError] = useState(null);
  const [newMessages, setNewMessages] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Get user 
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Error fetching user: ", response.error);
      }

      const pChat = response?.users?.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u.id) {
          return false;
        }

        if (userChats) {
          isChatCreated = userChats.some((chat) => {
            return chat?.members[0] === u._id || chat?.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });
      setPotentialChats(pChat);
      setAllUsers(response?.users);
    };
    getUsers();
  }, [userChats]);

  //Add online user
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUser", (res) => {
      setOnlineUser(res);
    });
    return () => {
      socket.off("getOnlineUser");
    };
  }, [socket]);

  //Send messages
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members?.find((id) => id !== user?._id);
    socket.emit("sendMessages", { ...newMessages, recipientId });
  }, [newMessages]);

  //receive messages and notify
  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.on("getMessages", (res) => {
      if (currentChat?._id !== res.chatId) {
        return;
      }
      setMessages((prevMessages) => [...prevMessages, res]);
    });
    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId);
      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true, ...prev }]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });
    return () => {
      socket.off("getMessages");
    };
  }, [socket, currentChat]);

  //get user chat
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsLoading(true);
        setUserChatError(null);
        const response = await getRequest(`${baseUrl}/chats/${user._id}`);
        setIsLoading(false);
        if (response.error) {
          return setUserChatError(response);
        }

        setUserChats(response);
      }
    };
    getUserChats();
    
  }, [user, notifications]);

  useEffect(() => {
    //Initial socket connection
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    ////////////////////////////////
    return () => {
      newSocket.disconnect();
    };
  },[user]);

  //get messages
  useEffect(() => {
    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessagesError(null);
      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );
      setIsMessageLoading(false);
      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  //Update chat
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  //create chat for user
  const createChats = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ firstId, secondId })
    );

    if (response.error) {
      return console.log("Error creating chat: ", response.error);
    }
    setUserChats((prev) => [...prev, response]);
  });
  //create notification message for user
  const createNotification = useCallback(
    async (userId, senderId) => {
      try {
        const response = await postRequest(`${baseUrl}/notifications`, JSON.stringify({
          userId,
          senderId,
          isRead: false
        }))
        if (response.error) {
          return console.log("Error creating notification: ", response.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
  

  //create messages and send them 
  const sendMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something...");

      const response = await postRequest(
        `${baseUrl}/messages/`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          content: textMessage,
        })
      );

      if (response.error) {
        return setSendMessagesError(response);
      }
      setNewMessages(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  // mark all notification as read
  const markAllNotificationsAsRead = useCallback((notifications) => {
    const mNotifications = notifications.map((n) => {
      return { ...n, isRead: true };
    });
    setNotifications(mNotifications);
  }, []);

  //mark one notification as read
  const markNotificationsAsRead = useCallback((n, userChats, user,notifications) => {
    //find chat to open
    const desiredChat = userChats?.find((chat) => {
      const chatMembers = [user?._id, n.senderId];
      const isDesiredChat = chat?.members.every((member) => {
        return chatMembers.includes(member);
      });
      return isDesiredChat;
    });
    //mark notifications as read
    const mNotifications = notifications.map((el) => {
      if (n.senderId === el.senderId) {
        return { ...n, isRead: true };
      } else {
        return el;
      }
    });
    updateCurrentChat(desiredChat);
    setNotifications(mNotifications);
  }, []);

  // mark chat notifications as read
  const markThisUserNotificationsAsRead = useCallback((thisUserNotifications,notifications) => {
    const mNotifications = notifications.map((el) => {
      let notification;
      thisUserNotifications?.forEach(n => {
        if (n.senderId === el.senderId) {
          notification = {...n, isRead: true };
        }
        else{
          notification = el;
        }
      })
      return notification;
    });
    setNotifications(mNotifications);
  },[]);
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isLoading,
        userChatError,
        setUserChatError,
        potentialChats,
        createChats,
        updateCurrentChat,
        currentChat,
        messages,
        newMessages,
        isMessageLoading,
        messagesError,
        sendMessage,
        onlineUser,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationsAsRead,
        markThisUserNotificationsAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
