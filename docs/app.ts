import { getBestMove } from '../src';

const cells = Array.from(document.querySelectorAll('.cell'));

const xPlayed = function (index: number) {
  console.log(index);
  const grid = cells.map((x, i) => x.className === 'cell X' ? true : x.className === 'cell O' ? false : undefined);
  const result = getBestMove(grid);
  console.log(result);
  cells[result as number].className = 'cell O';
};

document.querySelector('.grid').addEventListener('click', function (ev) {
  let target = ev.target as HTMLElement,
    tagName = target.tagName;
  if (tagName !== 'DIV' && tagName !== 'SPAN') return false;
  if (tagName === 'SPAN') target = target.parentNode as HTMLElement;
  if (target.className !== 'cell') return false;
  target.className = 'cell X';
  xPlayed(cells.indexOf(target));
});
