import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('salt', 5),
    new Ingredient('tomato', 2),
  ];

  constructor() { }

  ngOnInit() {
  }

}
