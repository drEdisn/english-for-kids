import { cards } from '../constants/cards';
import { CardObject, Cards} from '../interfaces';
import LocalStorage from './LocalStorage';

const getIsItemNotExist = (word: string, local: LocalStorage) => local.getItem(word) === null;

export default function createObjStats(reset = false, local: LocalStorage) {
  const keys: string[] = Object.keys(cards);

  keys.forEach((item) => {
    const cardArr: CardObject[] = cards[item as keyof Cards];
    cardArr.forEach(({word, translation}) => {
      if (getIsItemNotExist(word, local) || reset) {
        const card = {
          word: word,
          translate: translation,
          category: item,
          click: 0,
          correct: 0,
          wrong: 0,
          percent: 0
        };
  
        local.setItem(word, JSON.stringify(card));
      }
    });
  });
}