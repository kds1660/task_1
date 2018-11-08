export class DomRenderer {
    constructor() {
        this.label = "DomRenderer";
        this.container = document.querySelector(".container");
    }

    draw(aWorlArray) {
        this.drawArea = document.querySelector(".world");
        this.drawArea.remove();
        const grid = document.createElement("div");
        grid.classList.add("world");
        const size = aWorlArray.length;
        const gridLength = getComputedStyle(grid).width;
        grid.style.gridTemplateColumns= `repeat(${size}, 1Fr)`;
        for (let rowNum = 0; rowNum < size; rowNum++) {
            for (let colNum = 0; colNum < size; colNum++) {
                let cell = document.createElement("div");
                cell.className = "gridsquare";
                cell.dataset.positionX = colNum;
                cell.dataset.positionY = rowNum;
                if (aWorlArray[rowNum] && aWorlArray[rowNum][colNum] && aWorlArray[rowNum][colNum].isActive) {
                    cell.classList.add("active")
                }
                grid.appendChild(cell);
            }
        }

        this.container.appendChild(grid);
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