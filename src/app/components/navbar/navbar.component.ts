import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { AddProduct } from 'src/app/interfaces/add-product';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchcountry: any;



  constructor(public nav: NavbarService, private route: Router, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialogRef.open(AddProductComponent);
  }



}
