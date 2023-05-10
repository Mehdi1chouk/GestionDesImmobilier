import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddProduct } from '../interfaces/add-product';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  AddProduct: any;



  constructor(private angularFirestore: AngularFirestore) { }


  productsList: AddProduct[] = [];






  getAllProducts() {
    return new Promise<any>((resolve) => {
      this.angularFirestore
        .collection('products')
        .valueChanges({ idField: 'id' })
        .subscribe((products) => resolve(products));
    });
  }









  getDetailProduct(id: string): Observable<AddProduct> {
    const productsDocuments = this.angularFirestore.doc<AddProduct>(
      'products/' + id
    );
    return productsDocuments.snapshotChanges().pipe(
      map((changes) => {
        const data = changes.payload.data() as AddProduct;
        const id = changes.payload.id;
        return { id, ...data };
      })
    );
  }


}