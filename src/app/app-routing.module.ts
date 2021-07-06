import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {DetailspageComponent} from './detailspage/detailspage.component';
import {CategoryComponent} from './category/category.component';

const routes: Routes = [
  {path: 'details/:id', component: DetailspageComponent},
  {path: 'category/:id', component: CategoryComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: '**', redirectTo: 'homepage'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
