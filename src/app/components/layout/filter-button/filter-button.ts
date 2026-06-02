import {Component, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-filter-button',
  imports: [
    MatIcon,
  ],
  templateUrl: './filter-button.html',
  styleUrl: './filter-button.scss',
})
export class FilterButton {
  pressed = output();
}
