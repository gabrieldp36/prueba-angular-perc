import { Injectable, signal } from '@angular/core';
import { Book } from '../interfaces/books.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  // Mediante esta propieda pública almacenamos de manera global el listado de libros.
  public bookList = signal<Book[]>([
    { id: 1, name: "Cien Años de Soledad" },
    { id: 2, name: "Don Quijote de la Mancha" },
    { id: 3, name: "1984" },
    { id: 4, name: "Orgullo y Prejuicio" },
    { id: 5, name: "Crimen y Castigo" },
    { id: 6, name: "Matar a un Ruiseñor" },
    { id: 7, name: "En Busca del Tiempo Perdido" },
    { id: 8, name: "El Gran Gatsby" },
    { id: 9, name: "Ulises" },
    { id: 10, name: "La Odisea" },
    { id: 11, name: "Hamlet" },
    { id: 12, name: "El Extranjero" },
    { id: 13, name: "Rayuela" },
    { id: 14, name: "Fahrenheit 451" },
    { id: 15, name: "El Guardián Entre el Centeno" },
    { id: 16, name: "La Metamorfosis" },
    { id: 17, name: "El Principito" },
    { id: 18, name: "Los Miserables" },
    { id: 19, name: "El Retrato de Dorian Gray" },
    { id: 20, name: "La Divina Comedia" }
  ]);

  // Método que permite agregar un libro al listado.
  public addBook(book: Book): void {
    this.bookList.update((list) => [...list, book]);
  };

  // Método que permite editar un libro del listado.
  public editBook(id: number, book: Book): void {
    this.bookList.update((list) => {
      const bookIndex = list.findIndex(b => b.id === id );
      if(bookIndex) {
        list.splice(bookIndex, 1, book);
      };
      return [...list];
    });
  };

  // Método que permite eliminar un libro al listado.
  public removeBook(book: Book): void {
    this.bookList.update((list) => list.filter( b => b.id != book.id) );
  };
}
