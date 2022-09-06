import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';

import { Launch } from './types';

export const UPCOMING_LAUNCHES_QUERY_KEY = '@liftoff/upcoming-launches';

async function getUpcomingLaunches() {
  const query = firestore()
    .collection('upcoming_launches')
    .where('status.id', 'in', [1, 8])
    .orderBy('net', 'asc');
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => doc.data() as Launch);
}

export function useUpcomingLaunches() {
  return useQuery<Launch[]>(['@liftoff/upcoming-launches'], getUpcomingLaunches);
}
