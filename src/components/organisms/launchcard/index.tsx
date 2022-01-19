import React, { ComponentProps } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Skeleton } from '@motify/skeleton';
import { format } from 'date-fns';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import { LaunchProps } from '@types';

type LaunchInfoProps = ComponentProps<typeof Atoms.Box> & {
  launch: LaunchProps;
};

function Launch({ launch, sx }: LaunchInfoProps) {
  const [hasLoadedImage, setHasLoadedImage] = React.useState(false);

  const isPendingConfirmation =
    launch.date_precision !== 'hour' && launch.date_precision !== 'day';

  const hasYoutubeId = !!launch.links.youtube_id;
  const hasLaunchPad = !!launch.cores[0].landpad?.name;
  const hasSuccedded = !!launch.success;

  return (
    <Atoms.Box sx={{ mt: hasYoutubeId ? '16px' : 0 }}>
      {hasYoutubeId && (
        <Skeleton show={!hasLoadedImage}>
          <Atoms.Image
            source={{
              uri: `https://img.youtube.com/vi/${launch.links.youtube_id}/0.jpg`,
            }}
            sx={{
              height: 140,
              width: 280,
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
            }}
            accessibilityLabel={`${launch.rocket.name} rocket image`}
            onLoadEnd={() => setHasLoadedImage(true)}
          />
        </Skeleton>
      )}

      <Atoms.Box
        sx={{
          bg: 'secondary',
          p: '16px',
          mr: '16px',
          mt: hasYoutubeId ? 0 : '16px',
          height: 100,
          width: 280,
          borderRadius: 8,
          borderTopRightRadius: hasYoutubeId ? 0 : 8,
          borderTopLeftRadius: hasYoutubeId ? 0 : 8,
          justifyContent: 'space-between',
          ...sx,
        }}
      >
        <Atoms.Row
          sx={{
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Atoms.Box>
            <Atoms.Text
              variant="text-sm"
              sx={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
            >
              {launch.name}
            </Atoms.Text>

            <Atoms.Text
              variant="text-sm"
              sx={{
                color: 'primary',
                fontSize: 10,
                fontWeight: 500,
                mt: '3px',
              }}
            >
              {launch?.rocket.name}
            </Atoms.Text>
          </Atoms.Box>

          <Atoms.Badge sx={{ px: 8 }}>
            {isPendingConfirmation ? (
              <Atoms.Center>
                <Atoms.Text
                  variant="text-xs"
                  sx={{
                    color: 'white',
                    fontSize: 9,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  {format(new Date(launch.date_local), 'Y')}
                </Atoms.Text>
              </Atoms.Center>
            ) : (
              <Atoms.Center>
                <Atoms.Text
                  sx={{
                    color: 'primary',
                    fontSize: 8,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  {format(new Date(launch.date_local), 'MMM')}
                </Atoms.Text>

                <Atoms.Text
                  sx={{
                    color: 'white',
                    fontSize: 9,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  {format(new Date(launch.date_local), 'd')}
                </Atoms.Text>
              </Atoms.Center>
            )}
          </Atoms.Badge>
        </Atoms.Row>

        <Atoms.Row
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Atoms.Row
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Atoms.Badge sx={{ height: 15 }}>
              <Atoms.Text
                variant="text-xs"
                sx={{
                  color: 'white',
                  fontSize: 9,
                  fontWeight: 500,
                }}
              >
                {launch.payloads[0].orbit}
              </Atoms.Text>
            </Atoms.Badge>

            {hasLaunchPad && (
              <Atoms.Row>
                <Atoms.Badge
                  sx={{
                    ml: '4px',
                    height: 15,
                  }}
                >
                  <Atoms.Text
                    variant="text-xs"
                    sx={{
                      color: 'white',
                      fontSize: 9,
                      fontWeight: 500,
                    }}
                  >
                    {launch.cores[0].landpad?.name}
                  </Atoms.Text>
                </Atoms.Badge>

                <Atoms.Badge
                  sx={{
                    ml: '4px',
                    height: 15,
                  }}
                >
                  {hasSuccedded ? (
                    <Ionicons name="checkmark-sharp" color="green" size={8} />
                  ) : (
                    <Ionicons name="close-sharp" color="red" size={8} />
                  )}
                </Atoms.Badge>
              </Atoms.Row>
            )}
          </Atoms.Row>

          <Atoms.Center sx={{ bg: 'transparent' }}>
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
              <Molecules.LaunchDate date={launch.date_local} />
            )}
          </Atoms.Center>
        </Atoms.Row>
      </Atoms.Box>
    </Atoms.Box>
  );
}

export { Launch };
