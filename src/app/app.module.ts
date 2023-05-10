import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashComponent } from './dash/dash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { AngularFireModule } from '@angular/fire/compat';         ///////////////////////////////////////////
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarService } from './services/navbar.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotToastModule } from '@ngneat/hot-toast';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { UsersService } from './services/users.service';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

import { AuthService } from './services/auth.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DataService } from './services/data.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IntroComponent } from './components/intro/intro.component';










@NgModule({
  declarations: [
    AppComponent,


    DashComponent,
    NavbarComponent,
    ProductCardComponent,
    CategoriesComponent,
    DetailsProductComponent,
    SignUpComponent,
    LoginComponent,
    AddProductComponent,
    IntroComponent,



  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    CommonModule,
    HttpClientJsonpModule,
    SocialLoginModule,
    MatDialogModule,
    TooltipModule,
    NgxMatSelectSearchModule,
    Ng2SearchPipeModule,













    HotToastModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),






  ],
  providers: [NavbarService, HttpClientModule, UsersService, AuthService, ScreenTrackingService, UserTrackingService, DataService, AngularFirestore, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
