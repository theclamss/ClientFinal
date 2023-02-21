import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-presta',
  templateUrl: './side-bar-presta.component.html',
  styleUrls: ['./side-bar-presta.component.scss']
})
export class SideBarNav2Component {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isExpanded = false;
  constructor(private breakpointObserver: BreakpointObserver,private router: Router) {}


  redirectToHomeMenu() {
    this.router.navigateByUrl('/home/menu');
  }

}
