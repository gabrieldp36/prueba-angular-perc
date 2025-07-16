import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-books-page',
  imports: [],
  templateUrl: './books-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPageComponent {}
