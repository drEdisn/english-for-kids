import getEndGame from './getEndGame';
import { Stat } from '../interfaces';
import { defString } from '../types';


export default function checkAnswer (
  itemName: string | null,
  sounds: string[],
  item: Element,
  getAnswerEvent: () => void,
  answers: Element,
  wrongAnswer: number,
  loseSound: string,
  successSound: string,
  getSound: (sound?: defString) => void,
  obj: Stat,
  errorSound: string
): number {
  if (itemName === sounds[sounds.length - 1]) {
    item.removeEventListener('click', getAnswerEvent);
    item.classList.add('_disable');
    sounds.pop();
    answers.innerHTML += '<img class="answer__image" src="./images/star-win.svg" alt="right">';
    getSound(sounds[sounds.length - 1]);

    obj.correct += 1;
    getEndGame(sounds, wrongAnswer, loseSound, successSound, getSound);
  } else {
    answers.innerHTML += '<img class="answer__image" src="./images/star.svg" alt="wrong">';
    wrongAnswer++;
    obj.wrong += 1;
    getSound(errorSound);
  }
  return wrongAnswer;
}