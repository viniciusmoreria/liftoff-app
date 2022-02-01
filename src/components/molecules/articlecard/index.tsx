import React from 'react';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Skeleton } from 'moti/skeleton';

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
      <Atoms.Row
        sx={{
          bg: 'secondary',
          mt: '16px',
          mb: onDailyFeed ? '10px' : 0,
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <Skeleton show={!hasLoadedImage} radius={0}>
          <Atoms.Image
            source={{
              uri: article.imageUrl,
            }}
            sx={{
              height: 120,
              width: 100,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            accessibilityLabel={`Published image of the article: ${article.title}`}
            onLoadEnd={() => setHasLoadedImage(true)}
          />
        </Skeleton>

        <Atoms.Box
          sx={{
            flex: 1,
            justifyContent: 'space-between',
            p: '16px',
          }}
        >
          <Atoms.Text
            variant="text-sm"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 11,
            }}
            numberOfLines={3}
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
            <Atoms.Row sx={{ flex: 1, alignItems: 'center' }}>
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
                flex: 1,
                color: 'white',
                fontWeight: 500,
                fontSize: 8,
                textAlign: 'right',
              }}
            >
              {article.newsSite}
            </Atoms.Text>
          </Atoms.Row>
        </Atoms.Box>
      </Atoms.Row>
    </Atoms.Pressable>
  );
}
