import {Pixel, Vec2} from "./types";

class Renderer {
	private front_canvas: HTMLCanvasElement;
	private back_canvas: HTMLCanvasElement;
	private ctxt: CanvasRenderingContext2D;

	private background_color: string;

	private width: number;
	private height: number;

	private init_canvas = (canvas_id: string) => {
		const canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
		if (!canvas) throw new Error(`Canvas with id=${canvas_id} wasn't found!`);

		canvas.width = this.width;
		canvas.height = this.height;
		canvas.style.width = `${this.width}px`;
		canvas.style.height = `${this.height}px`;

		return canvas;
	};

	constructor(canvas_id1: string, canvas_id2: string, background_color: string, width: number, height: number) {
		this.background_color = background_color;
		this.width = width;
		this.height = height;
		this.front_canvas = this.init_canvas(canvas_id1);
		this.back_canvas = this.init_canvas(canvas_id2);
		this.ctxt = this.back_canvas.getContext("2d");
		this.back_canvas.style.opacity = "0";
	}

	private set_color = (color: string) => {
		if (color[0] !== "#") color = `#${color}`;
		this.ctxt.fillStyle = color;
	};

	private to_image_data = (pixels: Pixel[][]): ImageData => {
		const colors: number[] = [];

		pixels.flat(1).forEach(pixel => {
			colors.push(...pixel);
			if (pixel.length === 3) colors.push(255);
		});

		return new ImageData(new Uint8ClampedArray(colors), pixels[0].length, pixels.length);
	};

	swap = () => {
		const temp = this.front_canvas;
		this.front_canvas = this.back_canvas;
		this.back_canvas = temp;

		this.ctxt = this.back_canvas.getContext("2d");

		this.front_canvas.style.opacity = "1";
		this.back_canvas.style.opacity = "0";
	};

	clear = () => {
		this.set_color(this.background_color);
		this.ctxt.fillRect(0, 0, this.width, this.height);
	};

	draw = (pixels: Pixel[][], offset: Vec2 = [0, 0]) => this.ctxt.putImageData(this.to_image_data(pixels), ...offset);

	circle = (pos: Vec2, radius: number, color: string) => {
		this.set_color(color);
		this.ctxt.beginPath();
		this.ctxt.ellipse(pos[0], pos[1], radius, radius, 0, 0, 2 * Math.PI);
		this.ctxt.fill();
	};
}

export default Renderer;