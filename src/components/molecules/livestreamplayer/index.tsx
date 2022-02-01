import React from 'react';

import { Skeleton } from 'moti/skeleton';
import YoutubePlayer from 'react-native-youtube-iframe';

import * as Atoms from '@components/atoms';

function LivestreamPlayer({ youtubeId }: { youtubeId: string }) {
  const [hasLoadedVideo, setHasLoadedVideo] = React.useState(false);

  return (
    <Atoms.Box>
      {youtubeId ? (
        <Atoms.Card sx={{ p: 0, overflow: 'hidden' }}>
          <Skeleton show={!hasLoadedVideo}>
            <YoutubePlayer
              height={220}
              videoId={youtubeId}
              webViewProps={{
                injectedJavaScript: `
                  var element = document.getElementsByClassName('container')[0];
                  element.style.position = 'unset';
                  true;
                `,
              }}
              webViewStyle={{
                borderRadius: 8,
              }}
              onReady={() => setHasLoadedVideo(true)}
            />
          </Skeleton>
        </Atoms.Card>
      ) : (
        <Atoms.Card sx={{ height: 180 }}>
          <Atoms.Center sx={{ flex: 1, bg: 'transparent' }}>
            <Atoms.Text
              variant="text-xs"
              sx={{
                color: 'primary',
                fontWeight: 500,
                fontSize: 10,
              }}
            >
              Waiting for livestream to start
            </Atoms.Text>
          </Atoms.Center>
        </Atoms.Card>
      )}
    </Atoms.Box>
  );
}

export { LivestreamPlayer };
