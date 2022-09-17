import React from 'react';
import { Animated, StyleSheet, View, ViewStyle, useWindowDimensions } from 'react-native';

export interface PaginationProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  dotSize?: number;
  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  dotContainerStyle?: ViewStyle;
  slidingIndicatorStyle?: ViewStyle;
  marginHorizontal?: number;
}

export const Pagination = ({
  scrollX,
  data,
  dotSize = 12,
  containerStyle,
  dotStyle,
  slidingIndicatorStyle,
  marginHorizontal = 3,
}: PaginationProps) => {
  const { width } = useWindowDimensions();

  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-dotSize + marginHorizontal * 2, 0, dotSize + marginHorizontal * 2],
  });

  return (
    <View style={[{ height: dotSize }, styles.containerStyle, containerStyle]}>
      {data.map((_item, index) => {
        return (
          <View
            key={index}
            className="bg-gray"
            style={[
              {
                width: dotSize,
                height: dotSize,
                marginHorizontal: marginHorizontal,
                borderRadius: dotSize / 2,
              },
              dotStyle,
            ]}
          />
        );
      })}
      <Animated.View
        className="bg-primary"
        style={[
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
          },
          {
            position: 'absolute',
            marginHorizontal: marginHorizontal,
            transform: [{ translateX }],
          },
          slidingIndicatorStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  slidingIndicatorStyle: {
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
