import {constants} from "./constants/constants.js";
import {WorldController} from "./controllers/worldController.js"
import {WorldModel} from "./models/worldModel.js"
import {WorldView} from "./views/worldView.js"
import {DomRenderer} from "./views/DomRenderer.js"
import {WorldService} from "./services/worldService.js"

const worldModel = new WorldModel();
const domRenderer = new DomRenderer();
const worldView = new WorldView([domRenderer]);
const worldService = new WorldService(constants);
const worldController = new WorldController(worldModel, worldService, worldView, constants);