import { darkBlurhash } from '@libs/utils/launches';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { Image, ImageStyle } from 'expo-image';
import { Skeleton } from 'moti/skeleton';
import { useState } from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';

import { Text } from '../Text';

type Props = {
  source: string;
  style?: StyleProp<ImageStyle>;
  borderRadius?: number;
};

export const ImageLoader = ({ source, style, borderRadius = 0 }: Props) => {
  const [hasLoadedImage, setHasLoadedImage] = useState(false);

  return (
    <Skeleton show={!hasLoadedImage} radius={borderRadius}>
      {source ? (
        <Image
          source={{ uri: source }}
          placeholder={darkBlurhash}
          contentFit="cover"
          transition={300}
          style={style}
          onLoadEnd={() => setHasLoadedImage(true)}
        />
      ) : (
        <View style={[style, styles.notAvailable]} onLayout={() => setHasLoadedImage(true)}>
          <Text text="No image available" textAlign="center" color={colors.background} />
        </View>
      )}
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  notAvailable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.textDim,
    padding: spacing.md,
    minHeight: 140,
  },
});
