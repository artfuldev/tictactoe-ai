export const minimax = <TNode>(
  node: TNode,
  depth: number,
  maximizingPlayer: boolean,
  evaluate: (n: TNode) => number,
  isTerminalNode: (n: TNode) => boolean,
  getChildren: (n: TNode) => TNode[]): number => {
  if (depth == 0 || isTerminalNode(node)) return evaluate(node);
  if (maximizingPlayer)
    return getChildren(node)
      .reduce((best, child) => Math.max(best, minimax(child, depth - 1, false, evaluate, isTerminalNode, getChildren)),
      -Infinity);
  return getChildren(node)
      .reduce((best, child) => Math.min(best, minimax(child, depth - 1, true, evaluate, isTerminalNode, getChildren)),
      Infinity);
  }
    