import { Game, Stat } from '../interfaces';
import LocalStorage from './LocalStorage';
import checkAnswer from './checkAnswer';

export default function getGameEvent(
  {
    getSound,
    sounds,
    wrongAnswer,
    item,
    getAnswerEvent,
    answers
  }: Game,
  local: LocalStorage
  ): number {
  const itemName = item.getAttribute('data-song');
  const name = item.getAttribute('data-name') as string;
  const str = local.getItem(name) as string;
  const obj = JSON.parse(str) as Stat;
  const successSound = './assets/success.mp3';
  const loseSound = './assets/failure.mp3';
  const errorSound = './assets/error.mp3';

  wrongAnswer = checkAnswer(
    itemName,
    sounds,
    item,
    getAnswerEvent,
    answers,
    wrongAnswer,
    loseSound,
    successSound,
    getSound,
    obj,
    errorSound
  );

  if (answers.childNodes.length >= 10) answers.firstChild?.remove();
  obj.percent = Math.round(100 / (obj.correct + obj.wrong)) * obj.correct;
  local.setItem(name, JSON.stringify(obj));

  return wrongAnswer;
}