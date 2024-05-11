import firestore from '@react-native-firebase/firestore';

import { IFetchPreviousLaunchesRepository, TFetchPreviousLaunchesRepositoryParams } from './types';

export class FetchPreviousLaunchesRepository implements IFetchPreviousLaunchesRepository {
  async get({ cursor }: TFetchPreviousLaunchesRepositoryParams) {
    let query = firestore()
      .collection('launches')
      .where('launch_type', '==', 'previous')
      .orderBy('net', 'desc')
      .limit(5);

    if (cursor) {
      query = firestore()
        .collection('launches')
        .where('launch_type', '==', 'previous')
        .orderBy('net', 'desc')
        .limit(5)
        .startAfter(cursor);
    }

    const snapshot = await query.get();

    return snapshot.docs;
  }
}
