import { getBestMove, hasGameEnded, hasXWon, hasOWon } from '../src';

const cells = Array.from(document.querySelectorAll('.cell'));
const resultDiv = document.querySelector('.result');
const youScoreSpan = document.querySelector('.player.score span') as HTMLElement;
const aiScoreSpan = document.querySelector('.ai.score span') as HTMLElement;

const incrementScore = (scoreSpan: HTMLElement) => {
  const score = parseInt(scoreSpan.innerText);
  scoreSpan.innerText = (score + 1).toString();
}

const gameEnded = (grid: boolean[]) => {
  const oWon = hasOWon(grid);
  const xWon = hasXWon(grid);
  if (xWon || oWon) incrementScore(xWon ? youScoreSpan : aiScoreSpan);
  resultDiv.className =
    xWon
      ? 'result x won'
      : oWon
        ? 'result o won'
        : 'result drawn';
}

const readGrid = () => cells.map((x, i) => x.className === 'cell X' ? true : x.className === 'cell O' ? false : undefined);

const xPlayed = function (index: number) {
  console.log(index);
  const grid = readGrid();
  if (hasGameEnded(grid)) return gameEnded(grid);
  const result = getBestMove(grid);
  console.log(result);
  cells[result as number].className = 'cell O';
  const newGrid = readGrid();
  if (hasGameEnded(newGrid)) gameEnded(newGrid);
};

document.querySelector('.grid').addEventListener('click', event => {
  let target = event.target as HTMLElement,
    tagName = target.tagName;
  if (tagName !== 'DIV' && tagName !== 'SPAN') return false;
  if (tagName === 'SPAN') target = target.parentNode as HTMLElement;
  if (target.className !== 'cell') return false;
  target.className = 'cell X';
  xPlayed(cells.indexOf(target));
});

document.querySelector('.new').addEventListener('click', event => {
  event.stopPropagation();
  event.preventDefault();
  cells.forEach(cell => cell.className = 'cell');
  resultDiv.className = 'result';
});
