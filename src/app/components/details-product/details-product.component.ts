import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AddProduct } from 'src/app/interfaces/add-product';
import { ProductService } from 'src/app/product.service';
import { DataService } from 'src/app/services/data.service';
import { ProductListService } from 'src/app/services/product-list.service';


@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  constructor(private route: ActivatedRoute, private productservice: ProductService,
    private angularFirestore: AngularFirestore, private dataService: DataService, public ProductListService: ProductListService) {
    this.route.params.subscribe((param) => (this.myid = param[`id`]));
  }
  product: any;
  data: any;
  //item: any;
  item: AddProduct = {};
  myid: any;

  selectedCard: any
  ngOnInit(): void {

    this.getDetailProduct()
  }

  getObjectById(id: any) {
    const pro = this.angularFirestore.collection('products').doc(`/${id}`).valueChanges();
  }


  getDetailProduct() {
    return this.ProductListService
      .getDetailProduct(this.myid)
      .subscribe((res) => (this.item = res));
  }


}




