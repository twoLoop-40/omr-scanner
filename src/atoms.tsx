import { atom } from 'recoil';

export const RGBA = atom<number[]>({
  key: 'RGBA',
  default: [],
});
