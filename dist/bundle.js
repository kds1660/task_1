/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/constants/constants.js":
/*!************************************!*\
  !*** ./app/constants/constants.js ***!
  \************************************/
/*! exports provided: constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"constants\", function() { return constants; });\nconst constants = {\r\n    events: {\r\n        startSelector: \".start\",\r\n        pauseSelector: \".pause\",\r\n        stopSelector: \".stop\",\r\n        worldSelector: \".container\",\r\n        sizeSelector: \"#size\"\r\n    },\r\n    timeInterval: 500,\r\n    defaultSize: 100\r\n};\n\n//# sourceURL=webpack:///./app/constants/constants.js?");

/***/ }),

/***/ "./app/controllers/worldController.js":
/*!********************************************!*\
  !*** ./app/controllers/worldController.js ***!
  \********************************************/
/*! exports provided: WorldController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WorldController\", function() { return WorldController; });\nclass WorldController {\n    constructor(worldModel, worldService, worldView, constants) {\n        this.timeInterval = null;\n        this.currentTurn = 0;\n        this.worldModel = worldModel;\n        this.worldService = worldService;\n        this.worldView = worldView;\n        this.constants = constants;\n        this.initWorldRenderer();\n        this.initWorld();\n        this.worldView.draw(this.worldModel.world);\n        console.log(\"init\")\n    }\n\n    initWorldRenderer() {\n        this.worldView.bindListener(this.constants.events.startSelector, this.startPause.bind(this));\n        this.worldView.bindListener(this.constants.events.pauseSelector, this.startPause.bind(this));\n        this.worldView.bindListener(this.constants.events.stopSelector, this.stop.bind(this));\n        this.worldView.bindListener(this.constants.events.worldSelector, this.wordCellStatus.bind(this));\n        this.worldView.bindListener(this.constants.events.sizeSelector, this.setSize.bind(this));\n    }\n\n    initWorld() {\n        const world = this.worldService.initWorldArray(this.worldModel.world);\n    }\n\n    startPause() {\n        if (!this.worldService.areaSize) {\n            return;\n        }\n\n        if (this.timeInterval) {\n            clearInterval(this.timeInterval);\n            this.timeInterval = null;\n        } else {\n            this.timeInterval = setInterval(this.turn.bind(this), this.constants.timeInterval)\n        }\n    }\n\n    stop() {\n        if (this.timeInterval) {\n            clearInterval(this.timeInterval);\n            this.timeInterval = null;\n            this.currentTurn = 0;\n            this.worldView.updateCounter(this.currentTurn);\n            this.initWorld();\n            this.worldView.draw(this.worldModel.world);\n        }\n    }\n\n    turn() {\n        this.currentTurn++;\n        this.worldModel.world = this.worldService.recalculateWorld(this.worldModel.world);\n        this.worldView.updateCounter(this.currentTurn);\n        this.worldView.draw(this.worldModel.world);\n        // check if we need next turn\n        if (!this.worldService.isNeedNextTurn()) {\n            this.stop();\n        }\n    }\n\n    setSize(aEvent) {\n        const size = aEvent.target.value;\n        if (size && size > 0) {\n            this.worldService.areaSize = size;\n            this.initWorld();\n            this.worldView.draw(this.worldModel.world);\n        }\n    }\n\n    wordCellStatus(aData) {\n        // if world started\n        if (this.timeInterval) {\n            return;\n        }\n\n        const cell = this.worldModel.world[aData.positionY][aData.positionX];\n\n        if (cell) {\n            cell.isActive = !cell.isActive;\n        } else {\n            throw new Error(\"Invalid cell coordinates\")\n        }\n        this.worldView.redrawCell(aData.positionX, aData.positionY, cell.isActive)\n    }\n}\n\n//# sourceURL=webpack:///./app/controllers/worldController.js?");

/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/constants.js */ \"./app/constants/constants.js\");\n/* harmony import */ var _controllers_worldController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/worldController.js */ \"./app/controllers/worldController.js\");\n/* harmony import */ var _models_worldModel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/worldModel.js */ \"./app/models/worldModel.js\");\n/* harmony import */ var _views_worldView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/worldView.js */ \"./app/views/worldView.js\");\n/* harmony import */ var _views_DomRenderer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/DomRenderer.js */ \"./app/views/DomRenderer.js\");\n/* harmony import */ var _views_SvgRenderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/SvgRenderer */ \"./app/views/SvgRenderer.js\");\n/* harmony import */ var _services_worldService_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/worldService.js */ \"./app/services/worldService.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst worldModel = new _models_worldModel_js__WEBPACK_IMPORTED_MODULE_2__[\"WorldModel\"]();\r\nconst domRenderer = new _views_DomRenderer_js__WEBPACK_IMPORTED_MODULE_4__[\"DomRenderer\"]();\r\nconst svgRenderer = new _views_SvgRenderer__WEBPACK_IMPORTED_MODULE_5__[\"SvgRenderer\"]();\r\nconst worldView = new _views_worldView_js__WEBPACK_IMPORTED_MODULE_3__[\"WorldView\"]([domRenderer, svgRenderer]);\r\nconst worldService = new _services_worldService_js__WEBPACK_IMPORTED_MODULE_6__[\"WorldService\"](_constants_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"constants\"]);\r\nconst worldController = new _controllers_worldController_js__WEBPACK_IMPORTED_MODULE_1__[\"WorldController\"](worldModel, worldService, worldView, _constants_constants_js__WEBPACK_IMPORTED_MODULE_0__[\"constants\"]);\n\n//# sourceURL=webpack:///./app/index.js?");

