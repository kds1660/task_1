import {constants} from "../app/constants/constants.js";
import {WorldController} from "../app/controllers/worldController.js"
import {WorldModel} from "../app/models/worldModel.js"
import {WorldView} from "../app/views/worldView.js"
import {DomRenderer} from "../app/views/DomRenderer.js"
import {SvgRenderer} from "../app/views/SvgRenderer";
import {WorldService} from "../app/services/worldService.js"
import {expect} from "chai";
import {JSDOM} from 'jsdom';
const { document } = (new JSDOM('')).window;
global.document = document;

describe("Controller tests", () => {
    it("Controller created", () => {
        console.log(document)
        const worldModel = new WorldModel();
        const domRenderer = new DomRenderer();
        const svgRenderer = new SvgRenderer();
        const worldView = new WorldView([domRenderer, svgRenderer]);
        const worldService = new WorldService(constants);
        const worldController = new WorldController(worldModel, worldService, worldView, constants);
        expect(worldController.currentTurn).to.be.equal(0)
    });
});
