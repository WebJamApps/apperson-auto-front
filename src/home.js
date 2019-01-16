// import {computedFrom} from 'aurelia-framework';
// import {Router, Bindable} from 'aurelia-router';
// import {inject} from 'aurelia-framework';

// @inject(Router)
export class Home {
  // constructor(router) {
  // this.router = router;
  // }

  slides = [
    '../static/imgs/photo1.png',
    '../static/imgs/photo2.png',
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
    if (currentscreenwidth > 1400) {
      iswidescreen = true;
      // this.columnWidth = '450px';
    } // else {
    // this.columnWidth = 'auto';
    // }
    return iswidescreen;
  }
  // attached() {
  //     document.title = this.router.currentInstruction.config.title;
  // }
}
