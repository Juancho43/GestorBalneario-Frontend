import {Component, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

export interface FabAction {
  name: string;      // The unique identifier for the action (e.g., 'EDIT')
  icon: string;      // The material icon name (e.g., 'edit')
  tooltip: string;   // The text to display on hover
  color?: 'primary' | 'accent' | 'warn'; // Optional material color
}
@Component({
  selector: 'app-fab-menu',
  imports: [
    MatIcon,
  ],
  templateUrl: './fab-menu.html',
  styleUrl: './fab-menu.scss',
})
export class FABMenu {
  public isOpen: boolean = false;
   actions = input<FabAction[]>([]);
   actionSelected =output<string>()

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  public executeAction(actionName: string): void {
    this.actionSelected.emit(actionName);

    this.isOpen = false;
  }
}