/***/ }),

/***/ "./app/models/cellModel.js":
/*!*********************************!*\
  !*** ./app/models/cellModel.js ***!
  \*********************************/
/*! exports provided: CellModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CellModel\", function() { return CellModel; });\nclass CellModel {\r\n    constructor() {\r\n        this.isActive = false;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./app/models/cellModel.js?");

/***/ }),

/***/ "./app/models/worldModel.js":
/*!**********************************!*\
  !*** ./app/models/worldModel.js ***!
  \**********************************/
/*! exports provided: WorldModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WorldModel\", function() { return WorldModel; });\nclass WorldModel {\r\n    constructor() {\r\n        this.world = [];\r\n        this.isNextTurn = false;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./app/models/worldModel.js?");

/***/ }),

/***/ "./app/services/worldService.js":
/*!**************************************!*\
  !*** ./app/services/worldService.js ***!
  \**************************************/
/*! exports provided: WorldService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WorldService\", function() { return WorldService; });\n/* harmony import */ var _models_cellModel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/cellModel.js */ \"./app/models/cellModel.js\");\n\r\n\r\nclass WorldService{\r\n    constructor(constants) {\r\n        this.constants = constants;\r\n        this.areaSize = this.constants.defaultSize;\r\n        this.isNextTurn = false;\r\n    }\r\n\r\n    initWorldArray(aWorlArray = []) {\r\n        aWorlArray.length = 0;\r\n        for(let row = 0; row < this.areaSize; row++) {\r\n            aWorlArray[row] = [];\r\n            for (let cell = 0; cell < this.areaSize; cell++) {\r\n                aWorlArray[row][cell] = new _models_cellModel_js__WEBPACK_IMPORTED_MODULE_0__[\"CellModel\"]();\r\n            }\r\n        }\r\n    }\r\n\r\n    recalculateWorld(aWorlArray) {\r\n        let rechargedArray = [];\r\n        this.isNextTurn = false;\r\n        for(let row = 0; row < this.areaSize; row++) {\r\n            let rechargedRow = [];\r\n            for (let cell = 0; cell < this.areaSize; cell++) {\r\n                let rechargedCell;\r\n                const coordinates = {\r\n                    up: row - 1 < 0 ? this.areaSize - 1 : row - 1,\r\n                    down: row + 1 < this.areaSize ? row + 1 : 0,\r\n                    left: cell - 1 < 0 ? this.areaSize - 1 : cell - 1,\r\n                    right: cell + 1 < this.areaSize - 1 ? cell + 1 : 0\r\n                };\r\n\r\n                const activeNeighbours = [\r\n                    aWorlArray[coordinates.up][coordinates.left],\r\n                    aWorlArray[coordinates.up][cell],\r\n                    aWorlArray[coordinates.up][coordinates.right],\r\n                    aWorlArray[row][coordinates.right],\r\n                    aWorlArray[coordinates.down][coordinates.right],\r\n                    aWorlArray[coordinates.down][cell],\r\n                    aWorlArray[coordinates.down][coordinates.left],\r\n                    aWorlArray[row][coordinates.left],\r\n                ].filter(aCell => aCell.isActive);\r\n\r\n                if (aWorlArray[row][cell].isActive) {\r\n                    if (activeNeighbours.length === 2 || activeNeighbours.length === 3) {\r\n                    } else {\r\n                        rechargedCell = Object.assign({}, aWorlArray[row][cell]);\r\n                        rechargedCell.isActive = false;\r\n                        this.isNextTurn = true;\r\n                    }\r\n                } else if (activeNeighbours.length === 3) {\r\n                    rechargedCell = Object.assign({}, aWorlArray[row][cell]);\r\n                    rechargedCell.isActive = true;\r\n                    this.isNextTurn = true;\r\n                }\r\n\r\n                rechargedCell ?\r\n                    rechargedRow.push(rechargedCell):\r\n                    rechargedRow.push( aWorlArray[row][cell]);\r\n\r\n            }\r\n            rechargedArray.push(rechargedRow);\r\n        }\r\n\r\n        return rechargedArray;\r\n    }\r\n\r\n    isNeedNextTurn() {\r\n        return this.isNextTurn;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./app/services/worldService.js?");

