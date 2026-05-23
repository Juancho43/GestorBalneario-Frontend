import {Component, ComponentRef, input, output, Type} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {JsonPipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-filter-button',
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './filter-button.html',
  styleUrl: './filter-button.scss',
})
export class FilterButton {
  pressed = output();
}
