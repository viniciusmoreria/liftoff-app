import React from 'react';

import { useDripsyTheme } from 'dripsy';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import SnapCarousel, {
  AdditionalParallaxProps,
  Pagination,
} from 'react-native-snap-carousel';

import * as Atoms from '@components/atoms';
import { useDimensions } from '@hooks/useDimensions';

function Carousel<T>({
  data,
  renderItem,
  slideStyle,
}: {
  data: T[];
  renderItem: ListRenderItem<T> &
    ((
      item: {
        item: T;
        index: number;
      },
      parallaxProps?: AdditionalParallaxProps | undefined,
    ) => React.ReactNode);
  slideStyle?: StyleProp<ViewStyle>;
}) {
  const { theme } = useDripsyTheme();
  const { window } = useDimensions();

  const [index, setIndex] = React.useState(0);

  return (
    <Atoms.Box>
      <SnapCarousel
        data={data}
        renderItem={renderItem}
        sliderWidth={window.width}
        itemWidth={window.width}
        onSnapToItem={(i) => setIndex(i)}
        slideStyle={slideStyle}
      />

      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
        }}
        dotColor={theme.colors.accent}
        inactiveDotColor={theme.colors.primary}
        containerStyle={{
          paddingTop: 24,
          paddingBottom: 0,
        }}
      />
    </Atoms.Box>
  );
}

export { Carousel };
