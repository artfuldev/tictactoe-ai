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
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var src_1 = __webpack_require__(1);
	var cells = Array.from(document.querySelectorAll('.cell'));
	var resultDiv = document.querySelector('.result');
	var youScoreSpan = document.querySelector('.player.score span');
	var aiScoreSpan = document.querySelector('.ai.score span');
	var incrementScore = function (scoreSpan) {
	    var score = parseInt(scoreSpan.innerText);
	    scoreSpan.innerText = (score + 1).toString();
	};
	var gameEnded = function (grid) {
	    var oWon = src_1.hasOWon(grid);
	    var xWon = src_1.hasXWon(grid);
	    if (xWon || oWon)
	        incrementScore(xWon ? youScoreSpan : aiScoreSpan);
	    resultDiv.className =
	        xWon
	            ? 'result x won'
	            : oWon
	                ? 'result o won'
	                : 'result drawn';
	};
	var readGrid = function () { return cells.map(function (x, i) { return x.className === 'cell X' ? true : x.className === 'cell O' ? false : undefined; }); };
	var xPlayed = function (index) {
	    console.log(index);
	    var grid = readGrid();
	    if (src_1.hasGameEnded(grid))
	        return gameEnded(grid);
	    var result = src_1.getBestMove(grid);
	    console.log(result);
	    cells[result].className = 'cell O';
	    var newGrid = readGrid();
	    if (src_1.hasGameEnded(newGrid))
	        gameEnded(newGrid);
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
	    resultDiv.className = 'result';
	});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var search_1 = __webpack_require__(2);
	exports.getBestMove = search_1.getBestMove;
	var game_1 = __webpack_require__(8);
	exports.hasGameEnded = game_1.hasGameEnded;
	exports.hasXWon = game_1.hasXWon;
	exports.hasOWon = game_1.hasOWon;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var moves_1 = __webpack_require__(3);
	var evaluation_1 = __webpack_require__(4);
	var game_1 = __webpack_require__(8);
	var minimax_1 = __webpack_require__(10);
	exports.getBestMove = function (grid, forX, depth) {
	    var moves = moves_1.getMoves(grid);
	    if (depth == undefined)
	        depth = moves.length;
	    if (forX == undefined)
	        forX = game_1.nextValue;
	    var isX = forX(grid);
	    var getNextNodes = function (grid) { return moves_1.getMoves(grid).map(function (move) { return game_1.makeMove(grid, move, forX); }); };
	    var movesWithScores = moves.map(function (move) {
	        var newGrid = game_1.makeMove(grid, move, forX);
	        var score = minimax_1.minimax(newGrid, depth, !isX, evaluation_1.evaluate, game_1.hasGameEnded, getNextNodes);
	        return {
	            move: move,
	            score: isX ? score : -score
	        };
	    });
	    var sortedMovesWithScores = movesWithScores.sort(function (a, b) { return b.score - a.score; });
	    var sortedMoves = sortedMovesWithScores.map(function (x) { return x.move; });
	    // Return the move with the best evaluation so far
	    return sortedMoves[0];
	};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function getMoves(grid) {
	    return grid
	        .map(function (value, index) { return value == undefined ? index : undefined; })
	        .filter(function (value) { return value != undefined; });
	}
	exports.getMoves = getMoves;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var helpers_1 = __webpack_require__(5);
	exports.evaluate = function (grid) {
	    return helpers_1.evaluateRows(grid) + helpers_1.evaluateColumns(grid) + helpers_1.evaluateDiagonals(grid);
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(6);
	exports.evaluateRows = function (grid) {
	    return utils_1.getRows(grid)
	        .map(exports.evaluateCells)
	        .reduce(function (x, y) { return x + y; }, 0);
	};
	exports.evaluateColumns = function (grid) {
	    return utils_1.getColumns(grid)
	        .map(exports.evaluateCells)
	        .reduce(function (x, y) { return x + y; }, 0);
	};
	exports.evaluateDiagonals = function (grid) {
	    return utils_1.getDiagonals(grid)
	        .map(exports.evaluateCells)
	        .reduce(function (x, y) { return x + y; }, 0);
	};
	exports.evaluateCells = function (cells) {
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
	};
	var increment = function (obj, key) {
	    var newObj = {};
	    for (var prop in obj)
	        if (obj.hasOwnProperty(prop))
	            newObj[prop] = obj[prop];
	    newObj[key + '']++;
	    return newObj;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var helpers_1 = __webpack_require__(7);
	var getArray = function (length) {
	    return Array.apply(null, { length: length }).map(Number.call, Number);
	};
	exports.getRows = function (grid) {
	    var size = Math.sqrt(grid.length);
	    var copy = grid.concat([]);
	    return getArray(size).map(function () { return copy.splice(0, size); });
	};
	exports.getColumns = function (grid) { return exports.getRows(helpers_1.transpose(grid)); };
	exports.getDiagonals = function (grid) {
	    var size = Math.sqrt(grid.length);
	    var lesser = size - 1;
	    var last = grid.length - 1;
	    return [
	        grid.filter(function (_, i) { return Math.floor(i / size) === i % size; }),
	        grid.filter(function (_, i) { return i > 0 && i < last && i % lesser === 0; })
	    ];
	};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transpose = function (grid) {
	    var size = Math.sqrt(grid.length);
	    return grid.map(function (x, i) { return grid[Math.floor(i / size) + ((i % size) * size)]; });
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var helpers_1 = __webpack_require__(9);
	exports.nextValue = function (grid) {
	    return grid.filter(function (cell) { return cell != undefined; }).length % 2 == 0;
	};
	exports.makeMove = function (grid, move, forX) {
	    var newValue = forX(grid);
	    return grid.map(function (value, index) { return index == move ? newValue : value; });
	};
	exports.hasXWon = function (grid) { return helpers_1.hasWon(grid, true); };
	exports.hasOWon = function (grid) { return helpers_1.hasWon(grid, false); };
	exports.isFull = function (grid) { return grid.every(function (cell) { return cell != undefined; }); };
	exports.hasGameEnded = function (grid) {
	    return exports.hasXWon(grid) || exports.hasOWon(grid) || exports.isFull(grid);
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(6);
	var doesAnyArrayHaveAll = function (cellsArray, value) {
	    return cellsArray.some(function (cells) { return cells.every(function (cell) { return cell === value; }); });
	};
	exports.hasWon = function (grid, forX) {
	    return doesAnyArrayHaveAll(utils_1.getRows(grid), forX)
	        || doesAnyArrayHaveAll(utils_1.getColumns(grid), forX)
	        || doesAnyArrayHaveAll(utils_1.getDiagonals(grid), forX);
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.minimax = function (node, depth, maximizingPlayer, evaluate, isTerminalNode, getChildren) {
	    if (depth == 0 || isTerminalNode(node))
	        return evaluate(node);
	    if (maximizingPlayer)
	        return getChildren(node)
	            .reduce(function (best, child) { return Math.max(best, exports.minimax(child, depth - 1, false, evaluate, isTerminalNode, getChildren)); }, -Infinity);
	    return getChildren(node)
	        .reduce(function (best, child) { return Math.min(best, exports.minimax(child, depth - 1, true, evaluate, isTerminalNode, getChildren)); }, Infinity);
	};


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map