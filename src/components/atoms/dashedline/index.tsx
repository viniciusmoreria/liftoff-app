import React, { useMemo, useState } from 'react';

import { SxProp, View } from 'dripsy';

type DashedLineProps = {
  dashLength?: number;
  dashThickness?: number;
  dashColor?: string;
  dashGap?: number;
  dashStyle?: SxProp;
  style?: SxProp;
};

function DashedLine({
  dashGap = 2,
  dashLength = 4,
  dashThickness = 2,
  dashColor = '#000',
  dashStyle,
  style,
}: DashedLineProps) {
  const [lineLength, setLineLength] = useState(0);
  const numOfDashes = Math.ceil(lineLength / (dashGap + dashLength));

  const dashStyles = useMemo(
    () => ({
      width: dashLength,
      height: dashThickness,
      marginRight: dashGap,
      marginBottom: 0,
      backgroundColor: dashColor,
    }),
    [dashColor, dashGap, dashLength, dashThickness],
  );

  return (
    <View
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setLineLength(width);
      }}
      sx={{
        flexDirection: 'row',
        ...style,
      }}
    >
      {[...Array(numOfDashes)].map((_, i) => {
        return (
          <View
            key={String(i)}
            sx={{
              ...dashStyles,
              ...dashStyle,
            }}
          />
        );
      })}
    </View>
  );
}

export { DashedLine };
