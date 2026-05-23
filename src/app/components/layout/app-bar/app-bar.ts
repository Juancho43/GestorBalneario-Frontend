import {Component, computed} from '@angular/core';
import {CurrentSeasonDisplay} from '../../seasons/current-season-display/current-season-display';

@Component({
  selector: 'app-app-bar',
  imports: [
    CurrentSeasonDisplay
  ],
  templateUrl: './app-bar.html',
  styleUrl: './app-bar.scss',
})
export class AppBar {
  protected pageTitle = computed(()=> 'Gestor Balneario');
}
