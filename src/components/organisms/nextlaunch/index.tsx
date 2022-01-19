import React from 'react';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimatedBox from '@components/withAnimatedBox';
import { useUpcomingLaunches } from '@hooks/index';
import { getLaunchStage, getTMinus } from '@utils/helpers';

import { Timer } from '../timer';

function NextLaunch() {
  const { data: launches } = useUpcomingLaunches();

  if (!launches?.length) {
    return null;
  }

  const { days } = getTMinus(new Date(launches[0].date_local));
  const stage = getLaunchStage(new Date(launches[0].date_local));

  return Number(days) <= 5 ? (
    <Atoms.Row
      sx={{
        mt: '36px',
        mb: '12px',
        pl: '24px',
        pr: '24px',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Atoms.Box sx={{ justifyContent: 'space-around' }}>
        <Atoms.Text sx={{ color: 'white', fontWeight: 'bold' }}>
          {launches[0].name}
        </Atoms.Text>

        <Molecules.TCountLabel stage={stage} />
      </Atoms.Box>

      <Timer launchDate={new Date(launches[0].date_local)} stage={stage} />
    </Atoms.Row>
  ) : (
    <Atoms.Box />
  );
}

export default withAnimatedBox(NextLaunch, 500);
