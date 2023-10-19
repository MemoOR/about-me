import * as THREE from "/static/js/libs/Threejs/three.module.js";
import { WEBGL } from "/static/js/libs/Threejs/webGL.js";
import { LoadingBar } from "/static/js/libs/LoadingBar.js";
import { GLTFLoader } from "/static/js/libs/Threejs/GLTFLoader.js";
import { DRACOLoader } from "/static/js/libs/Threejs/DRACOLoader.js";
import { RGBELoader } from "/static/js/libs/Threejs/RGBELoader.js";
import { OrbitControls } from "/static/js/libs/Threejs/OrbitControls.js";

class App {
	constructor() {
		// *Load canvas for 3D
		const canvas = document.querySelector("canvas.webgl");

		this.clock = new THREE.Clock();

		// *Read window properties
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
			pixelratio: window.devicePixelRatio,
		};

		// *Add cameras
		this.camera = new THREE.PerspectiveCamera(
			45,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		);
		this.camera.position.set(0, 2, 3);

		// *Create scenes
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xaaaaaa);

		// *Add Lights
		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
		this.scene.add(ambient);

		const light = new THREE.DirectionalLight();
		light.position.set(0.2, 1, 1);
		this.scene.add(light);

		// *Geometries
		const geometry = new THREE.TorusGeometry(1, 0.5, 50, 200);

		const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

		this.sphere = new THREE.Mesh(geometry, material);
		// this.scene.add(this.sphere);

		// *Load GLTF files
		this.loadingBar = new LoadingBar();
		this.loadGLTF();

		// *Renderer properties
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
		});

		this.renderer.setPixelRatio(this.sizes.pixelratio);
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.setAnimationLoop(this.render.bind(this));
		// this.setEnvironment();

		// *Orbit Controls
		new OrbitControls(this.camera, this.renderer.domElement);
		// Resize renderer
		window.addEventListener("resize", this.resize.bind(this));
	}

	setEnvironment() {
		const loader = new RGBELoader().setDataType(THREE.UnsignedByteType);
		const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
		pmremGenerator.compileEquirectangularShader();
		const self = this;
		loader.setPath("/static/assets/hdr/").load(
			"venice_sunset_1k.hdr",
			(texture) => {
				var envMap =
					pmremGenerator.fromEquirectangular(texture).texture;

				self.scene.background = envMap;
				self.scene.environment = envMap;

				texture.dispose();
				pmremGenerator.dispose();
			},
			undefined,
			(err) => {
				console.error("An error occurred setting the environment");
			}
		);
	}

	loadGLTF() {
		const loader = new GLTFLoader().setPath("/static/assets/models/");

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("/static/js/libs/Threejs/draco/");
		loader.setDRACOLoader(dracoLoader);

		this.loadingBar.visible = true;

		loader.load(
			"Eve/eve.glb",
			(gltf) => {
				this.scene.add(gltf.scene);
				this.eve = gltf.scene;

				this.mixer = new THREE.AnimationMixer(gltf.scene);

				this.animations = {};

				gltf.animations.forEach((animation) => {
					this.animations[animation.name.toLowerCase()] = animation;
				});

				this.actionName = "";
				this.newAnim();

				this.loadingBar.visible = false;
				this.renderer.setAnimationLoop(this.render.bind(this));
			},
			(xhr) => {
				this.loadingBar.progress = xhr.loaded / xhr.total;
			},
			(err) => {
				console.error(err);
			}
		);
	}

	newAnim() {
		const keys = Object.keys(this.animations);

		let index;

		do {
			index = Math.floor(Math.random() * keys.length);
		} while (keys[index] == this.actionName);

		this.actionChange = keys[index];

		setTimeout(this.newAnim.bind(this), 3000);
	}

	set actionChange(name) {
		const clip = this.animations[name];

		if (clip !== undefined) {
			const action = this.mixer.clipAction(clip);

			action.reset();

			this.actionName = name;
			if (this.actionName === "death") {
				action.setLoop(THREE.LoopOnce);
				// action.clampWhenFinished = true;
			}

			action.play();
			if (this.curAction) {
				if (this.actionName === "death") {
					this.curAction.enabled = false;
				} else {
					this.curAction.crossFadeTo(action, 0.5);
				}
			}

			this.curAction = action;
		}
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

	render() {
		const dt = this.clock.getDelta();

		if (this.mixer !== undefined) this.mixer.update(dt);

		this.renderer.render(this.scene, this.camera);
	}
}

export let App3D;

if (WEBGL.isWebGLAvailable()) {
	App3D = App;
} else {
	const warning = WEBGL.getWebGLErrorMessage();
	document.getElementById("container").appendChild(warning);
}
