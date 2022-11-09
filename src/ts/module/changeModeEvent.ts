import PlayMode from './playMode';
import Section from './section';
import { elem } from '../types';
import checkChangeMode from './checkChangeMode';

export default function changeModeEvent (
  section: Section,
  playMode: PlayMode,
  checkMode: HTMLInputElement
  ) {
  const main = 'main';
  const elem = document.querySelector('._section-active') as Element;
  const name = elem.getAttribute('data-item') as string;
  const play = document.querySelector('.play') as Element;
  const menuElement: elem = document.querySelector('._section-active');
  const sectionName = menuElement?.getAttribute('data-item') as string;

  section.initSection({sectionName: name, isMain: name === main});
  checkChangeMode(sectionName, playMode, checkMode, play, main);
}