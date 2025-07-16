import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent { }
