import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AddProduct } from 'src/app/interfaces/add-product';
import { DataService } from 'src/app/services/data.service';
import { ProductListService } from 'src/app/services/product-list.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  myDate = new Date();




  @Input() item: any;
  router: any;
  constructor(private datas: DataService, public productlistservice: ProductListService, private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {

  }



  getAllProducts() {

    this.datas.getAllProducts().subscribe(res => {

      this.productlistservice.productsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;

      })
      console.log(this.productlistservice.productsList)
      console.log(this.productlistservice.productsList[0].id)


    }, err => {
      alert('Error while fetching product data');
    })

  }


  getObjectById(id: any) {
    return this.angularFirestore.collection('products').doc(id).ref;

  }





}
