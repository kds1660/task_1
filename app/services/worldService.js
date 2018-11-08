import {CellModel} from "../models/cellModel.js";

export class WorldService{
    constructor(constants) {
        this.constants = constants;
        this.areaSize = this.constants.defaultSize;
        this.isNextTurn = false;
    }

    initWorldArray(aWorlArray = []) {
        aWorlArray.length = 0;
        for(let row = 0; row < this.areaSize; row++) {
            aWorlArray[row] = [];
            for (let cell = 0; cell < this.areaSize; cell++) {
                aWorlArray[row][cell] = new CellModel();
            }
        }
    }

    recalculateWorld(aWorlArray) {
        this.isNextTurn = false;
        for(let row = 0; row < this.areaSize; row++) {
            for (let cell = 0; cell < this.areaSize; cell++) {
                const coordinates = {
                    up: row - 1 < 0 ? this.areaSize - 1 : row - 1,
                    down: row + 1 < this.areaSize ? row + 1 : 0,
                    left: cell - 1 < 0 ? this.areaSize - 1 : cell - 1,
                    right: cell + 1 < this.areaSize - 1 ? cell + 1 : 0
                };

                const activeNeibours = [
                    aWorlArray[coordinates.up][coordinates.left],
                    aWorlArray[coordinates.up][cell],
                    aWorlArray[coordinates.up][coordinates.right],
                    aWorlArray[row][coordinates.right],
                    aWorlArray[coordinates.down][coordinates.right],
                    aWorlArray[coordinates.down][cell],
                    aWorlArray[coordinates.down][coordinates.left],
                    aWorlArray[row][coordinates.left],
                ].filter(aCell => aCell.isActive);

                if (aWorlArray[row][cell].isActive) {
                    if (activeNeibours.length < 2 || activeNeibours.length > 3) {
                        aWorlArray[row][cell].isWillChanged = true;
                        this.isNextTurn = true;
                    }
                } else if (activeNeibours.length === 3) {
                    aWorlArray[row][cell].isWillChanged = true;
                    this.isNextTurn = true;
                }

            }
        }
        console.log(this.isNextTurn)
    }

    reChargeWorldForNextCalculation(aWorlArray) {
        for(let row = 0; row < this.areaSize; row++) {
            for (let cell = 0; cell < this.areaSize; cell++) {
                const cellObject = aWorlArray[row][cell];
                if (cellObject.isWillChanged) {
                    cellObject.isWillChanged = false;
                    cellObject.isActive = !cellObject.isActive;
                }
            }
        }
    }

    isNeedNextTurn() {
        return this.isNextTurn;
    }
}