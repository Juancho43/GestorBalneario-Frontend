import {Component, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

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
  touched = output()
}
