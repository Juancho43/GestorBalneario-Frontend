import {Component, input, model, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from '@angular/cdk/overlay';
export interface CustomMenuOption {
  icon:string;
  label: string;
  value: string;
}
@Component({
  selector: 'app-custom-menu',
  imports: [
    MatIcon,
    CdkConnectedOverlay,
    CdkOverlayOrigin
  ],
  templateUrl: './custom-menu.html',
  styleUrl: './custom-menu.scss',
})
export class CustomMenu {
  options = input<CustomMenuOption[]>([]);
  isOpen= signal(false)
  // Model: This replaces @Input and @Output for two-way binding
  selectedOption = model<string | null>(null);

  select(option: string) {
    // Updating the signal automatically emits the change to the parent
    this.selectedOption.set(option);
  }

  menuPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 5 // Pequeño margen de separación visual
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -5
    }
  ];


  closeMenu(): void {
    this.isOpen.set(false);
  }

  selectOption(option: string): void {
    this.selectedOption.set(option);
    this.closeMenu();
  }
}
