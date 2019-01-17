export class GenAutoRepair {
  get widescreen() {
    let iswidescreen = false;
    const currentscreenwidth = document.documentElement.clientWidth;
    /* istanbul ignore else */
    if (currentscreenwidth > 1300) {
      iswidescreen = true;
      //this.columnWidth = '450px';
    }
    return iswidescreen;
  }
}
