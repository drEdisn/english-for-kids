export default function isLostCheck (
  wrongAnswer: number,
  statusImg: HTMLImageElement,
  statusMis: HTMLElement
  ) {
  if (wrongAnswer > 0) {
    statusImg.src = './images/lose.png';
    statusMis.innerText = `${wrongAnswer} mistakes`;
    statusMis.style.display = 'flex';
  } else {
    statusImg.src = './images/win.png';
    statusMis.style.display = 'none';
  }
}