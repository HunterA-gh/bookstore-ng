import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.css']
})
export class DetailspageComponent implements OnInit {

  book: Book;

  showEditForm: boolean;
  editForm: FormGroup;

  constructor(private categoryService: CategoryService, private bookService: BookService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      name: formBuilder.control('', [Validators.required]),
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
    this.bookService.getBookById(id).subscribe(response => {
      this.book = response;
    });
  }

  editBook(): void{
this.showEditForm = true;
  }

  deleteBook(): void{
    const id = this.activatedRoute.snapshot.params[`id`];
    this.bookService.deleteBook(id).subscribe(() => {
      this.router.navigate(['homepage']);
    });
  }

  edit(): void {
    const id = this.activatedRoute.snapshot.params[`id`];

    const name = this.editForm.get('name').value;
    const isbn = this.editForm.get('isbn').value;
    const image = this.editForm.get('image').value;
    const description = this.editForm.get('description').value;
    const price = this.editForm.get('price').value;
    const stock = this.editForm.get('stock').value;
    const isActive = this.editForm.get('isActive').value;

    let book = new Book();

    book.id = id;
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

    this.bookService.updateBook(id, book).subscribe(() => {
      window.location.href = window.location.href;
    });
  }

}
