export class GenAutoRepair {
  slides = [
    '../static/imgs/photo3.png',
    '../static/imgs/photo4.png',
    '../static/imgs/photo5.png',
    '../static/imgs/photo6.png',
    '../static/imgs/photo7.png',
    '../static/imgs/photo8.png',
    '../static/imgs/photo9.png',
  ];

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
