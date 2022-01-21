import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { ScrollView } from 'dripsy';
import { Linking } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import type { LaunchProps } from '@types';

type Props = {
  launch: LaunchProps;
};

export default function LaunchDetail() {
  const insets = useSafeAreaInsets();

  const { launch } = useRoute().params as Props;

  const isPendingConfirmation =
    launch.date_precision !== 'hour' && launch.date_precision !== 'day';

  const hasLaunchPad = !!launch.cores[0]?.landpad?.name;
  const payload = launch.payloads[0];

  return (
    <Atoms.Box sx={{ flex: 1, bg: 'background', pt: insets.top, px: '24px' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        sx={{
          flex: 1,
        }}
        contentContainerSx={{
          width: '100%',
          pb: '60px',
        }}
      >
        <Animated.View entering={FadeIn.delay(150)}>
          <Molecules.Header />

          <Atoms.Text
            variant="text-2xl"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mt: '24px',
            }}
          >
            {launch.name}
          </Atoms.Text>

          <Atoms.Card>
            <Atoms.Row
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Atoms.Row>
                <Molecules.LaunchDateBadge launch={launch} />

                <Atoms.Center sx={{ bg: 'transparent', ml: '12px' }}>
                  {isPendingConfirmation ? (
                    <Atoms.Text
                      variant="text-xs"
                      sx={{
                        color: 'primary',
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    >
                      Date pending
                    </Atoms.Text>
                  ) : (
                    <Atoms.Box>
                      <Atoms.Text
                        variant="text-xs"
                        sx={{
                          color: 'white',
                          fontSize: 9,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          mb: '4px',
                        }}
                      >
                        {format(new Date(launch.date_local), 'Y')}
                      </Atoms.Text>

                      <Molecules.LaunchDate date={launch.date_local} />
                    </Atoms.Box>
                  )}
                </Atoms.Center>
              </Atoms.Row>

              {hasLaunchPad && (
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
            onPress={() => {
              Linking.openURL(launch.rocket.wikipedia);
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
                  Mission Brief
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
              onPress={() => {
                Linking.openURL(launch.links.wikipedia);
              }}
            />
          )}
        </Animated.View>
      </ScrollView>
    </Atoms.Box>
  );
}
