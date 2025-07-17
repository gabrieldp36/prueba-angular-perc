import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject, viewChild, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../interfaces/books.interfaces';
import { DialogCreateEditBookComponent } from '../dialog-create-edit-book/dialog-create-edit-book.component';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './book-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements AfterViewInit{

  // ViewRef
  public paginator = viewChild(MatPaginator);
  public sort = viewChild(MatSort);

  // Injección dependencias.
  private dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);
  public libraryService = inject(LibraryService);

  // Propiedades públicas.
  public displayedColumns: string[] = ['icono','id', 'name', 'acciones'];
  public dataSource!: MatTableDataSource<Book>;

  // Este efecto lo usamos para actualizar la data que consume la mat-table.
  // El mismo se dispara siempre que exista un cambio la señal bookList.
  public effect = effect( ()=> {
    if(this.libraryService.bookList() && this.dataSource ) {
      this.dataSource.data = this.libraryService.bookList();
    };
  });

  // Luego de que estén inicializadas las vistas
  // congiruamos la tabla que muesta el listado de libros
  public ngAfterViewInit() {
    this.configTable();
  };

  // Este método nos permite inicializar nuestra tabla
  // con la información almacenada y sus configuraciones correspondientes.
  public configTable(): void {
    // Inyectamos la data que va a consumir la tabla.
    this.dataSource = new MatTableDataSource(this.libraryService.bookList());
    // configuramos el ordenamiento de la tabla.
    this.dataSource.sort = this.sort()!;
    this.sort()!.active = 'id';
    this.sort()!.direction = 'desc';
    this.sort()!.sortChange.emit();
    // Configuramos el paginator.
    this.dataSource.paginator = this.paginator()!;
    this.matPaginatorIntl.itemsPerPageLabel = 'Libros por página';
    this.matPaginatorIntl.firstPageLabel = 'Página inicial';
    this.matPaginatorIntl.nextPageLabel = 'Página siguiente';
    this.matPaginatorIntl.previousPageLabel = 'Página anterior';
    this.matPaginatorIntl.lastPageLabel = 'Página final';
    // Configuramos que sólo se pueda buscar por nombre.
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.name.toLowerCase();
      return dataStr.includes(filter.trim().toLowerCase());
    };
  };

  // Este método se utiliza para filtrar la tabla.
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    };
  };

  // Removemos un libro.
  public removeBook(book: Book) {
    this.libraryService.removeBook(book);
  };

  // Modal que contien el formulario de edición / creación.
  public openDialog(book: Book|null = null): void {
    const dialogRef = this.dialog.open(DialogCreateEditBookComponent, {
      data: book,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if(!book) {
          this.libraryService.addBook(result)
          return;
        };
        this.libraryService.editBook(book.id, result);
      };
    });
  };
}
