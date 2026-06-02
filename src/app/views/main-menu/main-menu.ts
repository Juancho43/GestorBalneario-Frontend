import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ClientsTotalDebt} from '../../components/seasons/clients-total-debt/clients-total-debt';

@Component({
  selector: 'app-main-menu',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ClientsTotalDebt,
  ],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export default class MainMenu {
}
