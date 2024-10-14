const { Expo } = require("expo-server-sdk");

const sendPushNotification = async (targetExpoPushToken, message, myTitle) => {
  const expo = new Expo();
  const chunks = expo.chunkPushNotifications([
    {
      to: targetExpoPushToken,
      sound: "default",
      title: myTitle,
      body: message,
    },
  ]);

  const sendChunks = async () => {
    try {
      const tickets = await Promise.all(
        chunks.map((chunk) => expo.sendPushNotificationsAsync(chunk))
      );
    } catch (error) {
      console.log("Error sending chunks", error);
    }
  };

  await sendChunks();
};

module.exports = sendPushNotification;
