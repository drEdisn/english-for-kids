import changeModeEvent from './changeModeEvent';
import PlayMode from './playMode';
import Section from './section';

export default function startEvents(section: Section, playMode: PlayMode) {
  const checkMode = document.querySelector('.switch__box') as HTMLInputElement;
  checkMode.addEventListener('change', () => changeModeEvent(section, playMode, checkMode));
}