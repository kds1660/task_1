export class BaseRenderer {
    constructor() {
        this.container = document.querySelector(".container");
    }

    redrawCell(aX, aY, aStatus) {
        const element = document.querySelector(`[data-position-x='${aX}'][data-position-y='${aY}']`);

        if (element) {
            aStatus ?
                element.classList.add("active") :
                element.classList.remove("active")
        }
    }
}