import { cards } from '../constants/cards';
import getGameEvent from './getGameEvent';
import { CardObject, Cards } from '../interfaces';
import LocalStorage from './LocalStorage';
import { bool, defString } from '../types';


export default class PlayMode {
  readonly local: LocalStorage;
  sounds: string[];
  constructor() {
    this.local = new LocalStorage();
    this.sounds = [];
  }

  public start(isStatus: bool) {
    const play = document.querySelector('.play');
    isStatus === true ? play?.classList.add('_mode-active') :
    play?.classList.remove('_mode-active');
  }

  public initMode(sectionName: defString) {
    this.sounds = [];
    let wrongAnswer = 0;

    const objArray: CardObject[] = cards[sectionName as keyof Cards];

    objArray.forEach((item) => {
      this.sounds.push(item.assetsSrc);
    });
    this.sounds.sort(() => Math.random() - 0.5);

    const getRestartEvent = () => this.getSound();
    const start = document.querySelector('.start') as Element;
    const playData = document.querySelectorAll('[data-play]');
    const images = document.querySelectorAll('._full');
    const answers = document.querySelector('.answer') as Element;

    start.addEventListener('click', () => {
      playData.forEach((item) => item.classList.add('_start-active'));
      images.forEach((item) => {
        let getAnswerEvent: () => void;
        item.addEventListener('click', getAnswerEvent = () => {
          wrongAnswer = getGameEvent({
            getSound: this.getSound,
            sounds: this.sounds,
            wrongAnswer: wrongAnswer,
            item, 
            getAnswerEvent, 
            answers
          }, this.local);
        });
      });
      start.addEventListener('click', getRestartEvent);
    }, {once: true});
  }

  public createMode(play: Element) {
    play.innerHTML = `
      <div class="start" data-play>
        <div class="start__text" data-play>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="-3 -3 45 45">
            <path d="M19.875 34.583q-6.083 0-10.333-4.25T5.292 20q0-6.042 4.25-10.312 4.25-4.271 10.375-4.271 3.541 0 6.458 1.437 2.917 1.438 5 4.104V5.417h3.375v12.75H21.958v-3.334h6.834q-1.542-2.291-3.771-3.645-2.229-1.355-5.146-1.355-4.25 0-7.208 2.959Q9.708 15.75 9.708 20q0 4.292 2.959 7.229 2.958 2.938 7.25 2.938 3.083 0 5.75-1.813 2.666-1.812 3.833-4.812h4.542q-1.25 4.875-5.188 7.958-3.937 3.083-8.979 3.083Z"/>
          </svg>
          <span class="text">
            START
          </span> 
        </div>
      </div>
      <div class="answer">
      </div>
    `;
  }

  public getSound = (sound?: defString) => {
    const audio = new Audio(sound ? sound : this.sounds[this.sounds.length - 1]);
    audio.play().catch(() => console.error());
  };
}