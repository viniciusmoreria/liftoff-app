import { PlaceholderUserPicture } from '@assets/images';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useAnalytics } from '@libs/firebase/analytics';
import { isIOS } from '@libs/utils/platform';
import { validators } from '@libs/utils/validators';
import { useUserStore } from '@modules/user/store/user-store';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { ActionSheetIOS, Alert, Pressable, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '../Text';

type Props = {
  onClose: () => void;
};

export const ProfileSheet = ({ onClose }: Props) => {
  const insets = useSafeAreaInsets();

  const { logEvent } = useAnalytics();
  const { setUsername, profilePicture, setProfilePicture } = useUserStore();

  const [name, setName] = useState('');

  const handleSubmitName = useCallback(async () => {
    logEvent('profile_name_change', { name });
    setUsername(name.trim());
    setName('');
    onClose();
  }, [name, setUsername]);

  const pickImage = useCallback(async () => {
    logEvent('profile_sheet_open_gallery');

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setProfilePicture(`data:image/jpg;base64,${result.assets[0].base64}`);
    }
  }, [setProfilePicture]);

  const openCamera = useCallback(async () => {
    logEvent('profile_sheet_open_camera');

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required to upload an image.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      aspect: [4, 3],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!result.canceled) {
      setProfilePicture(`data:image/jpg;base64,${result.assets[0].base64}`);
    }
  }, [setProfilePicture]);

  const handleOpenSheet = useCallback(() => {
    if (isIOS) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose Photo'],
          cancelButtonIndex: 0,
          userInterfaceStyle: 'dark',
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) {
            openCamera();
          }

          if (buttonIndex === 2) {
            pickImage();
          }
        }
      );
    } else {
      Alert.alert(
        'Update Profile Picture',
        '',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Take Photo',
            onPress: openCamera,
          },
          {
            text: 'Choose Photo',
            onPress: pickImage,
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  }, [openCamera, pickImage]);

  const styles = getStyles(insets);

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Pressable style={styles.itemsCenter} onPress={handleOpenSheet}>
        <View>
          <Image
            source={profilePicture ? { uri: profilePicture } : PlaceholderUserPicture}
            style={styles.profilePicture}
          />
          <View style={styles.editProfile}>
            <Ionicons name="camera" color="white" size={18} />
          </View>
        </View>
      </Pressable>

      <Text
        weight="semiBold"
        text="What you would like to be called?"
        textAlign="center"
        style={styles.title}
      />

      <BottomSheetTextInput
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        style={styles.input}
      />

      <Pressable
        onPress={handleSubmitName}
        disabled={!validators.name(name)}
        style={[styles.button, { opacity: validators.name(name) ? 1 : 0.5 }]}>
        <Text text="Confirm" size="xs" weight="semiBold" textAlign="center" />
      </Pressable>
    </BottomSheetScrollView>
  );
};

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      padding: spacing.lg,
      backgroundColor: colors.border,
      borderRadius: spacing.lg,
      rowGap: spacing.md,
      paddingBottom: insets.bottom || spacing.xl,
    },
    itemsCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    profilePicture: {
      height: 60,
      width: 60,
      borderRadius: 30,
    },
    editProfile: {
      position: 'absolute',
      right: 0,
      bottom: -spacing.xs,
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#7c7c7cc1',
    },
    title: {
      marginTop: 12,
    },
    input: {
      borderBottomColor: 'white',
      borderBottomWidth: 1.6,
      width: '100%',
      height: 40,
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
    },
    button: {
      marginTop: spacing.md,
      backgroundColor: colors.accent,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
      width: '100%',
    },
  });
