import React from 'react';

import { fromUnixTime, isAfter } from 'date-fns';
import { Box, Center, Row, Text } from 'native-base';

import { useDate, useUpcomingLaunches } from '@hooks/index';
import { getTMinus } from '@utils/helpers';

import withAnimatedBox from '../withAnimatedBox';

function NextLaunch() {
  const { data: launches } = useUpcomingLaunches();

  const date = useDate({
    date: launches?.length ? fromUnixTime(launches[0].date_unix) : new Date(),
  });

  const tMinus = getTMinus(date);

  if (!launches?.length) {
    return null;
  }

  const isTPlusStage = isAfter(new Date(), fromUnixTime(launches[0].date_unix));

  return (
    <Row w="100%" py="4" pl="4" justifyContent="space-between">
      <Box justifyContent="space-between">
        <Text color="white" fontSize="lg" fontWeight={700}>
          {launches[0].name}
        </Text>

        <Box
          alignSelf="flex-start"
          borderBottomColor={isTPlusStage ? 'green.600' : 'accent'}
          borderBottomWidth={1}
        >
          {isTPlusStage ? (
            <Text color="white" fontSize="sm" fontWeight={700}>
              T-Plus
            </Text>
          ) : (
            <Text color="white" fontSize="sm" fontWeight={700}>
              T-Minus
            </Text>
          )}
        </Box>
      </Box>

      <Box>
        {Number(tMinus.days) >= 1 ? (
          <Row>
            {!isTPlusStage && (
              <Box alignItems="flex-end" mr={4}>
                <Text color="accent" fontSize="sm" fontWeight={700}>
                  {tMinus.days}
                </Text>

                <Text color="white" fontSize="sm" fontWeight={700} ml={2}>
                  {Number(tMinus.days) > 1 ? `days` : `day`}
                </Text>
              </Box>
            )}
            <DoubleDigit digits={tMinus.hours} />
            <Divider />
            <DoubleDigit digits={tMinus.minutes} />
          </Row>
        ) : (
          <Row>
            {Number(tMinus.hours) >= 1 && (
              <>
                <DoubleDigit digits={tMinus.hours} />
                <Divider />
              </>
            )}
            <DoubleDigit digits={tMinus.minutes} />
            {Number(tMinus.hours) < 1 && (
              <>
                <Divider />
                <DoubleDigit digits={tMinus.seconds} />
              </>
            )}
          </Row>
        )}
      </Box>
    </Row>
  );
}

const DoubleDigit = ({ digits }: { digits: string }) => {
  return (
    <Center w={9} minH={10} bg="secondary" borderRadius={4}>
      <Text color="white" fontSize="xl" fontWeight={700}>
        {digits}
      </Text>
    </Center>
  );
};

const Divider = () => {
  return (
    <Center mx={1}>
      <Text color="primary" fontSize="md" fontWeight={700}>
        :
      </Text>
    </Center>
  );
};

export default withAnimatedBox(NextLaunch, 500);
