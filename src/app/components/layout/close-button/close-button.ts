import {Component, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-close-button',
  imports: [
    MatIcon
  ],
  templateUrl: './close-button.html',
  styleUrl: './close-button.scss',
})
export class CloseButton {
  closeClicked = output<void>();
}
