import Card from './card';
import {cards, cardSets} from '../constants/cards';
import { Cards, CardObject, Init } from '../interfaces';
import { bool, Card as ICard } from '../types';
import Interactive from './interactive';
import remove from './remove';
import PlayMode from './playMode';

export default class Section {
  readonly #card: Card;
  readonly #interactive: Interactive;
  readonly #cardArray: ReadonlyArray<string>;
  readonly #cardKeys: string[];

  constructor() {
    this.#card = new Card();
    this.#interactive = new Interactive();
    this.#cardArray = [...cardSets];
    this.#cardKeys = Object.keys(cards);
  }

  private createMainSection(isStatus?: boolean) {
    const container = document.querySelector('.sections') as Element;
    this.#cardArray.forEach((item, index) => {
      const cardImage: string = cards[this.#cardKeys[index] as keyof Cards][0].image;
      const cardWord: string = cards[this.#cardKeys[index] as keyof Cards][0].translation;
      const obj: ICard = {
        image: cardImage,
        title: item,
        translation: cardWord,
        song: '',
        status: isStatus,
        main: true,
        name: this.#cardKeys[index]
      };

      container.append(this.#card.create(obj));
    });
  }
  public createSection(section: CardObject[], isStatus?: bool) {
    const container = document.querySelector('.sections') as Element;
    section.forEach((item) => {
      const obj: ICard = {
        image: item.image,
        title: item.word,
        translation: item.translation,
        song: item.assetsSrc,
        status: isStatus,
        main: false
      };

      container.append(this.#card.create(obj));
    });
  }

  public initSection({sectionName, isMain}: Init) {
    remove();
    const checkMode = document.querySelector('.switch__box') as HTMLInputElement;
    const playMode = new PlayMode();
    if (isMain) {
      playMode.start(false);
      this.createMainSection(checkMode.checked);
    } else {
      const section = cards[sectionName as keyof Cards];
      this.createSection(section, checkMode.checked);
      if (checkMode.checked) {
        const play = document.querySelector('.play') as Element;
        playMode.start(true);
        playMode.createMode(play);
        playMode.initMode(sectionName);
      }
    }
    this.#interactive.click(isMain, checkMode.checked);
  }
}