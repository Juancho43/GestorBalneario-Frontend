import {Component, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-side-sheet',
  imports: [
    MatIcon
  ],
  templateUrl: './side-sheet.html',
  styleUrl: './side-sheet.scss',
})
export class SideSheet {
  isOpen = input(false);
  headline = input('Headline');
  closed = output();
}
