const Cellmodel = require('../app/models/cellModel').default;
const WorldModel = require('../app/models/worldModel').default;
import { expect } from 'chai';


describe("Models create", () => {
    it("cell created", () => {
        const newCell = new Cellmodel();
        expect(newCell.isActive).to.equal(false);
    });

    it("world created", () => {
        const newWorld = new WorldModel();
        expect(newWorld.isNextTurn).to.equal(false);
        expect(newWorld.world).to.be.an('array')
    });
});
