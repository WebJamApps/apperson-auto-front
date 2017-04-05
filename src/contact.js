
export class Contact {
  
  get widescreen(){
    let iswidescreen = false;
    let currentscreenwidth = document.documentElement.clientWidth;
    /* istanbul ignore else */
    if (currentscreenwidth > 1300){
      iswidescreen = true;
      //this.columnWidth = '450px';
    } //else {
      //this.columnWidth = 'auto';
    //}
    return iswidescreen;
  }
}
