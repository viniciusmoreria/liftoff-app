import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useInfiniteQuery } from '@tanstack/react-query';

export const PREVIOUS_LAUNCHES_QUERY_KEY = '@liftoff/previous-launches';

async function getPreviousLaunches(
  cursor?: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
) {
  let query = firestore().collection('previous_launches').orderBy('net', 'desc').limit(5);
  if (cursor) {
    query = firestore()
      .collection('previous_launches')
      .orderBy('net', 'desc')
      .limit(5)
      .startAfter(cursor);
  }
  const snapshot = await query.get();
  return snapshot.docs;
}

export function usePreviousLaunches() {
  return useInfiniteQuery(
    [PREVIOUS_LAUNCHES_QUERY_KEY],
    ({ pageParam }) => getPreviousLaunches(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1],
    }
  );
}
