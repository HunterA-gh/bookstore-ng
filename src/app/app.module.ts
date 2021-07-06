import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailspageComponent } from './detailspage/detailspage.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DetailspageComponent,
    CategoryComponent,
    SearchPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
