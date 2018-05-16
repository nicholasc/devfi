import { GuiObject } from "plateau";

export default class TransformationsGui extends GuiObject {
  /** a reference to the parent letter instance */
  parent = null;

  /** the ammount of separations on the axis */
  divisions = 2;

  /** the separation information for the division axis */
  separations = [-1, 1];

  /** the distance between the divisions */
  distance = 0.1;

  /** the offset ammount for the divisions */
  offset = 0;

  /** the stretch factor applied */
  stretch = 0.5;

  constructor(parent) {
    super();
    this.parent = parent;
  }

  setup(instance) {
    // create the options folder
    const folder = instance.addFolder("TransformationsX");

    // divisions option
    folder
      .add(this, "distance", 0.01, 1, 0.01)
      .name("distance")
      .onChange(this.parent.transformationsX);

    // offset option
    folder
      .add(this, "offset", -1, 1, 0.01)
      .name("offset")
      .onChange(this.parent.transformationsX);

    // stretch option
    folder
      .add(this, "stretch", 0, 5, 0.01)
      .name("stretch")
      .onChange(this.parent.transformationsX);

    folder.open();
  }
}
