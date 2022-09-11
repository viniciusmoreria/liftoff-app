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
  dotSize,
  containerStyle,
  dotStyle,
  slidingIndicatorStyle,
  marginHorizontal,
}: PaginationProps) => {
  const { width } = useWindowDimensions();

  const defaultProps = {
    dotSize: dotSize || 12,
    marginHorizontal: marginHorizontal || 3,
  };
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [
      -defaultProps.dotSize + defaultProps.marginHorizontal * 2,
      0,
      defaultProps.dotSize + defaultProps.marginHorizontal * 2,
    ],
  });

  return (
    <View style={[{ height: defaultProps.dotSize }, styles.containerStyle, containerStyle]}>
      {data.map((_item, index) => {
        return (
          <View
            key={index}
            className="bg-gray"
            style={[
              {
                width: defaultProps.dotSize,
                height: defaultProps.dotSize,
                marginHorizontal: defaultProps.marginHorizontal,
                borderRadius: defaultProps.dotSize / 2,
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
            width: defaultProps.dotSize,
            height: defaultProps.dotSize,
            borderRadius: defaultProps.dotSize / 2,
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
