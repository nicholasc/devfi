import { GuiObject } from "./plateau";

export default class CharacterGui extends GuiObject {
  /** a reference to the parent letter instance */
  parent = null;

  /** the default character being presented */
  character = "a";

  /** the default character simplify value */
  simplify = 0.01;

  /** the default character scale value */
  scale = 30;

  /** whether we are rotating on the X axis or not */
  rotateX = false;

  /** whether we are rotating on the Y axis or not */
  rotateY = false;

  constructor(parent) {
    super();
    this.parent = parent;
  }

  setup(instance) {
    // create the options folder
    const folder = instance.addFolder("Character");
    folder.open();

    // character option
    folder
      .add(this, "character")
      .name("character")
      .onFinishChange(this.parent.reset);

    // simplify option
    folder
      .add(this, "simplify", 0, 10, 0.01)
      .name("simplify")
      .onChange(this.parent.reset);

    // scale option
    folder
      .add(this, "scale", 0, 50, 1)
      .name("scale")
      .onChange(this.parent.reset);

    // rotateX option
    folder
      .add(this, "rotateX")
      .name("rotateX")
      .onFinishChange(rotating => {
        this.parent.mesh.rotation.x = 0;
      });

    // rotateY option
    folder
      .add(this, "rotateY")
      .name("rotateY")
      .onFinishChange(rotating => {
        this.parent.mesh.rotation.y = 0;
      });
  }
}
