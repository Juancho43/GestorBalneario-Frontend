import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [
    MatCard
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {}
