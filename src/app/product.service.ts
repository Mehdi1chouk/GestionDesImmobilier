import { Injectable } from '@angular/core';
import { Iproduct } from './interfaces/product.interface';
import { AddProduct } from './interfaces/add-product';
import { ProductListService } from './services/product-list.service';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Array<any> = [{

    id: "",
    name: '',
    image: '',
    description: '',
    location: '',
    date: "",
    price: "",
    space: "",
    phone: "",
    category: "",



  }]


  houses: Array<any> = [{
    id: 1,
    name: 'Apartment',
    image: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-23.jpg',
    description: 'This house was built in 2001, it contains 4 rooms ,a bathroom and a wide living room, you can have a look in any time you want and for your information all the material design in this house are made in germany ',
    location: 'Mahdia,Tunisia',
    date: "15/02/2018",
    price: "700",
    space: 500,
  },
  {
    id: 2,
    name: 'Building',
    image: 'https://image.cnbcfm.com/api/v1/image/106758801-1603459526384-picture-perfect-beautiful-house-on-the-island-of-coronado-in-sunny-california-beautifully-landscaped_t20_6lJOrv.jpg?v=1603459593&w=740&h=416',
    description: '....',
    location: 'mexico',
    date: "19/02/2017",
    price: "700",
    space: 900,
  }]



  //productsList: AddProduct[] = [];



  constructor(public productlistservice: ProductListService) {

  }

  /* filter(id: any): void {
     const index = this.productlistservice.AddProduct.findIndex((el: any) => el.id === id);
     return this.productlistservice.AddProduct[index]
   }*/


  /*filter(id: any): void {
    const index = this.houses.findIndex((el) => el.id === id);
    return this.houses[index]
  }*/





}


