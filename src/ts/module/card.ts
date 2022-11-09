import { bool, Card as CardDto } from '../types';

const getStringTemplate = (isCheck: bool, song: string): string => {
  return isCheck ? '' : `<div class="front__refrash" data-song="${song}"></div>`;
};

export default class Card {
  public create({image, title, translation, song, status, main, name}: CardDto): Element {
    const container = document.createElement('div');
    container.classList.add('sections__item');
    
    if (status && !main) {
      this.createPlay(container, image, name == undefined ? '': name, song, title);
    } else {
      this.cardTemplate(
        {
          image: image,
          title: title,
          translation: translation,
          song: song,
          status: status,
          main: main,
          name: name
        },
        container
      );
    }

    return container;
  }

  private cardTemplate (card: CardDto, container: Element) {
    container.innerHTML = `
    <div class="front" data-section="${card.name == undefined ? '': card.name}">
      <img src="${card.image}" alt="image" class="front__img">
      <div class="front__description">
        <h3 class="front__title">${card.title}</h3>
        ${getStringTemplate(card.main, card.song)}
      </div>
      <div class="front__description">
        ${card.main ? '<div class="front__subtitle">8 cards</div>' : '<div></div>'}
        <span class="sections__status ${card.status ? '_play' : ''}"></span>
      </div>
    </div>
    <div class="back">
      <img src="${card.image}" alt="image" class="front__img">
      <div class="front__description">
        <h3 class="front__title">${card.translation}</h3>
      </div>
      <div class="front__description">
        <div></div>
        <span class="sections__status ${card.status ? '_play' : ''}"></span>
      </div>
    </div>
  `;
  }

  createPlay(container: Element, image: string, name: string, song: string, title: string) {
    container.innerHTML = `
      <div class="front" data-section="${name}">
        <img src="${image}" alt="image" class="front__img _full" data-song='${song}' data-name='${title}'>
      </div>
    `;
  }
}