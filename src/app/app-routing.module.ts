import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { IntroComponent } from './components/intro/intro.component';





const routes: Routes = [

  { path: '', component: IntroComponent },
  { path: 'product-card', component: ProductCardComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashComponent },
  { path: 'details-product/:id', component: DetailsProductComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'intro', component: IntroComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
