import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Skeleton } from '@motify/skeleton';
import { format, fromUnixTime } from 'date-fns';
import { Box, Image, Row, Text } from 'native-base';

import { LaunchProps } from '@types';

export function PastLaunch({ launch }: { launch: LaunchProps }) {
  return (
    <Skeleton show={!launch} width={250}>
      <Box
        bg="secondary"
        mr="4"
        h={250}
        w={250}
        borderRadius="8"
        justifyContent="space-between"
      >
        <Image
          source={{
            uri: `https://img.youtube.com/vi/${launch.links.youtube_id}/0.jpg`,
          }}
          h={150}
          w={250}
          borderTopRadius="8"
          alt={`${launch.rocket.name} rocket image`}
        />
        <Row alignItems="flex-start" justifyContent="space-between" px="4">
          <Box>
            <Text color="white" fontSize="sm" fontWeight={700}>
              {launch.name}
            </Text>

            <Text color="primary" fontSize="xs" fontWeight={500} mt="1">
              {launch?.rocket.name}
            </Text>
          </Box>

          <Box bg="background" px={2} py={0.5} borderRadius={2}>
            <Box alignItems="center">
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
          </Box>
        </Row>

        <Row alignItems="center" justifyContent="space-between" px="4" pb="4">
          <Row>
            <Box bg="background" px={2} py={0.5} borderRadius={2} mr={1.5}>
              <Text color="white" fontSize="10" fontWeight={500}>
                {launch.payloads[0].orbit}
              </Text>
            </Box>

            <Box bg="background" px={2} py={0.5} borderRadius={2} mr={1.5}>
              <Text color="white" fontSize="10" fontWeight={500}>
                {launch.cores[0].landpad?.name}
              </Text>
            </Box>

            <Box
              bg="background"
              alignItems="center"
              w={5}
              px={1.5}
              py={0.5}
              borderRadius={2}
            >
              {launch.success ? (
                <Ionicons name="checkmark-sharp" color="green" size={12} />
              ) : (
                <Ionicons name="close-sharp" color="red" size={12} />
              )}
            </Box>
          </Row>

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
