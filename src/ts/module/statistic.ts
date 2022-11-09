import { cards } from '../constants/cards';
import createObjStats from './createObjStats';
import Interactive from './interactive';
import { CardObject, Cards, Filters, Stat } from '../interfaces';
import Section from './section';
import { filterCheckObj } from './filterCheckObj';
import LocalStorage from './LocalStorage';

export default class Statistics {
  readonly local: LocalStorage;
  constructor() {
    this.local = new LocalStorage();
  }

   statsItems(parseArray?: Stat[] | undefined) {
    let strAll = '';
    if (parseArray !== undefined) {
      for (let i = 0; i < parseArray.length; i++) {
        strAll +=`
          <tr class="table__row data-row">
            <td class="table__col">${parseArray[i].word}</td>
            <td class="table__col">${parseArray[i].translate}</td>
            <td class="table__col">${parseArray[i].category}</td>
            <td class="table__col">${parseArray[i].click}</td>
            <td class="table__col">${parseArray[i].correct}</td>
            <td class="table__col">${parseArray[i].wrong}</td>
            <td class="table__col">${parseArray[i].percent}<span>%</span></td>
          </tr>
        `;
      }
    } else {
      const keys: string[] = Object.keys(localStorage);
      for (let i = 0; i < keys.length; i++) {
        const key = this.local.getItem(keys[i]) as string;
        const obj = JSON.parse(key) as Stat;
        strAll +=`
          <tr class="table__row" data-row>
            <td class="table__col">${obj.word}</td>
            <td class="table__col">${obj.translate}</td>
            <td class="table__col">${obj.category}</td>
            <td class="table__col">${obj.click}</td>
            <td class="table__col">${obj.correct}</td>
            <td class="table__col">${obj.wrong}</td>
            <td class="table__col">${obj.percent}<span>%</span></td>
          </tr>
        `;
      }
    }
    return strAll;
  }


  createStats() {
    const section = document.querySelector('.sections') as Element;
    
    section.innerHTML = `
      <div class="stats__container">
        <div class="start stats__start reset">
          <div class="start__text stats__text">
            RESET
          </div>
        </div>
        <div class="start stats__start repeat">
          <div class="start__text stats__text">
            Repeat difficult words
          </div>
        </div>
      </div>
      
      <table class="table">
        <caption class="title table__title">STATISTICS</caption>
        <tr class="table__row">
          <td class="table__col head" data-filter="word">Word</td>
          <td class="table__col head" data-filter="translate">Translation</td>
          <td class="table__col head" data-filter="category">Category</td>
          <td class="table__col head" data-filter="click">Click</td>
          <td class="table__col head" data-filter="correct">Correct</td>
          <td class="table__col head" data-filter="wrong">Wrong</td>
          <td class="table__col head" data-filter="parsent">c/w %</td>
        </tr>
        <tbody class="stats__body">
          ${this.statsItems()}
        </tbody>
      </table>
    `;

    this.statsButtonEvent(section);
    this.statsFilterEvent();
  }

  statsButtonEvent(sectionElem: Element) {
    const reset = document.querySelector('.reset') as Element;
    const repeat = document.querySelector('.repeat') as Element;
    const titleElem = document.querySelector('.title') as HTMLElement;
    const section = new Section();
    const interactive = new Interactive();
    let wordsArray: string[] = [];
    let objLocal: Stat[] = []; 

    reset.addEventListener('click', () => {
      createObjStats(true, this.local);
      wordsArray = [];
      this.createStats();
    });

    repeat.addEventListener('click', () => {
      const resSectionArray: CardObject[] = [];
      const keysLocal: string[] = Object.keys(localStorage);
      const keys: string[] = Object.keys(cards);

      for (let i = 0; i < keysLocal.length - 1; i++) {
        const key = this.local.getItem(keysLocal[i]) as string;
        const obj = JSON.parse(key) as Stat;
        if (obj.wrong > 0) {
          objLocal.push(obj);
        }
      }

      if (objLocal.length > 0) {
        objLocal = objLocal.sort((a: Stat, b: Stat) => a.wrong - b.wrong);

        for (let i = 0; i < 7; i++) {
          wordsArray.push(objLocal[i]?.word);
        }
        keys.forEach((item) => {
          const cardArr: CardObject[] = cards[item as keyof Cards];
          cardArr.forEach((i) => {
            if (wordsArray.includes(i.word)) {
              resSectionArray.push(i);
            }
          });
        });

        titleElem.style.display = 'flex';
        sectionElem.innerHTML = '';
        section.createSection(resSectionArray);
        interactive.click();
      }
    });
  }

  statsFilterEvent() {
    const tableHeads: NodeListOf<Element> = document.querySelectorAll('.head');
    const statsBody = document.querySelector('.stats__body') as Element;
    const keysLocal: string[] = Object.keys(localStorage);
    

    tableHeads.forEach((item) => {
      item.addEventListener('click', () => {
        let parseArr: Stat[] = [];
        for (let i = 0; i < keysLocal.length; i++) {
          const key = this.local.getItem(keysLocal[i]) as string;
          const obj = JSON.parse(key) as Stat;
          parseArr.push(obj);
        }

        item.classList.toggle('_up');
        const key = <string> item.getAttribute('data-filter');
        if (item.classList.contains('_up')) {
          item.classList.remove('_down');
          parseArr = parseArr.sort((a: Stat, b: Stat) => filterCheckObj[key as keyof Filters](a, b, true));
        } else {
          item.classList.add('_down');
          parseArr = parseArr.sort((a: Stat, b: Stat) => filterCheckObj[key as keyof Filters](a, b));
        }

        statsBody.innerHTML = this.statsItems(parseArr);
      });
    });
  }
}