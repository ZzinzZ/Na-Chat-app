

export const unReadNotifications = (notification) => {
    return notification.filter((notify) => notify.isRead === false);
}