import React from 'react';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIntl } from 'react-intl';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimation from '@components/withAnimation';
import { useArticles } from '@hooks/useArticles';
import type { Routes } from '@routes/app.routes';
import type { ArticleProps } from '@types';

type NavigationParam = NativeStackNavigationProp<Routes, 'Articles'>;

function RecentArticles() {
  const { navigate } = useNavigation<NavigationParam>();

  const { formatMessage } = useIntl();
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
        <Molecules.SectionTitle
          title={formatMessage({ id: 'RECENT_ARTICLES.TITLE' })}
        />

        <Atoms.Text variant="text-xs" sx={{ color: 'white', mt: '10px' }}>
          {formatMessage({ id: 'RECENT_ARTICLES.FETCH_ERROR' })}
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
          title={formatMessage({ id: 'RECENT_ARTICLES.TITLE' })}
          subtitle={formatMessage({ id: 'LABELS.SEE_ALL_NEWS' })}
          onPress={() => {
            navigate('Articles');
          }}
        />
      </Atoms.Box>

      <Molecules.Carousel
        data={articlesData}
        renderItem={renderItem}
        slideStyle={{
          paddingHorizontal: 24,
        }}
      />
    </Atoms.Box>
  );
}

const ArticlesWithAnimation = React.memo(withAnimation(RecentArticles, 950));

export { ArticlesWithAnimation as RecentArticles };
