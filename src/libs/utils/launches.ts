import { Ionicons } from '@expo/vector-icons';
import { Launch } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';
import { colors } from '@theme/colors';
import { intervalToDuration, isAfter } from 'date-fns';
import { ComponentProps } from 'react';

import { extractLivestreamId } from './extractLivestreamId';

export function getLaunchStage({ date }: { date: Date }) {
  const { hours, minutes } = intervalToDuration({
    start: new Date(),
    end: date,
  });

  if (isAfter(new Date(), date) && Number(hours) < 1 && Number(minutes) < 1) {
    return 'Liftoff';
  }
  if (isAfter(new Date(), date)) {
    return 'T-Plus';
  }
  return 'T-Minus';
}

export const extractPadLocationName = (padName: string) => {
  return padName.substring(0, padName.indexOf(','));
};

export const getLaunchStatusIcon: { [key: string]: ComponentProps<typeof Ionicons>['name'] } = {
  1: 'time-sharp',
  2: 'help-circle',
  3: 'checkmark-sharp',
  4: 'close-sharp',
  5: 'pause-circle',
  6: 'airplane',
  7: 'warning',
  8: 'help-circle',
};

export const getLaunchStatusColor: { [key: string]: string } = {
  1: colors.textDim,
  2: colors.textDim,
  3: '#9BCF53',
  4: colors.accent,
  5: colors.textDim,
  6: '#9BCF53',
  7: '#FF7E30',
  8: colors.textDim,
};

export const extractLaunchData = ({ launch }: { launch: Launch }) => {
  const launchName = launch?.mission?.name || launch?.name;
  const rocketName = launch?.rocket?.configuration?.name;
  const padLocation = launch?.pad?.location?.name?.split(',')?.[0];
  const livestreamId = extractLivestreamId(launch?.vidURLs[0]?.url);
  const launchBySpacex = launch?.launch_service_provider?.id === 121;
  const launchImage =
    launchBySpacex && livestreamId
      ? `https://img.youtube.com/vi/${livestreamId}/0.jpg`
      : launch?.image;
  const launchOrbit = launch?.mission?.orbit;
  const probability = launch?.probability ? `${launch.probability}%` : 'Pending';
  const launchStage = getLaunchStage({ date: new Date(launch.net) });
  const rocketConfiguration = launch?.rocket?.configuration;
  const launcherCore = launch?.rocket?.launcher_stage?.[0];

  return {
    launchName,
    rocketName,
    padLocation,
    launchImage,
    launchOrbit,
    launchStage,
    livestreamId,
    probability,
    rocketConfiguration,
    launcherCore,
  };
};

export const darkBlurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
