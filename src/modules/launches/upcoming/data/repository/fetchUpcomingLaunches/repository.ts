import firestore from '@react-native-firebase/firestore';

import { Launch } from './schema/types';
import { IFetchUpcomingLaunchesRepository } from './types';

export class FetchUpcomingLaunchesRepository implements IFetchUpcomingLaunchesRepository {
  async get() {
    const query = firestore()
      .collection('launches')
      .where('launch_type', '==', 'upcoming')
      .orderBy('net', 'asc');

    const snapshot = await query.get();

    return snapshot.docs.map((doc) => doc.data() as Launch);
  }
}
