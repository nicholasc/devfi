import * as THREE from "three";
import svgToComplex from "svg-mesh-3d";
import { Object } from "plateau";
import threeSimplicialComplex from "three-simplicial-complex";

import CharacterGui from "./character";
import TransformationsGui from "./transformations";

const simplicalComplex = threeSimplicialComplex(THREE);

export default class Letter extends Object {
  /** the gui instance for our letter */
  gui = {
    character: null,
    transformations: null
  };

  /** the svg instance to create paths from characters */
  svg = null;

  /** a reference to the renderer */
  renderer = null;

  /** a copy of the letter's original geometry vertices */
  originalGeometry = [];

  // store path locally when creating an
  // instance of the letter object
  constructor(svg, renderer) {
    super();

    // store references & instances
    this.svg = svg;
    this.renderer = renderer;
    this.gui.character = new CharacterGui(this);
    this.gui.transformations = new TransformationsGui(this);

    // create a material reflecting the colors from instagram
    this.material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: 0x466a71
    });
  }

  setup() {
    // create an svg path from the character
    const path = this.svg.getD(this.gui.character.character);

    // convert the svg path to a complex three js object
    const complex = svgToComplex(path, {
      scale: this.gui.character.scale,
      simplify: this.gui.character.simplify
    });

    // create a geometry from the complex object
    this.geometry = simplicalComplex(complex);

    // store a copy of the geometry for transformations
    this.originalGeometry = this.geometry.clone();

    // create the final letter mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // apply transformations
    this.transformationsX();
  }

  render() {
    // add a rotation on the x axis if checked
    if (this.gui.character.rotateX) {
      this.mesh.rotation.x += 0.03;
    }

    // add a rotation on the y axis if checked
    if (this.gui.character.rotateY) {
      this.mesh.rotation.y += 0.03;
    }
  }

  reset = () => {
    // destroy the previous instance
    this.renderer.removeObject(this);

    // re-setup the letter & add it to the renderer
    this.setup();
    this.transformationsX(this.gui.transformations.stretch);
    this.renderer.addObject(this);

    // apply transformations
    this.transformationsX();
  };

  transformationsX = () => {
    this.geometry.vertices.map((vertex, i) => {
      const original = this.originalGeometry.vertices[i];

      const {
        offset,
        stretch,
        distance,
        separations
      } = this.gui.transformations;

      const [fMin, fMax] = separations;

      if (original.x <= fMin * distance + offset) {
        vertex.x = original.x - stretch;
      } else if (original.x >= fMax * distance + offset) {
        vertex.x = original.x + stretch;
      } else {
        const oMin = fMin * distance + offset;
        const oMax = fMax * distance + offset;
        const dMin = oMin - stretch;
        const dMax = oMax + stretch;

        vertex.x = (dMax - dMin) / (oMax - oMin) * original.x;
      }
    });

    this.geometry.verticesNeedUpdate = true;
  };
}
