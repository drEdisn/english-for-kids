import { sortName, sortNumbers } from './filters';
import { Filters, Stat } from '../interfaces';
import { bool } from '../types';

const filterCheckObj: Filters = {
  word(a: Stat, b: Stat, isUp?: bool) {
    return sortName(a, b, 'word', isUp);
  },
  translate(a: Stat, b: Stat, isUp?: bool) {
    return sortName(a, b, 'translate', isUp);
  },
  category(a: Stat, b: Stat, isUp?: bool) {
    return sortName(a, b, 'category', isUp);
  },
  click(a: Stat, b: Stat, isUp?: bool) {
    return sortNumbers(a, b, 'click', isUp);
  },
  correct(a: Stat, b: Stat, isUp?: bool) {
    return sortNumbers(a, b, 'correct', isUp);
  },
  wrong(a: Stat, b: Stat, isUp?: bool) {
    return sortNumbers(a, b, 'wrong', isUp);
  },
  parsent(a: Stat, b: Stat, isUp?: bool) {
    return sortNumbers(a, b, 'percent', isUp);
  }
};

export {filterCheckObj};