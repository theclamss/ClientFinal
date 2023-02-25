import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideUpAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.5s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  onGetStarted() {
    this.router.navigate(['/ancienneRouteParente']);
  }
}