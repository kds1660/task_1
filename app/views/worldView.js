export class WorldView {
    constructor([...renderers]) {
        this.renderers = [...renderers];
        this.currentRenderer = this.renderers[0];
        const selector = document.querySelector("#select");
        this.renderers.forEach((aRenderer) => {
            const opt = document.createElement('option');
            opt.value = aRenderer.label;
            opt.innerHTML = aRenderer.label;
            selector.appendChild(opt);
        });

        selector.addEventListener("click", (e) => {
            this.currentRenderer = this.renderers.find(aRenderer => aRenderer.label === e.target.value);
            if(!this.currentRenderer) {
                throw new Error("Invalid renderer " +e.target.value);
            }
        })
    }

    draw(aWorlArray) {
        this.currentRenderer.draw(aWorlArray)
    }

    redrawCell(aX, aY, aStatus) {
        this.currentRenderer.redrawCell(aX, aY, aStatus)
    }

    bindListener(aSelector, aHandler) {
        const element = document.querySelector(aSelector);
        if (!element) {
            throw new Error("Invalid element for binding handler")
        } else if (typeof aHandler !== "function") {
            throw new Error("Invalid handler function")
        }

        if (element.type === "number") {
            element.addEventListener("input", (e) => {
                this.atachHandler(aHandler, e)
            });
        } else if (element.tagName === "SELECT") {
            element.addEventListener("change", (e) => {
                this.atachHandler(aHandler, e.target.dataset)
            });
        } else {
            element.addEventListener("click", (e) => {
                this.atachHandler(aHandler, e.target.dataset)
            });
        }
    }

    atachHandler(aHandler, aEvent) {
        aHandler(aEvent)
    }

    updateCounter(aCounter) {
        document.querySelector(".counter").textContent = aCounter;
    }
}