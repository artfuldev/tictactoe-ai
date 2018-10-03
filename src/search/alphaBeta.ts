export const alphaBeta = <TNode>(
  node: TNode,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizingPlayer: boolean,
  evaluate: (node: TNode) => number,
  isTerminalNode: (node: TNode) => boolean,
  getChildren: (node: TNode) => TNode[]) => {
  if (depth == 0 || isTerminalNode(node)) return evaluate(node);
  if (isMaximizingPlayer) {
    let score = -Infinity;
    const children = getChildren(node);
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      score = Math.max(score,
        alphaBeta(child, depth - 1, alpha, beta, false, evaluate, isTerminalNode,
          getChildren));
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return score;
  }
  let score = Infinity;
  const children = getChildren(node);
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    score = Math.min(score,
      alphaBeta(child, depth - 1, alpha, beta, false, evaluate, isTerminalNode,
        getChildren));
    beta = Math.min(beta, score);
    if (beta <= alpha) break;
  }
  return score;
}
