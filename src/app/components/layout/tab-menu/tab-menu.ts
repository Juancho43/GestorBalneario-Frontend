import {Component, input} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-tab-menu',
  imports: [MatTabsModule, RouterLink],
  templateUrl: './tab-menu.html',
  styleUrl: './tab-menu.scss',
})
export class TabMenu {
  readonly links = input<{label: string, url: string}[]>();
}
