import { Component } from '@angular/core';

@Component({
  selector: 'slider-component',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  images: Array<any> = [];
  constructor() {
    this.images.push(
      {
        url: '../assets/images/imgSlider/1db9f7794a8a23f85582b2ad883c34f2caa67abc087dac2fa0eb69294b1c02c31627676690_thump.png',
      },
      {
        url: '../assets/images/imgSlider/42ff971998e83f12317231ddb3d9e7bbf0d8a55c94728f6af43020af13a618f51644505213_thump.png',
      },
      {
        url: '../assets/images/imgSlider/9557b08ce72f47eb771a4c4d4213c15452393dea5bf2e1566a43e870bfe334451627989118_thump.png',
      },
      {
        url: '../assets/images/imgSlider/c2d72b7854f3a15be9a51cd683e24a92da3b32707a84d9d29ec7ebfbf5c5ef741635284238_thump.png',
      }
    );
  }
}
