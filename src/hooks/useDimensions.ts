import React from 'react';

import { Dimensions, ScaledSize } from 'react-native';

interface UseDimensionsProp {
  window: ScaledSize;
  screen: ScaledSize;
}

export function useDimensions(): UseDimensionsProp {
  const [dimensions, setDimensions] = React.useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  const onChange = ({ window, screen }: UseDimensionsProp) => {
    setDimensions({ window, screen });
  };

  React.useEffect(() => {
    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  return dimensions;
}
