import React from 'react';

import { fromUnixTime } from 'date-fns';
import { Box, Row, Text } from 'native-base';

import useDate from '@hooks/useDate';
import { useUpcomingLaunches } from '@hooks/useLaunches';
import { useRockets } from '@hooks/useRockets';
import { getTMinus } from '@utils/helpers';

export default function NextLaunch() {
  const { data: launches } = useUpcomingLaunches();
  const { data: rockets } = useRockets();

  const date = useDate({
    date: launches?.length ? fromUnixTime(launches[0].date_unix) : new Date(),
  });

  const tMinus = getTMinus(date);

  if (!launches || !rockets) {
    return null;
  }

  return (
    <Box mt="8" w="100%" p="4">
      <Text color="white" fontSize="xl" fontWeight={700}>
        {launches[0].name}
      </Text>

      <Row justifyContent="space-between" mt="1">
        <Box borderBottomColor="accent" borderBottomWidth={1}>
          <Text color="white" fontSize="sm" fontWeight={700}>
            T-Minus
          </Text>
        </Box>

        <Text color="white" fontSize="sm" fontWeight={700}>
          {tMinus.days} <Divider /> {tMinus.hours} <Divider /> {tMinus.minutes}{' '}
          <Divider /> {tMinus.seconds}s
        </Text>
      </Row>
    </Box>
  );
}

const Divider = () => {
  return (
    <Text color="accent" fontSize="sm" fontWeight={700}>
      •
    </Text>
  );
};
