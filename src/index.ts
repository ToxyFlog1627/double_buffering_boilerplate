import Renderer from "./renderer";

const WIDTH = 800;
const HEIGHT = 600;
const BACKGROUND_COLOR = "#2E3440";

let renderer!: Renderer;

const init = () => {
	document.querySelector("body").style.background = BACKGROUND_COLOR;
	renderer = new Renderer("canvas1", "canvas2", BACKGROUND_COLOR, WIDTH, HEIGHT);
};

const update = () => {
	renderer.clear();
	// draw
	renderer.swap();

	requestAnimationFrame(update);
};

init();
update();
