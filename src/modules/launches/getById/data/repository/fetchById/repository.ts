import { Launch } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';
import firestore from '@react-native-firebase/firestore';

import { IFetchLaunchByIdRepository, TFetchLaunchByIdParams } from './types';

export class FetchLaunchByIdRepository implements IFetchLaunchByIdRepository {
  async get({ id }: TFetchLaunchByIdParams) {
    const query = firestore().collection('launches').doc(id);

    const snapshot = await query.get();

    return snapshot.data() as Launch;
  }
}
