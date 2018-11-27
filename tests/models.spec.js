import {WorldModel} from "../app/models/worldModel.js";
import {CellModel} from "../app/models/cellModel";
import { expect } from 'chai';


describe("Models create", () => {
    it("world created", () => {
        const newWorld = new WorldModel();
        expect(newWorld.isNextTurn).to.equal(false);
        expect(newWorld.world).to.be.an('array')
    });

    it("cell created", () => {
        const newCell = new CellModel();
        expect(newCell.isActive).to.equal(false);
    });
});
