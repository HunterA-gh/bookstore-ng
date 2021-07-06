import { Component, OnInit } from '@angular/core';
import {Category} from '../category';
import {CategoryService} from '../category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../book';
import {BookService} from '../book.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category;
  books = [];

  showEditForm = false;
editForm: FormGroup;

  showAddForm: boolean;
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.editForm = this.formBuilder.group({
      name: formBuilder.control('', [Validators.required])
    });
    this.addForm = this.formBuilder.group({
      name2: formBuilder.control('', [Validators.required]),
      isbn: formBuilder.control('', [Validators.required]),
      image: formBuilder.control('', [Validators.required]),
      description: formBuilder.control('', [Validators.required]),
      price: formBuilder.control('', [Validators.required]),
      stock: formBuilder.control('', [Validators.required]),
      isActive: formBuilder.control(''),
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params[`id`];
    this.categoryService.getCategoryById(id).subscribe(response => {
      this.category = response;
      this.books = this.category.books;
    });
  }

  onBookClick(id: number): void{
    this.router.navigate(['details', id]);
  }

  editCategory(): void{
    this.showEditForm = true;
  }

  addBook(): void{
    this.showAddForm = true;
  }

  deleteCategory(): void{
    const id = this.activatedRoute.snapshot.params[`id`];
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.router.navigate(['homepage']);
    });
  }

  edit(): void {
    const id = this.activatedRoute.snapshot.params[`id`];
    const name = this.editForm.get('name').value;
    const newCategory = this.category;
    newCategory.category = name;
    this.categoryService.updateCategory(newCategory, id).subscribe(() => {
      window.location.href = window.location.href;
    });
  }

  add(): void {
    const id = this.activatedRoute.snapshot.params[`id`];
    let book = new Book();

    const name = this.addForm.get('name2').value;
    const isbn = this.addForm.get('isbn').value;
    const image = this.addForm.get('image').value;
    const description = this.addForm.get('description').value;
    const price = this.addForm.get('price').value;
    const stock = this.addForm.get('stock').value;
    const isActive = this.addForm.get('isActive').value;

    book.name = name;
    book.isbn = isbn;
    book.image = image;
    book.description = description;
    book.price = price;
    book.stock = stock;
    if (isActive === true){
      book.active = 'Yes';
    } else {
      book.active = 'No';
    }

    this.categoryService.addBook(id, book).subscribe(() => {
      window.location.href = window.location.href;
    });
  }

}
