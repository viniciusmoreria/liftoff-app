import { PlaceholderUserPicture } from '@assets/images';
import { Ionicons, Feather } from '@expo/vector-icons';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useAnalytics } from '@libs/firebase/analytics';
import { formatters } from '@libs/utils/formatters';
import { isAndroid } from '@libs/utils/platform';
import { ProfileSheet, Switch, Text } from '@modules/components';
import { useNotificationStore } from '@modules/notifications/store/notification-store';
import { NotificationPreference } from '@modules/notifications/store/types';
import { useUserStore } from '@modules/user/store/user-store';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { format } from 'date-fns';
import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { useRef } from 'react';
import { Linking, Share, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const remindersArray = ['tenMinutes', 'oneHour', 'twentyFourHour'];

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
);

const getReminderLabel = (type: NotificationPreference['type']) => {
  const labels: Record<string, string> = {
    tenMinutes: '10 minutes',
    oneHour: '1 hour',
    twentyFourHour: '24 hours',
  };

  return labels[type];
};

const getLaunchLocationLabel = (label: string) => {
  const labels: Record<string, string> = {
    cape: 'Cape Canaveral',
    van: 'Vandenberg',
  };

  return labels[label] || label;
};

export default function Profile() {
  const { top, bottom } = useSafeAreaInsets();

  const profileBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { logEvent } = useAnalytics();
  const { username, profilePicture } = useUserStore();
  const { getPreference, notificationPreferences, setNotificationPreference } =
    useNotificationStore();

  const atLeastOneIsActive = notificationPreferences.some((preference) => preference.value);
  const updatesState = getPreference('updates');
  const livestreamState = getPreference('webcastLive');

  const onSendEmailButtonTap = async (title: string) => {
    const reportInfo = {
      Version: Application.nativeApplicationVersion,
      Device: `${Device.manufacturer} ${Device.modelName}`,
      OS: `${Device.osName} ${Device.osVersion}`,
      Timezone: format(new Date(), formatters.date.timezone),
    };

    const deviceData = Object.entries(reportInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    logEvent('send_email', { deviceData });

    await Linking.openURL(
      `mailto:appliftoff@gmail.com?subject=Liftoff ${title} Request (v${Application.nativeApplicationVersion})&body=\n\n\n\n${deviceData}`
    );
  };

  const onRateAppButtonTap = async () => {
    logEvent('rate_app');

    if (isAndroid) {
      await Linking.openURL(`market://details?id=${Application.applicationId}`);
    } else {
      await Linking.openURL(
        `https://apps.apple.com/app/apple-store/id1645685152?action=write-review`
      );
    }
  };

  const onShareAppButtonTap = async () => {
    logEvent('share_app');

    await Share.share({
      message: `Track and watch all upcoming rocket launches from agencies around the world with Liftoff.\n\nDownload Liftoff for iOS: https://apple.co/3CHM9YO \n\nDownload Liftoff for Android: https://play.google.com/store/apps/details?id=${Application.applicationId}`,
    });
  };

  const onOpenPrivacyPolicyButtonTap = async () => {
    logEvent('open_external_link', { url: 'https://liftoffprivacypolicy.carrd.co/' });

    await WebBrowser.openBrowserAsync('https://liftoffprivacypolicy.carrd.co/');
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => profileBottomSheetModalRef.current?.present()}>
        <View style={styles.profileContainer}>
          <View>
            <Image
              source={profilePicture ? { uri: profilePicture } : PlaceholderUserPicture}
              style={styles.profilePicture}
            />
            <View style={styles.editProfile}>
              <Feather name="edit-2" color="white" size={14} />
            </View>
          </View>
          <Text numberOfLines={2} text={username ?? 'crew member'} weight="semiBold" />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.section}>
        <Text text="Notifications" size="xxs" color={colors.text} weight="semiBold" />

        <View style={styles.sectionContent}>
          <TouchableWithoutFeedback onPress={() => bottomSheetModalRef.current?.present()}>
            <View style={styles.flexRow}>
              <Text text="Reminders" size="xxs" color={colors.text} weight="semiBold" />

              <View style={styles.flexRow}>
                <Text
                  text={atLeastOneIsActive ? 'On' : 'Off'}
                  size="xxs"
                  color={colors.text}
                  weight="semiBold"
                />
                <Ionicons name="chevron-forward" color={colors.textDim} size={14} />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.flexRow}>
            <Text text="Launch Updates" size="xxs" color={colors.text} weight="semiBold" />
            <Switch
              isEnabled={updatesState}
              onPress={() => {
                logEvent('updates', { value: !updatesState });
                setNotificationPreference({ type: 'updates', value: !updatesState });
              }}
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="Available Livestream" size="xxs" color={colors.text} weight="semiBold" />
            <Switch
              isEnabled={livestreamState}
              onPress={() => {
                logEvent('webcastLive', { value: !livestreamState });
                setNotificationPreference({ type: 'webcastLive', value: !livestreamState });
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text text="Support" size="xxs" color={colors.text} weight="semiBold" />

        <View style={styles.sectionContent}>
          <TouchableWithoutFeedback onPress={() => onSendEmailButtonTap('Support')}>
            <View style={styles.flexRow}>
              <Text text="Bug Report" size="xxs" color={colors.text} weight="semiBold" />
              <Ionicons name="chevron-forward" color={colors.textDim} size={14} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onSendEmailButtonTap('Feature')}>
            <View style={styles.flexRow}>
              <Text text="Feature Request" size="xxs" color={colors.text} weight="semiBold" />
              <Ionicons name="chevron-forward" color={colors.textDim} size={14} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onRateAppButtonTap}>
            <View style={styles.flexRow}>
              <Text text="Rate Our App" size="xxs" color={colors.text} weight="semiBold" />
              <Ionicons name="chevron-forward" color={colors.textDim} size={14} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onShareAppButtonTap}>
            <View style={styles.flexRow}>
              <Text text="Share" size="xxs" color={colors.text} weight="semiBold" />
              <Ionicons name="chevron-forward" color={colors.textDim} size={14} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.section}>
        <Text text="Legal" size="xxs" color={colors.text} weight="semiBold" />

        <View style={styles.sectionContent}>
          <TouchableWithoutFeedback onPress={onOpenPrivacyPolicyButtonTap}>
            <View style={styles.flexRow}>
              <Text text="Privacy Policy" size="xxs" color={colors.text} weight="semiBold" />
              <Ionicons name="chevron-forward" color={colors.textDim} size={14} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <BottomSheetModal
        ref={profileBottomSheetModalRef}
        enableDynamicSizing
        android_keyboardInputMode="adjustResize"
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        handleIndicatorStyle={{
          backgroundColor: colors.textDim,
        }}
        handleStyle={{
          backgroundColor: colors.border,
          borderTopRightRadius: spacing.lg,
          borderTopLeftRadius: spacing.lg,
        }}
        backgroundStyle={{
          backgroundColor: colors.border,
        }}>
        <ProfileSheet onClose={() => profileBottomSheetModalRef.current?.close()} />
      </BottomSheetModal>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        topInset={top + spacing.md}
        handleIndicatorStyle={{
          backgroundColor: colors.textDim,
        }}
        handleStyle={{
          backgroundColor: colors.border,
          borderTopRightRadius: spacing.lg,
          borderTopLeftRadius: spacing.lg,
        }}
        backgroundStyle={{
          backgroundColor: colors.border,
        }}>
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.bottomSheetContainer,
            { paddingBottom: bottom || spacing.lg },
          ]}>
          <Text text="Default Reminders" size="sm" weight="semiBold" />
          <View style={styles.bottomSheetSectionContent}>
            {notificationPreferences
              .filter((preference) => remindersArray.includes(preference.type))
              .map((item) => {
                return (
                  <View style={styles.flexRow} key={item.type}>
                    <Text
                      text={`${getReminderLabel(item.type)} before launch`}
                      size="xxs"
                      color={colors.text}
                      weight="semiBold"
                    />
                    <Switch
                      isEnabled={getPreference(item.type)}
                      onPress={() => {
                        logEvent(item.type, {
                          value: !getPreference(item.type),
                        });

                        setNotificationPreference({
                          type: item.type,
                          value: !getPreference(item.type),
                        });
                      }}
                    />
                  </View>
                );
              })}
          </View>

          <View>
            <Text text="Launch Locations" size="sm" weight="semiBold" />
            <Text
              text="Select the launch locations you want to receive reminders for."
              size="xxs"
            />

            <View style={styles.bottomSheetSectionContent}>
              {notificationPreferences
                .filter(
                  (preference) =>
                    ![...remindersArray, 'webcastLive', 'updates'].includes(preference.type)
                )
                .map((item) => {
                  return (
                    <View style={styles.flexRow} key={item.type}>
                      <Text
                        text={getLaunchLocationLabel(item.type).replace('_', ' ')}
                        size="xxs"
                        color={colors.text}
                        weight="semiBold"
                        style={{ textTransform: 'capitalize' }}
                      />
                      <Switch
                        isEnabled={getPreference(item.type)}
                        onPress={() => {
                          logEvent(item.type, {
                            value: !getPreference(item.type),
                          });

                          setNotificationPreference({
                            type: item.type,
                            value: !getPreference(item.type),
                          });
                        }}
                      />
                    </View>
                  );
                })}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: spacing.sm,
  },
  section: {
    paddingHorizontal: spacing.sm,
  },
  sectionContent: {
    marginVertical: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.border,
    borderRadius: spacing.xs,
    rowGap: spacing.md,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetContainer: {
    flexGrow: 1,
    backgroundColor: colors.border,
    padding: spacing.lg,
    borderRadius: spacing.lg,
    rowGap: spacing.md,
  },
  bottomSheetSectionContent: {
    marginVertical: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.borderDim,
    borderRadius: spacing.xs,
    rowGap: spacing.md,
  },
  profileContainer: {
    alignItems: 'center',
    rowGap: spacing.xs,
    paddingTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  editProfile: {
    position: 'absolute',
    right: 0,
    bottom: -spacing.xs,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7c7c7cc1',
  },
  contentContainerStyle: {
    paddingTop: spacing.xl,
    rowGap: spacing.sm,
  },
});
