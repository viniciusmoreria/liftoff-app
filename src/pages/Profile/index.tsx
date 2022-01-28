import React from 'react';

import { ScrollView } from 'dripsy';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';

export default function Profile() {
  const insets = useSafeAreaInsets();

  return (
    <Atoms.Box
      sx={{
        flex: 1,
        bg: 'background',
        pt: insets.top,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        sx={{
          bg: 'background',
          px: '24px',
        }}
        contentContainerSx={{
          flex: 1,
          pb: 120,
        }}
      >
        <Atoms.Box sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Atoms.Box>
            <Atoms.Text
              variant="text-2xl"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mt: '42px',
                pb: '12px',
              }}
            >
              Profile
            </Atoms.Text>

            <Molecules.SectionCard
              title="Personal information"
              onPress={() => null}
              clean
            />

            <Molecules.SectionCard
              title="News feed settings"
              onPress={() => null}
              clean
            />

            <Molecules.SectionCard
              title="Notifications settings"
              onPress={() => null}
              clean
            />

            <Molecules.SectionCard
              title="Leave a review"
              onPress={() => null}
              clean
            />

            <Molecules.SectionCard
              title="Feature request"
              onPress={() => null}
              clean
            />

            <Molecules.SectionCard
              title="Report a problem"
              onPress={() => null}
              clean
            />
          </Atoms.Box>

          <Atoms.Text
            variant="text-xs"
            sx={{
              color: 'white',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            Version {Constants.manifest?.version ?? '1.0.0'}
          </Atoms.Text>
        </Atoms.Box>
      </ScrollView>
    </Atoms.Box>
  );
}
