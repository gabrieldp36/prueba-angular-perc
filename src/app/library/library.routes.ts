import { Routes } from '@angular/router';
import { LibraryLayoutComponent } from './layout/library-layout/library-layout.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: LibraryLayoutComponent,
    children: [
      {
        path: 'books',
        component: BooksPageComponent,
      },
    ],
  },
];

export default countryRoutes;
