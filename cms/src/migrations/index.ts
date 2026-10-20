import * as migration_20261020_165335_initial from './20261020_165335_initial';

export const migrations = [
  {
    up: migration_20261020_165335_initial.up,
    down: migration_20261020_165335_initial.down,
    name: '20261020_165335_initial'
  },
];
