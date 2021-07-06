import {Category} from './category';

export class Book{
  id: number;
  name: string;
  isbn: string;
  description: string;
  price: number;
  active: string;
  image: string;
  stock: number;
  category: Category;
}
