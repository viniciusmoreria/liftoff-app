import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Dimensions, Text, View } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { usePreferencesStore } from '@store/preferencesStore';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MenuItem } from '../../menu-item';

type Props = {
  present: boolean;
  onDismiss: () => void;
};

export const NotificationSettings = ({ present, onDismiss }: Props) => {
  const insets = useSafeAreaInsets();
  const {
    all,
    twentyFourHour,
    oneHour,
    tenMinutes,
    cape,
    china,
    french_guiana,
    india,
    japan,
    new_zealand,
    russia,
    van,
    wallops,
    setNotificationPreference,
  } = usePreferencesStore();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        opacity={0.8}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const renderHeaderHandle = useCallback(
    (props: BottomSheetHandleProps) => (
      <View {...props} className="bg-dark items-center justify-items-center w-full">
        <View className="bg-secondary mt-4 rounded-lg w-14 h-2" />
      </View>
    ),
    []
  );

  useEffect(() => {
    if (present) {
      bottomSheetModalRef.current?.present();
    }
  }, [present]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onDismiss={onDismiss}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={renderBackdrop}
      handleComponent={renderHeaderHandle}
      topInset={insets.top + 24}
      style={{
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
      }}
      backgroundStyle={{
        backgroundColor: '#16171B',
      }}
    >
      <BottomSheetScrollView
        onLayout={handleContentLayout}
        style={{
          maxHeight: Dimensions.get('window').height,
        }}
        contentContainerStyle={{
          paddingTop: 32,
          paddingBottom: insets.bottom * 5,
          paddingHorizontal: 32,
        }}
      >
        <View className="bg-secondary p-4 rounded-lg space-y-4">
          <View>
            <MenuItem
              title="Reminders"
              useSwitch
              isEnabled={all}
              onPress={() =>
                setNotificationPreference({
                  type: 'all',
                  value: !all,
                })
              }
            />
          </View>
        </View>

        {all && (
          <Animated.View entering={FadeIn} exiting={FadeOut.duration(150)}>
            <Text className="text-xl text-white font-bold mt-8">Default Reminders</Text>

            <View className="bg-secondary p-4 rounded-lg mt-10 space-y-4">
              <View>
                <MenuItem
                  title="24 hours before launch"
                  useSwitch
                  isEnabled={twentyFourHour}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'twentyFourHour',
                      value: !twentyFourHour,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="1 hour before launch"
                  useSwitch
                  isEnabled={oneHour}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'oneHour',
                      value: !oneHour,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="10 minutes before launch"
                  useSwitch
                  isEnabled={tenMinutes}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'tenMinutes',
                      value: !tenMinutes,
                    })
                  }
                />
              </View>
            </View>

            <Text className="text-xl text-white font-bold mt-8">Launch Locations</Text>
            <Text className="text-sm text-white mt-4">
              Select the launch locations you want to receive reminders for.
            </Text>

            <View className="bg-secondary p-4 rounded-lg mt-6 space-y-4">
              <View>
                <MenuItem
                  title="Cape Canaveral"
                  useSwitch
                  isEnabled={cape}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'cape',
                      value: !cape,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="Vandenberg"
                  useSwitch
                  isEnabled={van}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'van',
                      value: !van,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="Wallops"
                  useSwitch
                  isEnabled={wallops}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'wallops',
                      value: !wallops,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="China"
                  useSwitch
                  isEnabled={china}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'china',
                      value: !china,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="Russia"
                  useSwitch
                  isEnabled={russia}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'russia',
                      value: !russia,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="India"
                  useSwitch
                  isEnabled={india}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'india',
                      value: !india,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="Japan"
                  useSwitch
                  isEnabled={japan}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'japan',
                      value: !japan,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="French Guiana"
                  useSwitch
                  isEnabled={french_guiana}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'french_guiana',
                      value: !french_guiana,
                    })
                  }
                />
              </View>
              <View>
                <MenuItem
                  title="New Zealand"
                  useSwitch
                  isEnabled={new_zealand}
                  onPress={() =>
                    setNotificationPreference({
                      type: 'new_zealand',
                      value: !new_zealand,
                    })
                  }
                />
              </View>
            </View>
          </Animated.View>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
