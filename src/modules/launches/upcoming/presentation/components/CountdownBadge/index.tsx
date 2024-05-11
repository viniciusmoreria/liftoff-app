import { extractLaunchData } from '@libs/utils/launches';
import { ProgressBar, Text } from '@modules/components';
import { Launch } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';
import { useCountdown } from '@modules/launches/upcoming/domain/useCases/useCountdown';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { getTimeComponents } from './getTimeComponents';

type Props = {
  nextLaunch?: Launch;
};

export const CountdownBadge = ({ nextLaunch }: Props) => {
  const { t } = useTranslation();

  const countdown = useCountdown({
    targetDate: nextLaunch?.net ? new Date(nextLaunch?.net) : new Date(),
  });

  if (!nextLaunch) return null;

  const timeComponents = getTimeComponents(countdown);

  const { launchName, padLocation, rocketName, launchOrbit, launchStage } = extractLaunchData({
    launch: nextLaunch,
  });

  const sectionTitle = launchStage === 'T-Minus' ? t('home.nextlaunch.title') : 'On Flight';

  return (
    <TouchableWithoutFeedback onPress={() => router.push(`/launches/${nextLaunch?.id}`)}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text key={sectionTitle} text={sectionTitle} size="xxs" style={styles.flightTitle} />
          <Text
            text={launchName}
            weight="semiBold"
            numberOfLines={2}
            size="xxs"
            textAlign="right"
            style={styles.flexText}
          />
        </View>

        <View style={styles.progressBar}>
          <Text text={launchStage} size="xxs" weight="semiBold" />

          <View style={styles.time}>
            {timeComponents.map(({ value, label }, index) => (
              <View key={index} style={styles.counter}>
                <Text text={value} size="xxs" weight="semiBold" style={{ minWidth: 18 }} />
                <Text text={label} size="xxs" weight="semiBold" style={{ minWidth: 25 }} />
              </View>
            ))}
          </View>
        </View>

        <ProgressBar progressValue={countdown.progressValue} />

        <View style={styles.flexRow}>
          <View style={styles.centerText}>
            <Text text="Rocket" size="xxs" />
            <Text
              text={rocketName}
              size="xxs"
              weight="semiBold"
              numberOfLines={1}
              textAlign="center"
            />
          </View>

          <View style={[styles.centerText, styles.flexText]}>
            <Text text="Location" size="xxs" />
            <Text
              text={padLocation}
              size="xxs"
              weight="semiBold"
              numberOfLines={2}
              textAlign="center"
            />
          </View>

          <View style={styles.centerText}>
            <Text text="Orbit" size="xxs" />
            <Text
              text={launchOrbit?.abbrev ?? ''}
              numberOfLines={1}
              size="xxs"
              weight="semiBold"
              textAlign="center"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    overflow: 'hidden',
    padding: spacing.lg,
    marginTop: spacing.lg,
    rowGap: spacing.md,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: spacing.xl,
  },
  flightTitle: {
    width: 75,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: spacing.xs,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  centerText: {
    alignItems: 'center',
    textAlign: 'center',
  },
  flexText: {
    flex: 1,
  },
});
