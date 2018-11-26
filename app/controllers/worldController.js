export class WorldController {
    constructor(worldModel, worldService, worldView, constants) {
        this.timeInterval = null;
        this.pause = false;
        this.currentTurn = 0;
        this.worldModel = worldModel;
        this.worldService = worldService;
        this.worldView = worldView;
        this.constants = constants;
        this.initWorld();
        this.initControlsListeners();
        this.initWorldListeners();
    }

    initControlsListeners() {
        this.worldView.bindListener(this.constants.events.startSelector, this.startPause.bind(this));
        this.worldView.bindListener(this.constants.events.pauseSelector, this.startPause.bind(this));
        this.worldView.bindListener(this.constants.events.stopSelector, this.stop.bind(this));
        this.worldView.bindListener(this.constants.events.worldSelector, this.initWorld.bind(this));
        this.worldView.bindListener(this.constants.events.sizeSelector, this.setSize.bind(this));
    }

    initWorldListeners() {
        this.worldView.bindListener(this.constants.events.worldContainer, this.wordCellStatus.bind(this));
    }

    initWorld() {
        this.worldService.initWorldArray(this.worldModel.world);
        this.worldView.draw(this.worldModel.world);
        this.initWorldListeners();
    }

    startPause() {
        if (!this.worldService.areaSize) {
            return;
        }

        if (this.timeInterval) {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        } else {
            this.timeInterval = setInterval(this.turn.bind(this), this.constants.timeInterval)
        }
    }

    stop() {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
            this.currentTurn = 0;
            this.worldView.updateCounter(this.currentTurn);
            this.initWorld();
            this.worldView.draw(this.worldModel.world);
            this.initWorldListeners();
        }
    }

    turn() {
        this.currentTurn++;
        this.worldModel.world = this.worldService.recalculateWorld(this.worldModel.world);
        this.worldView.updateCounter(this.currentTurn);
        this.worldView.draw(this.worldModel.world);
        // check if we need next turn
        if (!this.worldService.isNeedNextTurn()) {
            this.stop();
        }
    }

    setSize(aEvent) {
        const size = aEvent.target.value;
        if (size && size > 0) {
            this.worldService.areaSize = size;
            this.initWorld();
            this.worldView.draw(this.worldModel.world);
            this.initWorldListeners();
        }
    }

    wordCellStatus(aData) {
        // if world started
        if (this.timeInterval) {
            return;
        }

        const cell = this.worldModel.world[aData.positionY][aData.positionX];

        if (cell) {
            cell.isActive = !cell.isActive;
        } else {
            throw new Error("Invalid cell coordinates")
        }
        this.worldView.redrawCell(aData.positionX, aData.positionY, cell.isActive);
    }
}