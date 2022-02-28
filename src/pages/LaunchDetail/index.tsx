import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { ScrollView, useDripsyTheme } from 'dripsy';
import * as WebBrowser from 'expo-web-browser';
import { useIntl } from 'react-intl';
import { StatusBar } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import type { LaunchProps } from '@types';

type Props = {
  launch: LaunchProps;
};

export default function LaunchDetail() {
  const { launch } = useRoute().params as Props;

  const { formatMessage } = useIntl();
  const { theme } = useDripsyTheme();

  const [isHeaderVisible, setIsHeaderVisible] = React.useState(false);

  const isPendingConfirmation =
    launch.date_precision !== 'hour' && launch.date_precision !== 'day';
  const hasLaunchPad = !!launch.cores[0]?.landpad?.name;
  const payload = launch.payloads[0];

  return (
    <Atoms.Box sx={{ flex: 1, bg: 'background' }}>
      <StatusBar
        backgroundColor={
          isHeaderVisible ? theme.colors.secondary : 'transparent'
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        sx={{
          flex: 1,
        }}
        contentContainerSx={{
          width: '100%',
          pb: 120,
        }}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        onScroll={({ nativeEvent: { contentOffset } }) => {
          if (contentOffset.y > 35) {
            setIsHeaderVisible(true);
          }

          if (contentOffset.y < 35) {
            setIsHeaderVisible(false);
          }
        }}
      >
        <Molecules.Header title={launch.name} showTitle={isHeaderVisible} />

        <Animated.View
          entering={FadeIn.delay(150)}
          style={{ paddingHorizontal: 24 }}
        >
          <Atoms.Text
            variant="text-2xl"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mt: '16px',
            }}
          >
            {isHeaderVisible ? ' ' : launch.name}
          </Atoms.Text>

          <Atoms.Card>
            <Atoms.Row sx={{ flex: 1, alignItems: 'center' }}>
              <Atoms.Text
                variant="text-sm"
                sx={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {format(new Date(launch.date_local), 'Y')}
              </Atoms.Text>

              <Atoms.Box
                sx={{
                  height: '100%',
                  width: 1.5,
                  bg: 'background',
                  mx: '16px',
                }}
              />

              <Atoms.Box sx={{ flex: 1, bg: 'transparent' }}>
                {isPendingConfirmation ? (
                  <Atoms.Text
                    variant="text-xs"
                    sx={{
                      color: 'primary',
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  >
                    {formatMessage({ id: 'LABELS.DATE_PENDING' })}
                  </Atoms.Text>
                ) : (
                  <Molecules.LaunchDate
                    date={launch.date_local}
                    showLocalTime
                  />
                )}
              </Atoms.Box>

              {hasLaunchPad && launch.success !== null && (
                <Atoms.Badge>
                  {launch.success ? (
                    <Ionicons name="checkmark-sharp" color="green" size={12} />
                  ) : (
                    <Ionicons name="close-sharp" color="red" size={12} />
                  )}
                </Atoms.Badge>
              )}
            </Atoms.Row>
          </Atoms.Card>

          <Molecules.LivestreamPlayer youtubeId={launch.links.youtube_id} />

          <Molecules.SectionCard
            title={launch.rocket.name}
            onPress={async () => {
              await WebBrowser.openBrowserAsync(launch.rocket.wikipedia);
            }}
          />

          <Molecules.LaunchCore launchCore={launch.cores[0]} />

          <Molecules.LaunchPayload payload={payload} />

          <Molecules.LaunchMap launchpad={launch.launchpad} />

          {launch.details && (
            <Atoms.Card>
              <Atoms.Box>
                <Atoms.Text
                  variant="text-xs"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {formatMessage({ id: 'LABELS.MISSION_BRIEF' })}
                </Atoms.Text>

                <Atoms.Text
                  variant="text-xs"
                  sx={{
                    color: 'primary',
                    fontSize: 10,
                    mt: '15px',
                  }}
                >
                  {launch.details}
                </Atoms.Text>
              </Atoms.Box>
            </Atoms.Card>
          )}

          {launch.links.wikipedia && (
            <Molecules.SectionCard
              title="Wikipedia"
              onPress={async () => {
                await WebBrowser.openBrowserAsync(launch.links.wikipedia);
              }}
            />
          )}
        </Animated.View>
      </ScrollView>
    </Atoms.Box>
  );
}
