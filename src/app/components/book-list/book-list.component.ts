import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  borrowBook(id: number) {
    const success = this.bookService.borrowBook(id);
    if (!success) {
      alert('No copies available to borrow.');
    }
  }

  returnBook(id: number) {
    const success = this.bookService.returnBook(id);
    if (!success) {
      alert('All copies are already returned.');
    }
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id);
    this.books = this.bookService.getBooks(); // Refresh list after deletion
  }
}
