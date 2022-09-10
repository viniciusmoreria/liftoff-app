import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';

import { Launch } from './types';

export const PREVIOUS_LAUNCHES_QUERY_KEY = '@liftoff/previous-launches';

async function getPreviousLaunches() {
  const query = firestore().collection('previous_launches');
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => doc.data() as Launch);
}

export function usePreviousLaunches() {
  return useQuery<Launch[]>([PREVIOUS_LAUNCHES_QUERY_KEY], getPreviousLaunches);
}