/***/ }),

/***/ "./app/views/DomRenderer.js":
/*!**********************************!*\
  !*** ./app/views/DomRenderer.js ***!
  \**********************************/
/*! exports provided: DomRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DomRenderer\", function() { return DomRenderer; });\n/* harmony import */ var _baseRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseRenderer */ \"./app/views/baseRenderer.js\");\n\r\n\r\nclass DomRenderer extends _baseRenderer__WEBPACK_IMPORTED_MODULE_0__[\"BaseRenderer\"]{\r\n    constructor() {\r\n        super();\r\n        this.label = \"DomRenderer\";\r\n    }\r\n\r\n    draw(aWorlArray) {\r\n        this.drawArea = document.querySelector(\".world\");\r\n        this.drawArea.remove();\r\n        const grid = document.createElement(\"div\");\r\n        grid.classList.add(\"world\");\r\n        const size = aWorlArray.length;\r\n        const gridLength = getComputedStyle(grid).width;\r\n        grid.style.gridTemplateColumns= `repeat(${size}, 1Fr)`;\r\n        for (let rowNum = 0; rowNum < size; rowNum++) {\r\n            for (let colNum = 0; colNum < size; colNum++) {\r\n                let cell = document.createElement(\"div\");\r\n                cell.className = \"gridsquare\";\r\n                cell.dataset.positionX = colNum;\r\n                cell.dataset.positionY = rowNum;\r\n                if (aWorlArray[rowNum] && aWorlArray[rowNum][colNum] && aWorlArray[rowNum][colNum].isActive) {\r\n                    cell.classList.add(\"active\")\r\n                }\r\n                grid.appendChild(cell);\r\n            }\r\n        }\r\n\r\n        this.container.appendChild(grid);\r\n    }\r\n\r\n    redrawCell(aX, aY, aStatus) {\r\n        const element = document.querySelector(`[data-position-x='${aX}'][data-position-y='${aY}']`);\r\n\r\n        if (element) {\r\n            aStatus ?\r\n                element.classList.add(\"active\") :\r\n                element.classList.remove(\"active\")\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./app/views/DomRenderer.js?");

/***/ }),

/***/ "./app/views/SvgRenderer.js":
/*!**********************************!*\
  !*** ./app/views/SvgRenderer.js ***!
  \**********************************/
/*! exports provided: SvgRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SvgRenderer\", function() { return SvgRenderer; });\n/* harmony import */ var _baseRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseRenderer */ \"./app/views/baseRenderer.js\");\n\r\n\r\nclass SvgRenderer extends _baseRenderer__WEBPACK_IMPORTED_MODULE_0__[\"BaseRenderer\"]{\r\n    constructor() {\r\n        super();\r\n        this.label = \"SvgRenderer\";\r\n\r\n        document.createSvg = function(tagName) {\r\n            const svgNS = \"http://www.w3.org/2000/svg\";\r\n            return this.createElementNS(svgNS, tagName);\r\n        };\r\n    }\r\n\r\n    draw(aWorlArray) {\r\n        const length = aWorlArray.length;\r\n        this.drawArea = document.querySelector(\".world\");\r\n        const widthInPx = getComputedStyle(this.drawArea)\r\n            .getPropertyValue('width')\r\n            .match(/\\d+/);\r\n        this.drawArea.remove();\r\n        const svg = document.createSvg(\"svg\");\r\n        svg.classList.add(\"world\");\r\n        svg.setAttribute(\"width\", widthInPx);\r\n        svg.setAttribute(\"height\", widthInPx);\r\n        //svg.setAttribute(\"viewBox\", [0, 0, numberPerSide * size, numberPerSide * size].join(\" \"));\r\n\r\n        for (let rowNum = 0; rowNum < length; rowNum++) {\r\n            for (let colNum = 0; colNum < length; colNum++) {\r\n                const g = document.createSvg(\"g\");\r\n                const size = widthInPx / length;\r\n                g.setAttribute(\"transform\", [\"translate(\", rowNum * size, \",\", colNum * size, \")\"].join(\"\"));\r\n                const box = document.createSvg(\"rect\");\r\n                box.classList.add(\"gridsquare\");\r\n                box.setAttribute(\"width\", size);\r\n                box.setAttribute(\"height\", size);\r\n                box.dataset.positionX = colNum;\r\n                box.dataset.positionY = rowNum;\r\n\r\n                if (aWorlArray[rowNum] && aWorlArray[rowNum][colNum] && aWorlArray[rowNum][colNum].isActive) {\r\n                    box.classList.add(\"active\")\r\n                }\r\n\r\n                g.appendChild(box);\r\n                svg.appendChild(g);\r\n            }\r\n        }\r\n\r\n        this.container.appendChild(svg);\r\n\r\n    }\r\n}\n\n//# sourceURL=webpack:///./app/views/SvgRenderer.js?");

