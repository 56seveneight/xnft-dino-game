
import { DefaultValue, atom, selector, useRecoilState } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

const MIN_SPEED = 10;
const MAX_SPEED = 60;

const isJumpingState = atom({
  key: 'isJumping',
  default: false,
});

const speedState = atom({
  key: 'speedAtom',
  default: 10,
});

const speedSelector = selector({
  key: 'speed',
  get: ({get}) => get(speedState),
  set: ({set}, newValue) => {
    if (newValue instanceof DefaultValue || newValue < MIN_SPEED || newValue > MAX_SPEED) {
      return;
    }

    set(speedState, newValue);
  }
});

const scoreState = atom({
  key: 'score',
  default: 0,
  effects: [ localStorageEffect('score') ]
});

export function useIsJumping() {
  return useRecoilState(isJumpingState);
}

export function useSpeed() {
  return useRecoilState(speedSelector);
}

export function useScore() {
  return useRecoilState(scoreState);
}
