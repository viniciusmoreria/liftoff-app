import { Launch } from '@features/home/hooks/types';

export type RootStackParams = {
  splash: undefined;
  maintenance: undefined;
  home: undefined;
  profile: undefined;
  'launch-detail': { launch: Launch };
};
