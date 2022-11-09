import PlayMode from './playMode';

export default function checkChangeMode (
  sectionName: string, 
  playMode: PlayMode, 
  checkMode: HTMLInputElement, 
  play: Element, 
  main: string
  ) {
  if (sectionName !== main) {
    playMode.start(checkMode.checked);
    
    if (checkMode.checked) {
      playMode.createMode(play);
      playMode.initMode(sectionName);
    } else {
      play.innerHTML = '';
    }
  }
}