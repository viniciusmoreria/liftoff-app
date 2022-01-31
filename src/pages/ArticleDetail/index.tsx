import React from 'react';

import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'dripsy';
import { Skeleton } from 'moti/skeleton';
import { Linking, StatusBar } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import { useDimensions } from '@hooks/useDimensions';
import type { ArticleProps } from '@types';
import deviceDimensions from '@utils/DeviceUtils';
import { formatRelativeDate } from '@utils/helpers';

type Props = {
  article: ArticleProps;
};

export default function ArticleDetail() {
  const { article } = useRoute().params as Props;

  const { screen } = useDimensions();

  const [hasLoadedImage, setHasLoadedImage] = React.useState(false);

  return (
    <Atoms.Box sx={{ flex: 1, bg: 'background' }}>
      <StatusBar backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerSx={{
          flexGrow: 1,
          pb: 60,
        }}
      >
        <Animated.View
          entering={FadeIn.delay(150)}
          style={{
            width: '100%',
          }}
        >
          <Molecules.Header
            title=""
            sx={{
              position: 'absolute',
              zIndex: 1,
            }}
          />

          <Skeleton show={!hasLoadedImage}>
            <Atoms.Box>
              <Atoms.Image
                source={{
                  uri: article.imageUrl,
                }}
                sx={{
                  height: screen.height / 2,
                  opacity: 0.6,
                }}
                onLoadEnd={() => setHasLoadedImage(true)}
                accessibilityLabel={`Published image of the article: ${article.title}`}
              />

              <Atoms.Box
                sx={{
                  px: '24px',
                  position: 'absolute',
                  bottom: '48px',
                }}
              >
                <Atoms.Text
                  variant={
                    deviceDimensions.isTinyPhone ? 'text-lg' : 'text-2xl'
                  }
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {article.title}
                </Atoms.Text>
              </Atoms.Box>
            </Atoms.Box>
          </Skeleton>

          <Atoms.Box
            sx={{
              marginTop: -25,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              width: '100%',
              bg: 'background',
            }}
          >
            <Atoms.Box sx={{ pt: '48px', px: '24px' }}>
              <Atoms.Row
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Atoms.Text
                  variant="text-xs"
                  sx={{
                    color: 'white',
                    fontSize: 10,
                  }}
                >
                  {article.newsSite}
                </Atoms.Text>

                <Atoms.Row sx={{ alignItems: 'center' }}>
                  <Feather name="clock" color="white" />

                  <Atoms.Text
                    variant="text-xs"
                    sx={{
                      color: 'white',
                      fontWeight: 500,
                      fontSize: 10,
                      ml: '6px',
                    }}
                  >
                    {formatRelativeDate(article.publishedAt)}
                  </Atoms.Text>
                </Atoms.Row>
              </Atoms.Row>

              <Atoms.Box
                sx={{
                  mt: '48px',
                }}
              >
                <Atoms.Text
                  variant="text-sm"
                  sx={{
                    color: 'white',
                  }}
                >
                  {article.summary}
                </Atoms.Text>

                <Atoms.Row sx={{ mt: '36px' }}>
                  <Atoms.Button
                    onPress={() => Linking.openURL(article.url)}
                    title={`Continue reading on ${article.newsSite}`}
                    textVariant="text-xs"
                    sx={{ bg: 'secondary' }}
                  />
                </Atoms.Row>
              </Atoms.Box>
            </Atoms.Box>
          </Atoms.Box>
        </Animated.View>
      </ScrollView>
    </Atoms.Box>
  );
}
