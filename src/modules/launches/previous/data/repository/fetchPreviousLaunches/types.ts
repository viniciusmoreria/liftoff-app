import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { TFetchPreviousLaunchesResponse } from './schema/types';

export type TFetchPreviousLaunchesRepositoryParams = {
  cursor?: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
};

export interface IFetchPreviousLaunchesRepository {
  get: (params: TFetchPreviousLaunchesRepositoryParams) => Promise<TFetchPreviousLaunchesResponse>;
}
