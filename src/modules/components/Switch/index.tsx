import { colors } from '@theme/colors';
import { Switch as SwitchComponent } from 'react-native';

type Props = {
  isEnabled: boolean;
  onPress: () => void;
};

export const Switch = ({ isEnabled, onPress }: Props) => {
  return (
    <SwitchComponent
      trackColor={{ false: '#767577', true: colors.accent }}
      thumbColor={isEnabled ? colors.text : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onPress}
      value={isEnabled}
      style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
    />
  );
};
