import * as THREE from "three";
import { Engine } from "plateau";
import TextToSvg from "text-to-svg";

import Letter from "./letter";

const init = async () => {
  // create the text to svg object
  const svg = await new Promise(resolve => {
    TextToSvg.load("./fonts/ipag.ttf", (err, svg) => resolve(svg));
  });

  // create engine
  const engine = new Engine();
  const { gui, renderer } = engine;

  // create letter instance
  const letter = new Letter(svg, renderer);

  // add our options to the gui
  gui.addObject(letter.gui.character);
  gui.addObject(letter.gui.transformations);

  // change the default renrderer background
  renderer.scene.background = new THREE.Color(0xf3ffff);

  // configure the camera
  renderer.camera.position.set(0, 0, 4);
  renderer.camera.lookAt(new THREE.Vector3(0, 0, 0));

  // add the letter to the renderer
  renderer.addObject(letter);

  // go for it
  engine.start();
};

init();
