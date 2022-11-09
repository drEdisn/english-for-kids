import { Stat } from '../interfaces';
import LocalStorage from './LocalStorage';
import Menu from './menu';
import PlayMode from './playMode';
import Section from './section';
import { bool, elem } from '../types';

export default class Interactive {
  readonly local: LocalStorage;
  constructor() {
    this.local = new LocalStorage();
  }

  private say(item: Element) {
    const src = item.getAttribute('data-song') as string;
    const audio = new Audio(src);
    audio.play().catch(() => console.error());
  }

  public click(isMain?: bool, isStatus?: bool) {
    const front = document.querySelectorAll('.front');
    front.forEach((i) => {
      i.addEventListener('click', (e) => {
        if (isMain) {
          const section = i.getAttribute('data-section') as string;
          const newSection = new Section();
          const menu = new Menu();
          if (isStatus === true) {
            const play = document.querySelector('.play') as Element;
            const playMode = new PlayMode();
            playMode.start(true);
            playMode.createMode(play);
            playMode.initMode(section);
          }
          menu.change(section);
          newSection.initSection({sectionName: section, isMain: false});
        } else if (!isMain && !isStatus) {
          this.refresh(i, e.target as Element);
        }
      });
    });
  }

  private refresh(i: Element, target: Element) {
    const refresh = i.querySelector('.front__refrash') as Element;
    const name = i.querySelector('.front__title') as HTMLElement;
    const str = this.local.getItem(name.innerText) as string;
    const obj = JSON.parse(str) as Stat;
    obj.click += 1;
    this.local.setItem(name.innerText, JSON.stringify(obj));

    this.say(refresh);
    if (target === refresh) {
      const parent: elem = i.closest('.sections__item');
      const front = parent?.querySelector('.front') as HTMLElement;
      const back: elem | undefined = parent?.querySelector('.back');
      front?.classList.add('_refrash');
      back?.classList.add('_refrash');
      parent?.addEventListener('mouseleave', function liveEvent(){
        front?.classList.remove('_refrash');
        back?.classList.remove('_refrash');
        parent.removeEventListener('mouseleave', liveEvent);
      });
    }
  }
}