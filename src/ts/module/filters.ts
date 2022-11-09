import { Stat } from '../interfaces';
import { bool } from '../types';

const compareStrings = (a: string, b: string) => a.localeCompare(b);

const sortName = (a: Stat, b: Stat, key: keyof Stat, isUp?: bool): number => {
  const nameA = a[key] as string;
  const nameB = b[key] as string;
  return isUp ? compareStrings(nameA, nameB) : compareStrings(nameB, nameA);
};

const sortNumbers = (a: Stat, b: Stat, key: keyof Stat, isUp?: bool) => {
  const nameA = a[key] as number;
  const nameB = b[key] as number;
  return isUp ? nameA - nameB : nameB - nameA;
};

export {sortName, sortNumbers};
