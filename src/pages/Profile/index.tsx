import React from 'react';

import { ScrollView } from 'dripsy';
import Constants from 'expo-constants';
import * as StoreReview from 'expo-store-review';
import { Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProfilePic } from '@assets/icons';
import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import { ResetProfileSheet } from '@components/molecules';
import { useDevice, useUsername, useUserProfilePicture } from '@hooks/index';
import { useBottomSheet } from '@hooks/useBottomSheet';
import { isIOS } from '@utils/helpers';

export default function Profile() {
  const insets = useSafeAreaInsets();

  const { data: username } = useUsername();
  const { data: userProfilePic } = useUserProfilePicture();
  const { data: deviceReport } = useDevice();

  const { setSheetContent } = useBottomSheet();

  const getReportData = React.useCallback(
    ({ title }: { title: string }) => {
      return `mailto:appliftoff@gmail.com?subject=Liftoff ${title} Request (v${Constants.manifest?.version})&body=\n\n\n\n${deviceReport}`;
    },
    [deviceReport],
  );

  const handleReview = React.useCallback(async () => {
    if (await StoreReview.isAvailableAsync) {
      StoreReview.requestReview();
    }
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      sx={{
        bg: 'background',
        px: '24px',
        pt: insets.top,
      }}
      contentContainerSx={{
        flexGrow: 1,
        justifyContent: 'space-between',
        pb: 120,
      }}
    >
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
          onPress={() =>
            setSheetContent({
              content: <Molecules.UserProfileSheet />,
            })
          }
          clean
        />

        <Molecules.SectionCard
          title="News feed settings"
          onPress={() => null}
          clean
          unavailable
        />

        <Molecules.SectionCard
          title="Notifications settings"
          onPress={() =>
            setSheetContent({
              content: <Molecules.NotificationSheet />,
            })
          }
          clean
        />

        <Molecules.SectionCard
          title="Leave a review"
          onPress={() => handleReview()}
          clean
          unavailable={isIOS}
        />

        <Molecules.SectionCard
          title="Feature request"
          onPress={() => Linking.openURL(getReportData({ title: 'Feature' }))}
          clean
        />

        <Molecules.SectionCard
          title="Report a problem"
          onPress={() => Linking.openURL(getReportData({ title: 'Support' }))}
          clean
        />

        <Atoms.Pressable
          onPress={() => setSheetContent({ content: <ResetProfileSheet /> })}
          sx={{
            width: '70%',
          }}
        >
          <Atoms.Row sx={{ mt: '42px', alignItems: 'center' }}>
            <Atoms.Image
              source={userProfilePic ? { uri: userProfilePic } : ProfilePic}
              sx={{
                height: 50,
                width: 50,
                borderRadius: 25,
                mr: '15px',
              }}
            />

            <Atoms.Box>
              <Atoms.Text
                variant="text-xs"
                numberOfLines={2}
                ellipsizeMode="tail"
                sx={{
                  color: 'white',
                  fontWeight: 300,
                }}
              >
                {username || 'crew member'}
              </Atoms.Text>

              <Atoms.Text
                sx={{
                  color: 'accent',
                  fontWeight: 500,
                  fontSize: 11,
                  mt: '10px',
                }}
              >
                Reset information
              </Atoms.Text>
            </Atoms.Box>
          </Atoms.Row>
        </Atoms.Pressable>
      </Atoms.Box>

      <Atoms.Text
        variant="text-xs"
        sx={{
          color: 'white',
          fontWeight: 500,
          textAlign: 'center',
          mt: 70,
        }}
      >
        Version {Constants.manifest?.version ?? '1.0.0'}
      </Atoms.Text>
    </ScrollView>
  );
}
