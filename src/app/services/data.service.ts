import { Injectable } from '@angular/core';
import { AddProduct } from '../interfaces/add-product';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Icategories } from '../interfaces/categories.interface';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private fireStorage: AngularFireStorage, private afs: AngularFirestore) { }



  // add product
  addProducts(product: AddProduct) {
    product.id = this.afs.createId();
    return this.afs.collection('/products').add(product);
  }


  // get all products
  getAllProducts() {
    return this.afs.collection('/products').snapshotChanges();
  }

  getcat(category: string) {
    if (category == 'All')
      return this.getAllProducts();
    return this.afs.collection('/products', ref => ref.where('category', '==', category)).snapshotChanges();
  }


}

