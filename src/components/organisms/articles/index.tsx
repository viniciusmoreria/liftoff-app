import React from 'react';

import { Alert, FlatList } from 'react-native';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimation from '@components/withAnimation';
import { useArticles } from '@hooks/useArticles';
import type { ArticleProps } from '@types';

import { Article } from '../articlecard';

function Articles() {
  const { data: articles } = useArticles();

  const articlesData = React.useMemo(
    () => articles?.pages.flat().slice(0, 5) as ArticleProps[],
    [articles?.pages],
  );

  if (!articlesData?.length) {
    return (
      <Atoms.Box
        sx={{
          mt: '36px',
          pl: '24px',
        }}
      >
        <Molecules.SectionTitle title="News" />

        <Atoms.Text variant="text-xs" sx={{ color: 'white', mt: '10px' }}>
          Something went wrong while fetching recent news, please try again
          later
        </Atoms.Text>
      </Atoms.Box>
    );
  }

  const renderItem = ({ item: article }: { item: ArticleProps }) => {
    return <Article key={article.id} article={article} />;
  };

  return (
    <Atoms.Box
      sx={{
        mt: '36px',
      }}
    >
      <Atoms.Box sx={{ pl: '24px' }}>
        <Molecules.SectionTitle
          title="News"
          subtitle="See all"
          onPress={() => {
            // TODO - open all articles screen
            Alert.alert('In development');
          }}
        />
      </Atoms.Box>

      <FlatList
        data={articlesData}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24 }}
        horizontal
        renderItem={renderItem}
      />
    </Atoms.Box>
  );
}

const ArticlesWithAnimation = withAnimation(Articles, 950);

export { ArticlesWithAnimation as Articles };
