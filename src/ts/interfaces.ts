import { bool, defString } from './types';

interface CardObject {
  word: string;
  translation: string;
  image: string;
  assetsSrc: string;
}

interface Cards {
  actionA: CardObject[]
  actionB: CardObject[]
  animalA: CardObject[]
  animalB: CardObject[]
  clothes: CardObject[]
  emotions: CardObject[]
  body: CardObject[]
  colors: CardObject[]
}

interface Init {
  sectionName?: string, 
  isMain?: bool
} 

interface Game {
  getSound: (sound?: defString) => void,
  sounds: string[],
  wrongAnswer: number,
  item: Element, 
  getAnswerEvent: () => void, 
  answers: Element
}

interface Stat {
  word: string,
  translate: string,
  category: string,
  click: number,
  correct: number,
  wrong: number,
  percent: number
}

interface Filters {
  word: (a: Stat, b: Stat, isUp?: bool) => number,
  translate: (a: Stat, b: Stat, isUp?: bool) => number,
  category: (a: Stat, b: Stat, isUp?: bool) => number,
  click: (a: Stat, b: Stat, isUp?: bool) => number,
  correct: (a: Stat, b: Stat, isUp?: bool) => number,
  wrong: (a: Stat, b: Stat, isUp?: bool) => number,
  parsent: (a: Stat, b: Stat, isUp?: bool) => number
}

export {CardObject, Cards, Init, Game, Stat, Filters};