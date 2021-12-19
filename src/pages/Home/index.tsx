import React from 'react';

import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {
  Box,
  Pressable,
  Center,
  Heading,
  ScrollView,
  StatusBar,
  Text,
} from 'native-base';
import { Keyboard, RefreshControl } from 'react-native';
import { useQueryClient } from 'react-query';

import { LoadingAnimation } from '@assets/animations';
import AnimatedBox from '@components/animatedbox';
import NextLaunch from '@components/nextlaunch';
import PastLaunches from '@components/pastlaunches';
import UpcomingLaunches from '@components/upcominglaunches';
import { usePastLaunches, useUpcomingLaunches } from '@hooks/useLaunches';
import { greeting, isNameValid } from '@utils/helpers';

import theme from '../../styles/theme';

export default function Home() {
  const queryClient = useQueryClient();
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const { isLoading: isLoadingLaunches, isError: errorUpcomingLaunches } =
    useUpcomingLaunches();

  const { isLoading: isLoadingPastLaunches, isError: errorPastLaunches } =
    usePastLaunches();

  const snapPoints = React.useMemo(() => [330], []);

  const [refreshing, setRefreshing] = React.useState(false);
  const [name, setName] = React.useState('');
  const [storagedName, setStoragedName] = React.useState('');

  const handleRefreshData = React.useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries();
    setRefreshing(false);
  }, [queryClient]);

  const handleSubmitName = React.useCallback(async () => {
    setStoragedName(name.trim());
    setName('');
    await AsyncStorage.setItem('name', name.trim());

    setTimeout(() => {
      bottomSheetRef.current?.close();
    }, 100);
  }, [name]);

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
    [],
  );

  React.useLayoutEffect(() => {
    async function getName() {
      const username = await AsyncStorage.getItem('name');

      if (username?.length) {
        setStoragedName(username);
      }
    }

    getName();
  }, []);

  if (isLoadingLaunches || isLoadingPastLaunches) {
    return <LoadingComponent />;
  }

  if (errorUpcomingLaunches || errorPastLaunches) {
    return <ErrorComponent />;
  }

  return (
    <>
      <ScrollView
        flex={1}
        bg="background"
        pr="4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefreshData}
            tintColor="white"
            colors={['white']}
          />
        }
      >
        <StatusBar animated barStyle="light-content" />

        <AnimatedBox>
          <Box safeArea mt="6" pl="4">
            <Heading color="white" fontWeight="500">
              {greeting()},
            </Heading>

            <Box alignSelf="flex-start">
              <Pressable onPress={() => bottomSheetRef.current?.expand()}>
                <Heading color="white">{storagedName || 'crew member'}</Heading>
                <Box
                  borderStyle="dotted"
                  borderColor="accent"
                  borderWidth={storagedName ? 0 : 1}
                />
              </Pressable>
            </Box>
          </Box>
        </AnimatedBox>

        <NextLaunch />

        <UpcomingLaunches />

        <PastLaunches />
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: theme.colors.background,
        }}
        handleComponent={() => (
          <Box w="100%" alignItems="center" justifyContent="center">
            <Box bg="primary" mt={4} rounded={8} w={10} h={1.5} />
          </Box>
        )}
        enablePanDownToClose
        enableOverDrag
        onClose={() => Keyboard.dismiss()}
      >
        <Box flex={1} mt="12" px="4">
          <Heading color="white">What you would like to be called?</Heading>

          <Box alignItems="center">
            <BottomSheetTextInput
              autoCapitalize="words"
              autoCompleteType="name"
              value={name}
              onChangeText={setName}
              style={{
                borderBottomColor: 'white',
                borderBottomWidth: 1.6,
                marginTop: 24,
                marginBottom: 36,
                width: '100%',
                height: 48,
                color: 'white',
                fontSize: 22,
                fontWeight: '500',
              }}
            />

            <Pressable
              onPress={handleSubmitName}
              disabled={!isNameValid.test(name)}
              opacity={isNameValid.test(name) ? 1 : 0.5}
              bg="secondary"
              w="100%"
              alignItems="center"
              p={3}
              borderRadius={8}
            >
              <Text color="white" fontSize="sm" fontWeight={700}>
                Confirm
              </Text>
            </Pressable>
          </Box>
        </Box>
      </BottomSheet>
    </>
  );
}

function LoadingComponent() {
  return (
    <Center flex={1} bg="background">
      <LottieView source={LoadingAnimation} autoPlay style={{ width: 50 }} />
    </Center>
  );
}

function ErrorComponent() {
  const queryClient = useQueryClient();

  const handleRefreshData = React.useCallback(async () => {
    await queryClient.refetchQueries();
  }, [queryClient]);

  return (
    <Center flex={1} bg="background">
      <Text color="primary" mb="2">
        Something went wrong
      </Text>

      <Pressable
        onPress={handleRefreshData}
        w={100}
        bg="secondary"
        p={2}
        borderRadius={16}
        alignItems="center"
      >
        <Text color="white" fontSize="sm" fontWeight={700}>
          Try again
        </Text>
      </Pressable>
    </Center>
  );
}
