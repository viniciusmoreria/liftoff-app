import React from 'react';

import { Skeleton } from '@motify/skeleton';
import { format, fromUnixTime } from 'date-fns';
import { Box, Row, Text } from 'native-base';

import { LaunchProps } from '@types';

export function UpcomingLaunch({ launch }: { launch: LaunchProps }) {
  return (
    <Skeleton show={!launch} width={250}>
      <Box
        bg="secondary"
        p="4"
        mr="4"
        h={110}
        w={250}
        borderRadius="8"
        justifyContent="space-between"
      >
        <Row alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Text color="white" fontSize="sm" fontWeight={700}>
              {launch.name}
            </Text>

            <Text color="primary" fontSize="xs" fontWeight={500} mt="1">
              {launch?.rocket.name}
            </Text>
          </Box>

          <Box
            bg="background"
            px={2}
            py={0.5}
            borderRadius={2}
            alignItems="center"
          >
            <Text
              color="primary"
              fontSize="9"
              fontWeight={500}
              textTransform="uppercase"
            >
              {format(fromUnixTime(launch.date_unix), 'MMM')}
            </Text>

            <Text
              color="white"
              fontSize="10"
              fontWeight={500}
              textTransform="uppercase"
            >
              {format(fromUnixTime(launch.date_unix), 'd')}
            </Text>
          </Box>
        </Row>

        <Row alignItems="center" justifyContent="space-between">
          <Box bg="background" px={2} py={0.5} borderRadius={2}>
            <Text color="white" fontSize="10" fontWeight={500}>
              {launch.payloads[0].orbit}
            </Text>
          </Box>

          <Box alignItems="center">
            <Text color="primary" fontSize="10" fontWeight={500}>
              {format(fromUnixTime(launch.date_unix), 'HH:mm ')}
              {format(fromUnixTime(launch.date_unix), 'O')}
            </Text>
          </Box>
        </Row>
      </Box>
    </Skeleton>
  );
}
