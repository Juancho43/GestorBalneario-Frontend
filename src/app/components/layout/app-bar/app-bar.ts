import {Component, input, output} from '@angular/core';
import {CurrentSeasonDisplay} from '../../seasons/current-season-display/current-season-display';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-app-bar',
  imports: [
    CurrentSeasonDisplay,
    MatIcon
  ],
  templateUrl: './app-bar.html',
  styleUrl: './app-bar.scss',
})
export class AppBar {
  readonly title = input.required<string>();
  menuOpen = input.required<boolean>();
  button = output();
  titleTouched = output()
  toggleMode = output();
}
