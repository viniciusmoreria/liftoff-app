import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { queryClient } from '@libs/react-query';
import { clientPersister } from '@libs/react-query/persistor';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (__DEV__) {
  // @ts-ignore
  import('../../libs/reactotron');
}

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: clientPersister }}>
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
};
