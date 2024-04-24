import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import {
  addNotificationResponseReceivedListener,
  Notification,
  Subscription,
} from 'expo-notifications';

const androidNotificationStack: Notification[] = [];

let androidNotificationListener: Subscription | null = null;

const enableAndroidNotificationListener = () => {
  if (Platform.OS !== 'android') {
    return;
  }

  androidNotificationListener = addNotificationResponseReceivedListener(
    ({ notification }) => {
      androidNotificationStack.push(notification);
    },
  );
};

enableAndroidNotificationListener();

const disableAndroidNotificationListener = () => {
  androidNotificationListener?.remove();
};

const getAndroidNotificationFromStack = () => androidNotificationStack.shift();

const androidNotificationStackLength = () => androidNotificationStack.length;

const NotificationResponseComponent = ({
  onResponse,
}: {
  onResponse: (notification: Notification) => void;
}) => {
  const onNotificationReceipt = async (notification: Notification) => {
    console.log(
      `response received for notification ${notification.request.content.title}`,
    );
    onResponse(notification);
  };

  useEffect(() => {
    while (androidNotificationStackLength() > 0) {
      const notification = getAndroidNotificationFromStack();
      notification && onNotificationReceipt(notification);
    }
    // We disable this listener as soon as possible so as not
    // to double process the same push notification with
    // the "normal" listeners below.
    disableAndroidNotificationListener();
    const subscription = addNotificationResponseReceivedListener(
      ({ notification }) => {
        onNotificationReceipt(notification);
      },
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return <View />;
};

export default NotificationResponseComponent;
