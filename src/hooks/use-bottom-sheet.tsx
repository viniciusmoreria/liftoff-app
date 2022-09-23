import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Dimensions, Keyboard, View } from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetHandleProps,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SetSheetProps = {
  content: JSX.Element;
  blockGestures?: boolean;
  onHideCallback?: () => void;
};

type BottomSheetContextData = {
  setSheetContent: (props: SetSheetProps) => void;
  closeSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextData>({} as BottomSheetContextData);

type Props = {
  children: JSX.Element;
};

export const BottomSheetProvider = ({ children }: Props) => {
  const insets = useSafeAreaInsets();

  const [Component, setComponentState] = useState<JSX.Element | null>(null);
  const [isGestureActive, toggleGesture] = useReducer((s) => !s, true);
  const [callbackFunc, setCallbackFunc] = useState<() => void>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  useEffect(() => {
    if (Component) {
      bottomSheetRef.current?.expand();
    }
  }, [Component]);

  const setSheetContent = useCallback(
    ({ content, blockGestures, onHideCallback }: SetSheetProps) => {
      if (blockGestures) toggleGesture();
      if (onHideCallback) setCallbackFunc(() => onHideCallback);

      setComponentState(content);
    },
    []
  );

  const closeSheet = useCallback(() => {
    if (!isGestureActive) {
      toggleGesture();
    }
    callbackFunc?.();

    bottomSheetRef.current?.close();

    setTimeout(() => {
      setComponentState(null);
      setCallbackFunc(undefined);
    }, 150);
  }, [callbackFunc, isGestureActive]);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        opacity={0.8}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={[props.style, { backgroundColor: '#242529' }]}
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

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const contextValue = useMemo(
    () => ({
      setSheetContent,
      closeSheet,
    }),
    [closeSheet, setSheetContent]
  );

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}

      {Component && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          backdropComponent={renderBackdrop}
          handleComponent={renderHeaderHandle}
          enablePanDownToClose={isGestureActive}
          enableContentPanningGesture={isGestureActive}
          enableHandlePanningGesture={isGestureActive}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          topInset={insets.top + 24}
          style={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            overflow: 'hidden',
          }}
          backgroundStyle={{
            backgroundColor: '#16171B',
          }}
          onClose={() => {
            closeSheet();
            Keyboard.dismiss();
          }}
        >
          <BottomSheetScrollView
            onLayout={handleContentLayout}
            style={{
              maxHeight: Dimensions.get('window').height,
            }}
            contentContainerStyle={{
              paddingTop: 32,
              paddingBottom: 24 + insets.bottom,
              paddingHorizontal: 32,
            }}
          >
            {Component}
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
};

/**
 * @function setSheetContent
 * @description Set the sheet content to be rendered.
 * @param content - JSX.Element to be placed as a sheet content
 * @param blockGestures - boolean to disable content panning gesture interaction
 * @param onHideCallback - function to be executed when the sheet is closed
 * @returns void
 *
 * @function closeSheet
 * @description Snap to the minimum provided point from snapPoints.
 * @returns void
 */
export function useBottomSheet(): BottomSheetContextData {
  const context = useContext(BottomSheetContext);

  return context;
}
