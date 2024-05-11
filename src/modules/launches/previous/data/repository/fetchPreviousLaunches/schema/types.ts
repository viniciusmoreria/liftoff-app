import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type TFetchPreviousLaunchesResponse =
  FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[];
