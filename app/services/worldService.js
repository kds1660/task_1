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
        let rechargedArray = [];
        this.isNextTurn = false;
        for(let row = 0; row < this.areaSize; row++) {
            let rechargedRow = [];
            for (let cell = 0; cell < this.areaSize; cell++) {
                let rechargedCell;
                const coordinates = {
                    up: row - 1 < 0 ? this.areaSize - 1 : row - 1,
                    down: row + 1 < this.areaSize ? row + 1 : 0,
                    left: cell - 1 < 0 ? this.areaSize - 1 : cell - 1,
                    right: cell + 1 < this.areaSize - 1 ? cell + 1 : 0
                };

                const activeNeighbours = [
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
                    if (activeNeighbours.length === 2 || activeNeighbours.length === 3) {
                    } else {
                        rechargedCell = Object.assign({}, aWorlArray[row][cell]);
                        rechargedCell.isActive = false;
                        this.isNextTurn = true;
                    }
                } else if (activeNeighbours.length === 3) {
                    rechargedCell = Object.assign({}, aWorlArray[row][cell]);
                    rechargedCell.isActive = true;
                    this.isNextTurn = true;
                }

                rechargedCell ?
                    rechargedRow.push(rechargedCell):
                    rechargedRow.push( aWorlArray[row][cell]);

            }
            rechargedArray.push(rechargedRow);
        }

        return rechargedArray;
    }

    isNeedNextTurn() {
        return this.isNextTurn;
    }
}