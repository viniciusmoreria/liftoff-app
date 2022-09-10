import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface UseDimensionsProp {
  window: ScaledSize;
  screen: ScaledSize;
}

export function useDimensions() {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  const onChange = ({ window, screen }: UseDimensionsProp) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription.remove();
  }, []);

  return dimensions;
}
