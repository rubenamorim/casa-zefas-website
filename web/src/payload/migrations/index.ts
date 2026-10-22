import * as migration_20261021_225752_initial from './20261021_225752_initial';

export const migrations = [
  {
    up: migration_20261021_225752_initial.up,
    down: migration_20261021_225752_initial.down,
    name: '20261021_225752_initial'
  },
];
