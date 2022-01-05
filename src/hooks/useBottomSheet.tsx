import React from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { useDripsyTheme } from 'dripsy';
import { Keyboard } from 'react-native';

import * as Atoms from '@components/atoms';

type SetSheetProps = {
  content: JSX.Element;
  blockGestures?: boolean;
  onHideCallback?: () => void;
};

type BottomSheetContextData = {
  setSheetContent: (props: SetSheetProps) => void;
  closeSheet: () => void;
};

const BottomSheetContext = React.createContext<BottomSheetContextData>(
  {} as BottomSheetContextData,
);

export const BottomSheetProvider: React.FC = ({ children }) => {
  const { theme } = useDripsyTheme();

  const [Component, setComponentState] = React.useState<JSX.Element | null>(
    null,
  );
  const [isGestureActive, toggleGesture] = React.useReducer((s) => !s, true);
  const [callbackFunc, setCallbackFunc] = React.useState<() => void>();

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const initialSnapPoints = React.useMemo(() => ['CONTENT_HEIGHT'], []);

  React.useEffect(() => {
    if (Component) {
      bottomSheetRef.current?.expand();
    }
  }, [Component]);

  // Set the sheet content
  const setSheetContent = React.useCallback(
    ({ content, blockGestures, onHideCallback }: SetSheetProps) => {
      if (onHideCallback) setCallbackFunc(() => onHideCallback);
      if (blockGestures) toggleGesture();

      setComponentState(content);
    },
    [],
  );

  // Snap to the minimum provided point from snapPoints.
  const closeSheet = React.useCallback(() => {
    // enable gestures if it had been previously deactivated
    if (!isGestureActive) {
      toggleGesture();
    }
    // executes callback function
    if (callbackFunc) callbackFunc();

    bottomSheetRef.current?.close();

    // reset callback function
    setTimeout(() => {
      setComponentState(null);
      setCallbackFunc(undefined);
    }, 200);
  }, [callbackFunc, isGestureActive]);

  // Component to be placed as a sheet backdrop.
  const renderBackdrop = React.useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        opacity={0.8}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={{ ...props.style, backgroundColor: theme.colors.secondary }}
      />
    ),
    [theme.colors.secondary],
  );

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const contextValue = React.useMemo(
    () => ({
      setSheetContent,
      closeSheet,
    }),
    [closeSheet, setSheetContent],
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
          handleComponent={() => (
            <Atoms.Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Atoms.Box
                sx={{
                  bg: 'primary',
                  mt: '16px',
                  borderRadius: 8,
                  width: 35,
                  height: 4.5,
                }}
              />
            </Atoms.Box>
          )}
          enablePanDownToClose={isGestureActive}
          enableContentPanningGesture={isGestureActive}
          enableHandlePanningGesture={isGestureActive}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          backgroundStyle={{
            backgroundColor: theme.colors.background,
          }}
          onClose={() => {
            closeSheet();
            Keyboard.dismiss();
          }}
        >
          <Atoms.Box
            sx={{ flex: 1, mt: '30px', px: '24px' }}
            onLayout={handleContentLayout}
          >
            {Component}
          </Atoms.Box>
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
  const context = React.useContext(BottomSheetContext);

  return context;
}
