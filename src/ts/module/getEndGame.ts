import isLostCheck from './isLostCheck';
import Menu from './menu';
import Section from './section';
import { defString } from '../types';

export default function getEndGame (
  sounds: string[],
  wrongAnswer: number,
  loseSound: string,
  successSound: string,
  getSound: (sound?: defString) => void
) {
  if (sounds.length === 0) {
    const status = document.querySelector('.status') as Element;
    const statusImg = document.querySelector('.status__img') as HTMLImageElement;
    const statusMis = document.querySelector('.status__mistakes') as HTMLElement;
    status.classList.add('_status-active');

    const section = new Section();
    const menu = new Menu();
    menu.change('main');
    section.initSection({isMain: true});

    const play = document.querySelector('.play') as Element;
    play.innerHTML = '';

    getSound(wrongAnswer > 0 ? loseSound : successSound);
    isLostCheck(wrongAnswer, statusImg, statusMis);
    setTimeout(() => {status.classList.remove('_status-active');}, 2000);
  }
}