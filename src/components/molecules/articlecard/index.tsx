import React from 'react';

import { Feather } from '@expo/vector-icons';
import { Skeleton } from '@motify/skeleton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as Atoms from '@components/atoms';
import type { Routes } from '@routes/app.routes';
import type { ArticleProps } from '@types';
import { formatRelativeDate } from '@utils/helpers';

type NavigationParam = NativeStackNavigationProp<Routes, 'LaunchDetail'>;

export function Article({
  article,
  onDailyFeed,
}: {
  article: ArticleProps;
  onDailyFeed?: boolean;
}) {
  const { navigate } = useNavigation<NavigationParam>();

  const [hasLoadedImage, setHasLoadedImage] = React.useState(false);

  return (
    <Atoms.Pressable onPress={() => navigate('ArticleDetail', { article })}>
      <Atoms.Box
        sx={{
          bg: 'secondary',
          mr: '16px',
          ml: onDailyFeed ? '24px' : 0,
          mt: '16px',
          mb: onDailyFeed ? '10px' : 0,
          borderRadius: 8,
        }}
      >
        <Skeleton show={!hasLoadedImage}>
          <Atoms.Image
            source={{
              uri: article.imageUrl,
            }}
            sx={{
              height: 200,
              width: onDailyFeed ? '100%' : 280,
              borderRadius: 8,
            }}
            accessibilityLabel={`Published image of the article: ${article.title}`}
            onLoadEnd={() => setHasLoadedImage(true)}
          />
        </Skeleton>

        <Atoms.Box
          sx={{
            bg: 'secondary',
            p: '16px',
            height: 100,
            width: onDailyFeed ? '100%' : 280,
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <Atoms.Text
            variant="text-sm"
            sx={{
              flex: 1,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 11,
              mt: '6px',
            }}
            numberOfLines={2}
          >
            {article.title}
          </Atoms.Text>

          <Atoms.Row
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Atoms.Row sx={{ alignItems: 'center' }}>
              <Feather name="clock" color="white" />

              <Atoms.Text
                variant="text-xs"
                sx={{
                  color: 'white',
                  fontWeight: 500,
                  fontSize: 8,
                  ml: '6px',
                }}
              >
                {formatRelativeDate(article.publishedAt)}
              </Atoms.Text>
            </Atoms.Row>

            <Atoms.Text
              variant="text-xs"
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: 9,
              }}
            >
              {article.newsSite}
            </Atoms.Text>
          </Atoms.Row>
        </Atoms.Box>
      </Atoms.Box>
    </Atoms.Pressable>
  );
}
