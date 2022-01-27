import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Atoms from '@components/atoms';

function Header({ title, showTitle }: { title?: string; showTitle?: boolean }) {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();

  return (
    <Atoms.Box
      sx={{
        bg: showTitle ? 'secondary' : 'background',
        pt: 24 + top,
        pb: '12px',
        px: '24px',
        justifyContent: 'center',
      }}
    >
      <Atoms.Row sx={{ alignItems: 'center' }}>
        <Atoms.Pressable onPress={() => goBack()}>
          <Atoms.Badge
            sx={{
              bg: showTitle ? 'background' : 'secondary',
              borderRadius: 8,
            }}
          >
            <Ionicons name="chevron-back" color="white" size={22} />
          </Atoms.Badge>
        </Atoms.Pressable>

        {showTitle && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Atoms.Text
              variant="text-sm"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                ml: '12px',
              }}
            >
              {title}
            </Atoms.Text>
          </Animated.View>
        )}
      </Atoms.Row>
    </Atoms.Box>
  );
}

export { Header };
