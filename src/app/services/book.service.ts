import { Injectable } from '@angular/core';

export interface Book {
  id: number;
  title: string;
  author: string;
  availableCopies: number;
  totalCopies: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    { id: 1, title: '1984', author: 'George Orwell', availableCopies: 5, totalCopies: 6 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', availableCopies: 3, totalCopies: 3 },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', availableCopies: 0, totalCopies: 2 },
  ];

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book): boolean {
    if (book && book.title && book.totalCopies >= 0) {
      this.books.push(book);
      return true;
    }
    return false;
  }

  borrowBook(id: number): boolean {
    const book = this.books.find(b => b.id === id);
    if (book && book.availableCopies > 0 ) {
      book.availableCopies--;
      return true;
    } else {
      throw new Error('This book is unavailable')
    }
  }

  returnBook(id: number): boolean {
    const book = this.books.find(b => b.id === id);
    if (book && book.availableCopies != book.totalCopies) {
      book.availableCopies++;
      return true;
    } else if (book && book.availableCopies === book.totalCopies) {
      throw new Error('All copies of this book are already available')
    } else {
      throw new Error('This book does not exist')

    }
  }

  deleteBook(id: number): boolean {
    if (id) {
      this.books = this.books.filter(book => book.id !== id);
      return true;
    }
    return false;
  }

  updateBook(updatedBook: Book): boolean {
    if (updatedBook) {
      const index = this.books.findIndex(book => book.id === updatedBook.id);
      this.books[index] = updatedBook;
      return true;
    }
    return false;
  }
}
