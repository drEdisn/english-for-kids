import createObjStats from './createObjStats';
import LocalStorage from './LocalStorage';
import Menu from './menu';
import PlayMode from './playMode';
import Section from './section';
import startEvent from './startEvents';

export default class App {
  readonly menu: Menu;
  readonly section: Section;
  readonly playMode: PlayMode;
  readonly local: LocalStorage;
  
  constructor() {
    this.menu = new Menu();
    this.section = new Section();
    this.playMode = new PlayMode();
    this.local = new LocalStorage();
  }

  public start() {
    this.menu.active();
    createObjStats(false, this.local);
    startEvent(this.section, this.playMode);
    this.section.initSection({isMain: true});
  }
}