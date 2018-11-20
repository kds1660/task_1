import {BaseRenderer} from "./baseRenderer"

export class SvgRenderer extends BaseRenderer{
    constructor() {
        super();
        this.label = "SvgRenderer";

        document.createSvg = function(tagName) {
            const svgNS = "http://www.w3.org/2000/svg";
            return this.createElementNS(svgNS, tagName);
        };
    }

    draw(aWorlArray) {
        const length = aWorlArray.length;
        this.drawArea = document.querySelector(".world");
        const widthInPx = getComputedStyle(this.drawArea)
            .getPropertyValue('width')
            .match(/\d+/);
        this.drawArea.remove();
        const svg = document.createSvg("svg");
        svg.classList.add("world");
        svg.setAttribute("width", widthInPx);
        svg.setAttribute("height", widthInPx);
        //svg.setAttribute("viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));

        for (let rowNum = 0; rowNum < length; rowNum++) {
            for (let colNum = 0; colNum < length; colNum++) {
                const g = document.createSvg("g");
                const size = widthInPx / length;
                g.setAttribute("transform", ["translate(", rowNum * size, ",", colNum * size, ")"].join(""));
                const box = document.createSvg("rect");
                box.classList.add("gridsquare");
                box.setAttribute("width", size);
                box.setAttribute("height", size);
                box.dataset.positionX = colNum;
                box.dataset.positionY = rowNum;

                if (aWorlArray[rowNum] && aWorlArray[rowNum][colNum] && aWorlArray[rowNum][colNum].isActive) {
                    box.classList.add("active")
                }

                g.appendChild(box);
                svg.appendChild(g);
            }
        }

        this.container.appendChild(svg);

    }
}