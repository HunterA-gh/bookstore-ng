import { Pipe, PipeTransform } from '@angular/core';
import {Book} from './book';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchTerm: string): Book[] {
    if (searchTerm === '') {
      return value;
    }

    let books = [];

    for (const book of value){
      if (book.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
        books.push(book);
      }
    }
    return books;
  }

}
