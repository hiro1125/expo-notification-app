import { useEffect, useRef } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function HomeScreen() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // 通知許可の要求
    const requestPermissions = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        });
        // 許可ステータスの処理が必要な場合
      } catch (error) {
        console.error(error);
      }
    };
    requestPermissions();

    // 通知リスナーの設定
    notificationListener.current = Notifications.addNotificationReceivedListener(
      async (notification) => {
        // 受信した通知の処理
        const count = await Notifications.getBadgeCountAsync();
        await Notifications.setBadgeCountAsync(count + 1);
      }
    );

    // 応答リスナーの設定
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        // 通知応答の処理
        await Notifications.dismissAllNotificationsAsync();
        await Notifications.setBadgeCountAsync(0);
      }
    );

    // コンポーネントのアンマウント時にリスナーをクリーンアップ
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
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
