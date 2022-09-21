import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetHandleProps,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { usePreferencesStore } from '@store/preferencesStore';

import { MenuItem } from '../../menu-item';

type Props = {
  present: boolean;
  onDismiss: () => void;
};

export const NotificationSettings = ({ present, onDismiss }: Props) => {
  const {
    allowOneDayNotifications,
    allowOneHourNotifications,
    allowTenMinutesNotifications,
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
      enableOverDrag={false}
      style={{
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
      }}
    >
      <View onLayout={handleContentLayout} className="flex-1 bg-dark pt-8 pb-14 px-8">
        <Text className="text-xl text-white font-bold">Default reminders</Text>

        <View className="bg-secondary p-4 rounded-lg mt-10 space-y-4">
          <View>
            <MenuItem
              title="24 hours before launch"
              useSwitch
              isEnabled={allowOneDayNotifications}
              onPress={() =>
                setNotificationPreference({
                  type: 'twentyFourHour',
                  value: !allowOneDayNotifications,
                })
              }
            />
          </View>
          <View>
            <MenuItem
              title="1 hour before launch"
              useSwitch
              isEnabled={allowOneHourNotifications}
              onPress={() =>
                setNotificationPreference({
                  type: 'oneHour',
                  value: !allowOneHourNotifications,
                })
              }
            />
          </View>
          <View>
            <MenuItem
              title="10 minutes before launch"
              useSwitch
              isEnabled={allowTenMinutesNotifications}
              onPress={() =>
                setNotificationPreference({
                  type: 'tenMinutes',
                  value: !allowTenMinutesNotifications,
                })
              }
            />
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
};
