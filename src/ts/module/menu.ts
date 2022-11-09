import Section from './section';
import Statistics from './statistic';
import { elem } from '../types';

const menuEvent = (openItems: NodeListOf<Element>) => {
  const body = document.querySelector('.body');
  body?.classList.toggle('_view');
  openItems.forEach((item) => {
    item.classList.toggle('_menu-active');
  });
};

export default class Menu {
  #openItems: NodeListOf<Element>;
  readonly #section: Section;
  readonly #stats: Statistics;

  constructor() {
    this.#section = new Section();
    this.#stats = new Statistics();
    this.#openItems = document.querySelectorAll('[data-menu="active"]');
  }

  private open() {
    const button = document.querySelector('.lines') as Element;
    button.addEventListener('click', () => menuEvent(this.#openItems));
  }

  public change(section: string) {
    const menuItem = document.querySelector(`[data-item="${section}"]`);
    const prev = document.querySelector('._section-active');
    prev?.classList.remove('_section-active');
    menuItem?.classList.add('_section-active');
  }

  public active() {
    const menuItems: NodeListOf<Element> = document.querySelectorAll('.list__item');
    const titleElem = document.querySelector('.title') as HTMLElement;
    const switchElem = document.querySelector('.switch') as HTMLElement;
    this.open();
    
    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        const prev: elem = document.querySelector('._section-active');
        prev?.classList.remove('_section-active');
        item.classList.add('_section-active');
        
        const play = document.querySelector('.play') as Element;
        play.innerHTML = '';
        
        const name = <string> item.getAttribute('data-item');
        if (name !== 'stat') {
          this.#section.initSection({isMain: name === 'main' ? true : false, sectionName: name});
          titleElem.style.display = 'flex';
          switchElem.style.display = 'flex';
        } else {
          this.#stats.createStats();
          titleElem.style.display = 'none';
          switchElem.style.display = 'none';
        }
        menuEvent(this.#openItems);
      });
    });
  }
}