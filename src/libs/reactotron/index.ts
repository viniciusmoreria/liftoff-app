import { queryClient } from '@libs/react-query';
import Reactotron from 'reactotron-react-native';
import { QueryClientManager, reactotronReactQuery } from 'reactotron-react-query';

const queryClientManager = new QueryClientManager({
  queryClient,
});

Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    name: 'Liftoff',
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative()
  .connect();
