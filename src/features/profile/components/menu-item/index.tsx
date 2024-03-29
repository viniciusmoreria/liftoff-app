import { Pressable, Switch, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type MenuItemProps = {
  title: string;
  label?: string;
  onPress: () => void;
  useSwitch?: boolean;
  isEnabled?: boolean;
};

export const MenuItem = ({ title, label, onPress, useSwitch, isEnabled }: MenuItemProps) => {
  return (
    <Pressable onPress={useSwitch ? undefined : onPress}>
      <View className="flex-row items-center justify-between">
        <Text className="text-md text-white font-medium">{title}</Text>
        {useSwitch ? (
          <Switch
            trackColor={{ false: '#767577', true: '#d83545' }}
            thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onPress}
            value={isEnabled}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        ) : (
          <View className="flex-row items-center">
            {label && <Text className="text-md text-gray font-medium mr-1">{label}</Text>}
            <Ionicons name="ios-chevron-forward" color="#c0c0c0" size={16} />
          </View>
        )}
      </View>
    </Pressable>
  );
};
