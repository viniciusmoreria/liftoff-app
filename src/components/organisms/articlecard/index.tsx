import React from 'react';

import { Skeleton } from '@motify/skeleton';

import * as Atoms from '@components/atoms';
import { ArticleProps } from '@types';
import { formatRelativeDate } from '@utils/helpers';

export function Article({ article }: { article: ArticleProps }) {
  const [hasLoadedImage, setHasLoadedImage] = React.useState(false);

  return (
    <Atoms.Box
      sx={{
        bg: 'secondary',
        mr: '16px',
        mt: '16px',
        borderRadius: 8,
      }}
    >
      <Skeleton show={!hasLoadedImage}>
        <Atoms.Image
          source={{
            uri: article.imageUrl,
          }}
          sx={{
            height: 240,
            width: 250,
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
          width: 250,
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <Atoms.Row
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Atoms.Box
            sx={{
              borderBottomColor: 'accent',
              borderBottomWidth: 1.5,
            }}
          >
            <Atoms.Text
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: 9,
              }}
            >
              {article.newsSite}
            </Atoms.Text>
          </Atoms.Box>

          <Atoms.Badge>
            <Atoms.Text
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: 8,
              }}
            >
              {formatRelativeDate(article.publishedAt)}
            </Atoms.Text>
          </Atoms.Badge>
        </Atoms.Row>

        <Atoms.Text
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
      </Atoms.Box>
    </Atoms.Box>
  );
}
