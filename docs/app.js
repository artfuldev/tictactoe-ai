/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var src_1 = __webpack_require__(1);
	var cells = Array.from(document.querySelectorAll('.cell'));
	var xPlayed = function (index) {
	    console.log(index);
	    var grid = cells.map(function (x, i) { return x.className === 'cell X' ? true : x.className === 'cell O' ? false : undefined; });
	    var result = src_1.getBestMove(grid);
	    console.log(result);
	    cells[result].className = 'cell O';
	};
	document.querySelector('.grid').addEventListener('click', function (event) {
	    var target = event.target, tagName = target.tagName;
	    if (tagName !== 'DIV' && tagName !== 'SPAN')
	        return false;
	    if (tagName === 'SPAN')
	        target = target.parentNode;
	    if (target.className !== 'cell')
	        return false;
	    target.className = 'cell X';
	    xPlayed(cells.indexOf(target));
	});
	document.querySelector('.new').addEventListener('click', function (event) {
	    event.stopPropagation();
	    event.preventDefault();
	    cells.forEach(function (cell) { return cell.className = 'cell'; });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var search_1 = __webpack_require__(2);
	exports.getBestMove = search_1.getBestMove;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var moves_1 = __webpack_require__(3);
	var evaluation_1 = __webpack_require__(4);
	var game_1 = __webpack_require__(8);
	var alphaBeta_1 = __webpack_require__(10);
	function getBestMove(grid, forX, depth) {
	    var moves = moves_1.getMoves(grid);
	    if (depth == undefined)
	        depth = moves.length;
	    if (forX == undefined)
	        forX = game_1.nextValue;
	    var isX = forX(grid);
	    var movesWithScores = moves.map(function (move) {
	        var newGrid = game_1.makeMove(grid, move, forX);
	        var evaluation = alphaBeta_1.alphaBeta(newGrid, depth, -Infinity, Infinity, !isX, evaluation_1.evaluate, game_1.hasGameEnded, function (grid) { return moves_1.getMoves(grid).map(function (move) { return game_1.makeMove(grid, move, forX); }); });
	        return {
	            move: move,
	            score: isX ? evaluation : -evaluation
	        };
	    });
	    var sortedMovesWithScores = movesWithScores.sort(function (a, b) { return b.score - a.score; });
	    var sortedMoves = sortedMovesWithScores.map(function (x) { return x.move; });
	    // Return the move with the best evaluation so far
	    return sortedMoves[0];
	}
	exports.getBestMove = getBestMove;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	function getMoves(grid) {
	    return grid
	        .map(function (value, index) { return value == undefined ? index : undefined; })
	        .filter(function (value) { return value != undefined; });
	}
	exports.getMoves = getMoves;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helpers_1 = __webpack_require__(5);
	function evaluate(grid) {
	    return helpers_1.evaluateRows(grid) + helpers_1.evaluateColumns(grid) + helpers_1.evaluateDiagonals(grid);
	}
	exports.evaluate = evaluate;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(6);
	function evaluateRows(grid) {
	    return utils_1.getRows(grid)
	        .map(evaluateCells)
	        .reduce(function (x, y) { return x + y; }, 0);
	}
	exports.evaluateRows = evaluateRows;
	function evaluateColumns(grid) {
	    return utils_1.getColumns(grid)
	        .map(evaluateCells)
	        .reduce(function (x, y) { return x + y; }, 0);
	}
	exports.evaluateColumns = evaluateColumns;
	function evaluateDiagonals(grid) {
	    return utils_1.getDiagonals(grid)
	        .map(evaluateCells)
	        .reduce(function (x, y) { return x + y; }, 0);
	}
	exports.evaluateDiagonals = evaluateDiagonals;
	function evaluateCells(cells) {
	    var length = cells.length;
	    if (length === 0)
	        return 0;
	    var initial = { undefined: 0, true: 0, false: 0 };
	    var counts = cells.reduce(function (counts, cell) { return increment(counts, cell); }, initial);
	    if (counts.undefined === length)
	        return 0;
	    if (counts.true === length)
	        return Infinity;
	    if (counts.false === length)
	        return -Infinity;
	    if (counts.false === 0)
	        return Math.pow(2, counts.true);
	    if (counts.true === 0)
	        return -Math.pow(2, counts.false);
	    return 0;
	}
	exports.evaluateCells = evaluateCells;
	function increment(obj, key) {
	    var newObj = {};
	    for (var prop in obj)
	        if (obj.hasOwnProperty(prop))
	            newObj[prop] = obj[prop];
	    newObj[key + '']++;
	    return newObj;
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helpers_1 = __webpack_require__(7);
	function getArray(length) {
	    return Array.apply(null, { length: length }).map(Number.call, Number);
	}
	function getRows(grid) {
	    var size = Math.sqrt(grid.length);
	    var copy = grid.concat([]);
	    return getArray(size).map(function () { return copy.splice(0, size); });
	}
	exports.getRows = getRows;
	function getColumns(grid) {
	    return getRows(helpers_1.transpose(grid));
	}
	exports.getColumns = getColumns;
	function getDiagonals(grid) {
	    var size = Math.sqrt(grid.length);
	    var lesser = size - 1;
	    var last = grid.length - 1;
	    return [
	        grid.filter(function (x, i) { return Math.floor(i / size) === i % size; }),
	        grid.filter(function (x, i) { return i > 0 && i < last && i % lesser === 0; })
	    ];
	}
	exports.getDiagonals = getDiagonals;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	function transpose(grid) {
	    var size = Math.sqrt(grid.length);
	    return grid.map(function (x, i) { return grid[Math.floor(i / size) + ((i % size) * size)]; });
	}
	exports.transpose = transpose;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helpers_1 = __webpack_require__(9);
	function nextValue(grid) {
	    return grid.filter(function (cell) { return cell != undefined; }).length % 2 == 0;
	}
	exports.nextValue = nextValue;
	function makeMove(grid, move, forX) {
	    var newValue = forX(grid);
	    return grid.map(function (value, index) { return index == move ? newValue : value; });
	}
	exports.makeMove = makeMove;
	function hasGameEnded(grid) {
	    return helpers_1.hasXWon(grid) || helpers_1.hasOWon(grid) || helpers_1.isDraw(grid);
	}
	exports.hasGameEnded = hasGameEnded;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(6);
	function doesAnyArrayHaveAll(cellsArray, value) {
	    return cellsArray.some(function (cells) { return cells.every(function (cell) { return cell === value; }); });
	}
	function hasWon(grid, forX) {
	    return doesAnyArrayHaveAll(utils_1.getRows(grid), forX)
	        || doesAnyArrayHaveAll(utils_1.getColumns(grid), forX)
	        || doesAnyArrayHaveAll(utils_1.getDiagonals(grid), forX);
	}
	function hasXWon(grid) {
	    return hasWon(grid, true);
	}
	exports.hasXWon = hasXWon;
	function hasOWon(grid) {
	    return hasWon(grid, false);
	}
	exports.hasOWon = hasOWon;
	function isDraw(grid) {
	    return grid.filter(function (cell) { return cell != undefined; }).length === grid.length;
	}
	exports.isDraw = isDraw;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	function alphaBeta(node, depth, alpha, beta, isMaximizingPlayer, evaluate, isTerminalNode, getChildren) {
	    if (depth == 0 || isTerminalNode(node))
	        return evaluate(node);
	    if (isMaximizingPlayer) {
	        var score_1 = -Infinity;
	        var children_1 = getChildren(node);
	        for (var i = 0; i < children_1.length; i++) {
	            var child = children_1[i];
	            score_1 = Math.max(score_1, alphaBeta(child, depth - 1, alpha, beta, false, evaluate, isTerminalNode, getChildren));
	            alpha = Math.max(alpha, score_1);
	            if (beta <= alpha)
	                break;
	        }
	        return score_1;
	    }
	    var score = Infinity;
	    var children = getChildren(node);
	    for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        score = Math.min(score, alphaBeta(child, depth - 1, alpha, beta, false, evaluate, isTerminalNode, getChildren));
	        beta = Math.min(beta, score);
	        if (beta <= alpha)
	            break;
	    }
	    return score;
	}
	exports.alphaBeta = alphaBeta;


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map