/***/ }),

/***/ "./app/views/baseRenderer.js":
/*!***********************************!*\
  !*** ./app/views/baseRenderer.js ***!
  \***********************************/
/*! exports provided: BaseRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseRenderer\", function() { return BaseRenderer; });\nclass BaseRenderer {\r\n    constructor() {\r\n        this.container = document.querySelector(\".container\");\r\n    }\r\n\r\n    redrawCell(aX, aY, aStatus) {\r\n        const element = document.querySelector(`[data-position-x='${aX}'][data-position-y='${aY}']`);\r\n\r\n        if (element) {\r\n            aStatus ?\r\n                element.classList.add(\"active\") :\r\n                element.classList.remove(\"active\")\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./app/views/baseRenderer.js?");

/***/ }),

/***/ "./app/views/worldView.js":
/*!********************************!*\
  !*** ./app/views/worldView.js ***!
  \********************************/
/*! exports provided: WorldView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WorldView\", function() { return WorldView; });\nclass WorldView {\r\n    constructor([...renderers]) {\r\n        this.renderers = [...renderers];\r\n        this.currentRenderer = this.renderers[0];\r\n        const selector = document.querySelector(\"#select\");\r\n        this.renderers.forEach((aRenderer) => {\r\n            const opt = document.createElement('option');\r\n            opt.value = aRenderer.label;\r\n            opt.innerHTML = aRenderer.label;\r\n            selector.appendChild(opt);\r\n        });\r\n\r\n        selector.addEventListener(\"click\", (e) => {\r\n            this.currentRenderer = this.renderers.find(aRenderer => aRenderer.label === e.target.value);\r\n            if(!this.currentRenderer) {\r\n                throw new Error(\"Invalid renderer \" +e.target.value);\r\n            }\r\n        })\r\n    }\r\n\r\n    draw(aWorlArray) {\r\n        this.currentRenderer.draw(aWorlArray)\r\n    }\r\n\r\n    redrawCell(aX, aY, aStatus) {\r\n        this.currentRenderer.redrawCell(aX, aY, aStatus)\r\n    }\r\n\r\n    bindListener(aSelector, aHandler) {\r\n        const element = document.querySelector(aSelector);\r\n        if (!element) {\r\n            throw new Error(\"Invalid element for binding handler\")\r\n        } else if (typeof aHandler !== \"function\") {\r\n            throw new Error(\"Invalid handler function\")\r\n        }\r\n\r\n        if (element.type === \"number\") {\r\n            element.addEventListener(\"input\", (e) => {\r\n                this.atachHandler(aHandler, e)\r\n            });\r\n        } else if (element.tagName === \"SELECT\") {\r\n            element.addEventListener(\"change\", (e) => {\r\n                this.atachHandler(aHandler, e.target.dataset)\r\n            });\r\n        } else {\r\n            element.addEventListener(\"click\", (e) => {\r\n                this.atachHandler(aHandler, e.target.dataset)\r\n            });\r\n        }\r\n    }\r\n\r\n    atachHandler(aHandler, aEvent) {\r\n        aHandler(aEvent)\r\n    }\r\n\r\n    updateCounter(aCounter) {\r\n        document.querySelector(\".counter\").textContent = aCounter;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./app/views/worldView.js?");

/***/ })

/******/ });