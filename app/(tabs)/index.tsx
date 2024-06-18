import { useEffect } from 'react';
import { Image, StyleSheet, Platform, View, TurboModuleRegistry, Button } from 'react-native';

import * as Notifications from 'expo-notifications';

export default function HomeScreen() {
  useEffect(() => {
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
        console.log(status);
      } catch (error) {
        console.error(error);
      }
    };

    requestPermissions();
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
