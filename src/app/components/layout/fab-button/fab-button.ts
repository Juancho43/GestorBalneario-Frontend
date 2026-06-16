import {Component, input, output, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-fab-button',
  imports: [
    MatIcon
  ],
  templateUrl: './fab-button.html',
  styleUrl: './fab-button.scss',
})
export class FABButton {
  readonly icon = input.required<string>();
  readonly label = input<string>();
  protected showLabel = signal(true)
  touched = output()


  constructor() {
    (new BreakpointObserver()).observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
        this.showLabel.set(!result.matches);
    })
  }
}
