import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ValidatorService } from '../../validators/validator.service';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-dialog-create-edit-book',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogActions, ReactiveFormsModule] ,
  templateUrl: './dialog-create-edit-book.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCreateEditBookComponent implements OnInit {

  // Injección de dependencias.
  public validatorService = inject(ValidatorService);
  private libraryService = inject(LibraryService);

  private fb: FormBuilder = inject(FormBuilder);

  // Propiedade privadas.
  private dialogRef = inject(MatDialogRef<DialogCreateEditBookComponent>);

  // Propiedades públicas.
  public book = inject(MAT_DIALOG_DATA);

  // Formularios.
  public formBook: FormGroup = this.fb.group({
    id: [null, [ Validators.required, this.errorRepeatId.bind(this)] ],
    name: [null, [ Validators.required] ],
  });

  // Hooks.
  public ngOnInit(): void {
    if(this.book) {
      this.formBook.setValue({
        id: this.book.id,
        name: this.book.name,
      });
    };
  };

  // Validación custom.
  public errorRepeatId(control: FormControl): ValidationErrors | null {
    const id: number = control.value;
    const list = structuredClone(this.libraryService.bookList());
    if(this.book) {
      const actualBookIndex = list.findIndex( b => b.id === this.book.id );
      list.splice(actualBookIndex, 1);
    };
    if(list.find(b => b.id === id)) {
      return {errorId: true};
    };
    return null;
  };

  // Cerrar y guardar.
  public dismiss(): void {
    this.dialogRef.close();
  };

  public save(): void {
   this.dialogRef.close(this.formBook.value);
  };
}
