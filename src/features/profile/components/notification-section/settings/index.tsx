import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetHandleProps,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

type Props = {
  present: boolean;
  onDismiss: () => void;
};

export const NotificationSettings = ({ present, onDismiss }: Props) => {
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
    >
      <View onLayout={handleContentLayout} className="flex-1 items-center bg-dark py-8">
        <Text className="text-white text-2xl h-56">Awesome</Text>
      </View>
    </BottomSheetModal>
  );
};
