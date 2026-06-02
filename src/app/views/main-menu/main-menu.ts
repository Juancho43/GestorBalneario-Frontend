import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-main-menu',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export default class MainMenu {
}
