import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-library-layout',
  standalone: true,
  imports: [FooterComponent, RouterOutlet, NavbarComponent],
  templateUrl: './library-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryLayoutComponent { }
