import * as migration_20261020_164416_initial from './20261020_164416_initial';

export const migrations = [
  {
    up: migration_20261020_164416_initial.up,
    down: migration_20261020_164416_initial.down,
    name: '20261020_164416_initial'
  },
];
