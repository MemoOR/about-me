import * as THREE from "/static/js/libs/Threejs/three.module.js";
import { WEBGL } from "/static/js/libs/Threejs/webGL.js";
import { LoadingBar } from "/static/js/libs/LoadingBar.js";
import { RGBELoader } from "/static/js/libs/Threejs/RGBELoader.js";
import { Plane } from "./Plane.js";
import { Obstacles } from "./Obstacles.js";
import { SFX } from "/static/js/libs/SFX.js";

class Game {
	constructor() {
		// *Load canvas for 3D
		const canvas = document.querySelector("canvas.webgl");
		const wrapper = document.getElementById("mainDiv");

		this.clock = new THREE.Clock();

		this.assetsPath = "/static/assets/";

		// *Read window properties
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
			pixelratio: window.devicePixelRatio,
		};

		// *Add cameras
		this.camera = new THREE.PerspectiveCamera(
			70,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		);
		this.camera.position.set(-5, 0, -5);
		this.camera.lookAt(0, 0, 6);

		this.cameraController = new THREE.Object3D();
		this.cameraController.add(this.camera);
		this.cameraTarget = new THREE.Vector3(0, 0, 6);

		// *Create scenes
		this.scene = new THREE.Scene();
		this.scene.add(this.cameraController);

		// *Add Lights
		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		this.scene.add(ambient);

		const light = new THREE.DirectionalLight();
		light.position.set(0.2, 1, 1);
		this.scene.add(light);

		this.loadingBar = new LoadingBar();
		this.loadingBar.visible = false;

		// *Renderer properties
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true,
		});

		this.renderer.setPixelRatio(this.sizes.pixelratio);
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.setAnimationLoop(this.render.bind(this));
		this.setEnvironment();

		this.load();

		document.addEventListener("keydown", this.keyDown.bind(this));
		document.addEventListener("keyup", this.keyUp.bind(this));

		document.addEventListener("touchstart", this.mouseDown.bind(this));
		document.addEventListener("touchend", this.mouseUp.bind(this));

		document.addEventListener("mousedown", this.mouseDown.bind(this));
		document.addEventListener("mouseup", this.mouseUp.bind(this));

		this.spaceKey = false;
		this.active = false;

		const button = document.getElementById("playBtn");
		button.addEventListener("click", this.startGame.bind(this));

		window.addEventListener("resize", this.resize.bind(this));
	}

	startGame() {
		const gameover = document.getElementById("gameover");
		const instructions = document.getElementById("instructions");
		const button = document.getElementById("playBtn");

		gameover.style.display = "none";
		instructions.style.display = "none";
		button.style.display = "none";

		this.score = 0;
		this.bonusScore = 0;
		this.lives = 3;

		let elm = document.getElementById("score");
		elm.innerHTML = this.score;

		elm = document.getElementById("lives");
		elm.innerHTML = this.lives;

		this.plane.reset();
		this.obstacles.reset();

		this.active = true;

		this.sfx.play("engine");
	}

	mouseDown(evt) {
		this.spaceKey = true;
	}

	mouseUp(evt) {
		this.spaceKey = false;
	}

	keyDown(evt) {
		switch (evt.keyCode) {
			case 32:
				this.spaceKey = true;
				break;
		}
	}

	keyUp(evt) {
		switch (evt.keyCode) {
			case 32:
				this.spaceKey = false;
				break;
		}
	}

	gameOver() {
		this.active = false;

		const gameover = document.getElementById("gameover");
		const button = document.getElementById("playBtn");

		gameover.style.display = "block";
		button.style.display = "block";

		this.sfx.stopAll();
		this.sfx.play("gameover");
	}

	incScore() {
		this.score++;
		const elm = document.getElementById("score");
		if (this.score % 3 == 0) {
			this.bonusScore += 3;
			this.sfx.play("bonus");
		} else {
			this.sfx.play("gliss");
		}

		elm.innerHTML = this.score + this.bonusScore;
	}

	decLives() {
		this.lives--;

		const elm = document.getElementById("lives");
		elm.innerHTML = this.lives;

		if (this.lives == 0) setTimeout(this.gameOver.bind(this), 1200);

		this.sfx.play("explosion");
	}

	resize() {
		// Update sizes
		this.sizes.width = window.innerWidth;
		this.sizes.height = window.innerHeight;

		// Update camera
		this.camera.aspect = this.sizes.width / this.sizes.height;
		this.camera.updateProjectionMatrix();

		// Update renderer
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(this.sizes.pixelratio, 2));
	}

	setEnvironment() {
		const loader = new RGBELoader().setPath(this.assetsPath);
		const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
		pmremGenerator.compileEquirectangularShader();

		loader.load(
			"hdr/venice_sunset_1k.hdr",
			(texture) => {
				var envMap =
					pmremGenerator.fromEquirectangular(texture).texture;

				// this.scene.background = envMap;
				this.scene.environment = envMap;

				texture.dispose();
				pmremGenerator.dispose();
			},
			undefined,
			(err) => {
				console.error(err.message);
			}
		);
	}

	load() {
		this.loading = true;
		this.loadingBar.visible = true;
		this.loadSkybox();
		this.plane = new Plane(this);
		this.obstacles = new Obstacles(this);

		this.loadSFX();
	}

	loadSFX() {
		this.sfx = new SFX(this.camera, this.assetsPath + "models/plane/");

		this.sfx.load("explosion");
		this.sfx.load("engine", true);
		this.sfx.load("gliss");
		this.sfx.load("gameover");
		this.sfx.load("bonus");
	}

	loadSkybox() {
		this.scene.background = new THREE.CubeTextureLoader()
			.setPath(`${this.assetsPath}models/plane/paintedsky/`)
			.load(
				["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
				() => {
					this.renderer.setAnimationLoop(this.render.bind(this));
				},
				undefined,
				(err) => {
					console.log(err);
				}
			);
	}

	updateCamera() {
		this.cameraController.position.copy(this.plane.position);
		this.cameraController.position.y = 0;
		this.cameraTarget.copy(this.plane.position);
		this.cameraTarget.z += 6;
		this.camera.lookAt(this.cameraTarget);
	}

	render() {
		if (this.loading) {
			if (this.plane.ready && this.obstacles.ready) {
				this.loading = false;
				this.loadingBar.visible = false;
				const instructions = document.getElementById("instructions");
				const button = document.getElementById("playBtn");
				const info = document.getElementById("info");

				instructions.style.display = "inline";
				button.style.display = "inline";
				info.style.display = "inline";
			} else {
				return;
			}
		}
		const dt = this.clock.getDelta();
		const time = this.clock.getElapsedTime();

		this.plane.update(time);

		if (this.active) {
			this.obstacles.update(this.plane.position, dt);
		}

		this.updateCamera();
		this.renderer.render(this.scene, this.camera);
	}
}

export let App3D;

if (WEBGL.isWebGLAvailable()) {
	App3D = Game;
} else {
	const warning = WEBGL.getWebGLErrorMessage();
	document.getElementById("container").appendChild(warning);
}
