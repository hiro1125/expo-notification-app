import { useEffect, useRef } from 'react';
import { Image, StyleSheet, Platform, View, TurboModuleRegistry, Button } from 'react-native';

import * as Notifications from 'expo-notifications';

export default function HomeScreen() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    //通知許可の要求
    const requestPermissions = async () => {
      try {
        const status = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        });
        console.log('status', status);
      } catch (error) {
        console.error(error);
      }
    };
    requestPermissions();

    //通知リスナーの設定
    //通知オブジェクト
    notificationListener.current = Notifications.addNotificationReceivedListener(
      async (notification) => {
        console.log('notification', notification);
        alert(notification.request.content.body);
      }
    );

    //レスポンスオブジェク
    responseListener.current = Notifications.addNotificationReceivedListener((response) => {
      console.log('response', response);
      alert(response.request.content.data.data);
    });

    //リスナーのクリーンアップ
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  const onScheduleNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '商品が追加されました',
        body: '詳しくは、アプリをご確認ください',
        data: { data: 'aaaa' },
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title='テスト'
        onPress={onScheduleNotifications}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
