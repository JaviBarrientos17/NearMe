import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  title = 'Home';
  mobileQuery: MediaQueryList;
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  items = [
    {
      title: '1 slide label',
      summery: '1 slide label summery',
      url: 'assets/barcelonaLogin.png',
    },
    {
      title: '2 slide label',
      summery: '2 slide label summery',
      url: 'assets/drawer.png',
    },
    {
      title: '3 slide label',
      summery: '3 slide label summery',
      url: 'assets/google.png',
    },
  ];
}
