import { Component, OnInit } from '@angular/core';
import {Category} from '../category';
import {CategoryService} from '../category.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../book';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  categories = [];
  books = [];
  showAddCategoryForm: boolean;
  addForm: FormGroup;

  searchTerm = '';

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private router: Router) {
    this.addForm = this.formBuilder.group({
      name: formBuilder.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response;

      for (const category of this.categories){
          const temp = category.books;
          for (let i = 0; i < temp.length; i++){
            this.books.push(temp[i]);
          }

      }
    });


  }

  onCategoryClick(id: number): void{
    this.router.navigate(['category', id]);
  }

  onBookClick(id: number): void{
    this.router.navigate(['details', id]);
  }

  addCategory(): void{
    this.showAddCategoryForm = true;
  }

  add(): void{
    const name = this.addForm.get('name').value;
    const newCategory = new Category();
    newCategory.category = name;
    this.categoryService.createCategory(newCategory).subscribe(() => {
      window.location.href = window.location.href;
    });

  }
}
