import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';
import { ElementRef, Inject, Input, OnDestroy, Optional, Self, ViewChild } from '@angular/core';
import { Icategories } from "../interfaces/categories.interface";
import { Iproduct } from "../interfaces/product.interface";
import { ProductService } from "../product.service";
import { NavbarService } from '../services/navbar.service';
import { AddProduct } from '../interfaces/add-product';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UploadImageService } from '../services/upload-image.service';
import { ProductListService } from '../services/product-list.service';
import { isTemplateRef } from '@ngneat/overview';
import { analyticInstance$ } from '@angular/fire/analytics';
import { map, Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { doc, setDoc } from "firebase/firestore";
import { CategoryService } from '../services/category.service';



@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  myDate = new Date();

  productsList: AddProduct[] = [];
  id: string = '';
  name: string = '';
  location: string = '';
  space: string = '';
  price: string = '';
  phone: string = '';
  description: string = '';
  image: string = '';
  category: string = '';


  /*
    houses: Array<any> = [
      { id: 1, name: 'Apartment', image: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-23.jpg', location: 'Mahdia', date: "15/02/2018", price: "700", space: 300 },
      { id: 2, name: 'Building', image: 'https://image.cnbcfm.com/api/v1/image/106758801-1603459526384-picture-perfect-beautiful-house-on-the-island-of-coronado-in-sunny-california-beautifully-landscaped_t20_6lJOrv.jpg?v=1603459593&w=740&h=416', location: 'mexico', date: "19/02/2017", price: "700", space: 500 }
  
    ]*/

  cat: Array<Icategories> = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Sale' },
    { id: 3, name: 'Rent' },
    { id: 4, name: 'Exchange' },
  ]

  selectedCategory: string;

  Iproduct: any;
  data: any;
  index: any;
  products: any[] = [];
  filtredproducts: any[] = [];
  photoData = [];



  constructor(private elementRef: ElementRef, private router: Router, public productService: ProductService, public nav: NavbarService,
    private datas: DataService, private readonly sanitizer: DomSanitizer,
    private uploadimg: UploadImageService, public productlistservice: ProductListService,
    private angularFirestore: AngularFirestore, private CategoryService: CategoryService, private route: ActivatedRoute) {

  }



  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = ' rgb(230, 247, 255)';
  }


  ngOnInit(): void {
    this.nav.show();
    this.getAllProducts();


  }




  getAllProducts() {
    this.datas.getAllProducts().subscribe(res => {
      this.productlistservice.productsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      console.log(this.productlistservice.productsList);



    }, err => {
      alert('Error while fetching product data');
    })
  }


  getObjectById(id: any) {
    return this.angularFirestore.collection('products').doc(id).ref;
  }


  getcat(category: string) {
    this.datas.getcat(category).subscribe(res => {
      this.productlistservice.productsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      /*console.log(this.productlistservice.productsList)*/


    }, err => {
      alert('Error while fetching product data');
    })
  }





}


