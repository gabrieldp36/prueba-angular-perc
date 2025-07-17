import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BookListComponent } from "../../components/book-list/book-list.component";

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [BookListComponent],
  templateUrl: './books-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPageComponent { }
