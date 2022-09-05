import firestore from '@react-native-firebase/firestore';
import { useQuery } from '@tanstack/react-query';

import { Launch } from './types';

export const UPCOMING_LAUNCHES_QUERY_KEY = '@liftoff/upcoming-launches';

async function getUpcomingLaunches() {
  const collection = await firestore().collection('launches').doc('upcoming').get();
  return collection?.data()?.results;
}

export function useUpcomingLaunches() {
  return useQuery<Launch[]>(['@liftoff/upcoming-launches'], getUpcomingLaunches);
}
