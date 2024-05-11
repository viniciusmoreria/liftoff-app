import auth from '@react-native-firebase/auth';

export const FirebaseAuth = {
  signInAnonymously: async () => {
    await auth().signInAnonymously();
  },
};
