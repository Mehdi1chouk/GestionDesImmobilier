import { Component, OnInit, Input } from '@angular/core';
import { Icategories } from "../../interfaces/categories.interface";
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: Icategories = { id: NaN, name: "" };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }



}
