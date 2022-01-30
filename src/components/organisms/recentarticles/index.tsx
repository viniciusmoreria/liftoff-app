import React from 'react';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimation from '@components/withAnimation';
import { useArticles } from '@hooks/useArticles';
import type { Routes } from '@routes/app.routes';
import type { ArticleProps } from '@types';

type NavigationParam = NativeStackNavigationProp<Routes, 'Articles'>;

function RecentArticles() {
  const { navigate } = useNavigation<NavigationParam>();

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
          Something went wrong while fetching the recent news, please try again
          later
        </Atoms.Text>
      </Atoms.Box>
    );
  }

  const renderItem = ({ item: article }: { item: ArticleProps }) => {
    return <Molecules.Article key={article.id} article={article} />;
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
            navigate('Articles');
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

const ArticlesWithAnimation = React.memo(withAnimation(RecentArticles, 950));

export { ArticlesWithAnimation as RecentArticles };
