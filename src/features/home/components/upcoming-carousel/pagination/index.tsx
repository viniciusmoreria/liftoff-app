import React from 'react';
import { Animated, StyleSheet, View, ViewStyle, useWindowDimensions } from 'react-native';

export interface SlidingDotProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  dotSize?: number;
  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  dotContainerStyle?: ViewStyle;
  slidingIndicatorStyle?: ViewStyle;
  marginHorizontal?: number;
}

const SlidingDot = ({
  scrollX,
  data,
  dotSize,
  containerStyle,
  dotStyle,
  slidingIndicatorStyle,
  marginHorizontal,
}: SlidingDotProps) => {
  const { width } = useWindowDimensions();

  const defaultProps = {
    dotSize: dotSize || 12,
    marginHorizontal: marginHorizontal || 3,
  };
  const inputRange = [-width, 0, width - 32];
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
      {data.map((_item, index) => {
        return (
          <View
            key={index}
            className="bg-primary opacity-40"
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

export default SlidingDot;
