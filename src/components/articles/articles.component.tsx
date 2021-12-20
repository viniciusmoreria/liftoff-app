import React from 'react';

import { Box, FlatList, Row, Text } from 'native-base';

import useArticles from '@hooks/useArticles';
import { ArticleProps } from '@types';

import withAnimatedBox from '../withAnimatedBox';
import { Article } from './article.component';

function Articles() {
  const { data: articles } = useArticles();

  const articlesData = React.useMemo(
    () => articles?.pages.flat().slice(0, 5) as ArticleProps[],
    [articles?.pages],
  );

  if (!articlesData.length) {
    return (
      <Box mt="6">
        <Box pl="4">
          <Text color="white" fontSize="lg" fontWeight={700}>
            News
          </Text>
        </Box>

        <Box w="100%" py="4" pl="4">
          <Text color="white" fontSize="sm" fontWeight={700}>
            Something went wrong while fetching recent news, please try again
            later
          </Text>
        </Box>
      </Box>
    );
  }

  const renderItem = ({ item: article }: { item: ArticleProps }) => {
    return <Article key={article.id} article={article} />;
  };

  return (
    <Box mt="6">
      <Row alignItems="center" justifyContent="space-between" pl="4">
        <Text color="white" fontSize="lg" fontWeight={700}>
          News
        </Text>

        <Text color="white" fontSize="sm" fontWeight={700}>
          Show more
        </Text>
      </Row>

      <FlatList
        data={articlesData}
        renderItem={renderItem}
        horizontal
        py="4"
        pl="4"
      />
    </Box>
  );
}

export default withAnimatedBox(Articles, 950);
