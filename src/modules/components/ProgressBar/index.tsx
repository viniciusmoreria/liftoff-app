import { colors } from '@theme/colors';
import { StyleSheet, View } from 'react-native';

type Props = {
  progressValue: number;
};

export const ProgressBar = ({ progressValue }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progressValue}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentDim,
    height: 5,
    overflow: 'hidden',
    borderRadius: 2,
  },
  progress: {
    borderRadius: 2,
    backgroundColor: colors.text,
    height: '100%',
  },
});
