import { TestBed } from '@angular/core/testing';
import { BookService, Book } from './book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it("should add a book correctly", () => {
    const book = {
      id: 1,
      title: "Test Book",
      author: "Author",
      availableCopies: 1,
      totalCopies: 1,
    };
    const result = service.addBook(book);
    expect(result).toBeTrue(); // Vérifie que l'ajout a réussi
  });

  // Test : L'ajout d'un livre sans titre ne doit pas fonctionner

  it("should not add book without title", () => {
    const book = {
      id: 1,
      title: "",
      author: "Author",
      availableCopies: 1,
      totalCopies: 1
    }
    const result = service.addBook(book);
    expect(result).not.toBeTrue();

  })

  // Test : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner

  it("should not add book with 0 or less copies", () => {
    const book = {
      id: 1,
      title: "titre",
      author: "Author",
      availableCopies: 1,
      totalCopies: -1
    }
    const result = service.addBook(book);
    expect(result).not.toBeTrue();
  })

  // Test : Emprunter un livre doit décrémenter availableCopies
  it("should decrement available copies when borrow book", () => {
    const book = {
      id: 1,
      title: "titre",
      author: "Author",
      availableCopies: 1,
      totalCopies: 5
    }
    const result = service.addBook(book);
    service.borrowBook(1)
    const borrowedBook = service.getBooks().find(b => b.id === 1)
    expect(borrowedBook?.availableCopies).toBe(4)
  })

  // Test : Ne pas emprunter un livre dont availableCopies est égal à 0
  it("should not possible to borrow an unavailable book", () => {
    expect(() => service.borrowBook(3)).toThrowError('This book is unavailable')
  })

  // Test : Ne pas emprunter un livre qui n'existe pas

  it("should not be possible to borrow an unknown book", () => {
    expect(() => service.borrowBook(3)).toThrowError()
  })

  // Test : Retourner un livre doit incrémenter availableCopies

  it("should increment available copies when return book", () => {
    service.returnBook(1)
    const returnedBook = service.getBooks().find(b => b.id === 1)
    expect(returnedBook?.availableCopies).toBe(6)
  })

  // Test : Ne pas retourner un livre qui n'existe pas
  it("should not be possible to return an unknown book", () => {
    expect(() => service.returnBook(3)).not.toBeTrue
  })

  // Test : Ne pas retourner un livre dont toutes les copies ont déjà été rendues
  it("should not be possible to return a book with all copies available in store", () => {
    expect(() => service.returnBook(2)).toThrowError()
  })

  // Ajoute des tests de ton choix pour les autres méthodes

  // Teste la fonction update
  it("should be possible to update inventory", () => {
    const bookToUpdate = {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      availableCopies: 5,
      totalCopies: 10
    };
    service.updateBook(bookToUpdate);
    const updatedBook = service.getBooks().find(book => book.id === 1);
    expect(updatedBook?.totalCopies).toBe(10);
  });

  //teste la fonction delete
  it ("it should be possible to delete a book", () => {
    expect(() => service.deleteBook(3)).toBeTrue
  })
});
