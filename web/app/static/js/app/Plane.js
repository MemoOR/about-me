import { Vector3 } from "/static/js/libs/Threejs/math/Vector3.js";
import { GLTFLoader } from "/static/js/libs/Threejs/GLTFLoader.js";

class Plane {
	constructor(game) {
		this.assetsPath = game.assetsPath;
		this.loadingBar = game.loadingBar;
		this.game = game;
		this.scene = game.scene;
		this.load();
		this.tmpPos = new Vector3();
	}

	get position() {
		if (this.plane !== undefined) this.plane.getWorldPosition(this.tmpPos);
		return this.tmpPos;
	}

	set visible(mode) {
		this.plane.visible = mode;
	}

	load() {
		const loader = new GLTFLoader().setPath(
			`${this.assetsPath}models/plane/`
		);
		this.ready = false;

		// Load a glTF resource
		loader.load(
			// resource URL
			"microplane.glb",
			// called when the resource is loaded
			(gltf) => {
				this.scene.add(gltf.scene);
				this.plane = gltf.scene;

				this.velocity = new Vector3(0, 0, 0.1);

				this.propeller = this.plane.getObjectByName("propeller");

				this.ready = true;
			},
			// called while loading is progressing
			(xhr) => {
				this.loadingBar.update("plane", xhr.loaded, xhr.total);
			},
			// called when loading has errors
			(err) => {
				console.error(err);
			}
		);
	}

	update(time) {
		if (this.propeller !== undefined) this.propeller.rotateZ(1);

		if (this.game.active) {
			if (this.game.spaceKey) {
				this.velocity.y += 0.005;
			} else {
				this.velocity.y -= 0.005;
			}
			this.velocity.z += 0.0001;
			// avoid move in x for now as it has a bug that takes the plane out of the road
			// this.plane.rotation.set(0, 0, Math.sin(time * 3) * 0.2, "XYZ");
			this.plane.translateZ(this.velocity.z);
			this.plane.translateY(this.velocity.y);
		} else {
			// avoid move in x for now as it has a bug that takes the plane out of the road
			// this.plane.rotation.set(0, 0, Math.sin(time * 3) * 0.2, "XYZ");
			this.plane.position.y = Math.cos(time) * 1.5;
		}
	}

	reset() {
		this.plane.position.set(0, 0, 0);
		this.velocity.set(0, 0, 0.1);
	}
}

export { Plane };
