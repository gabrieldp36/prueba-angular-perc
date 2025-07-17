import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { LibraryService } from '../services/library.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public validateField(miFormulario: FormGroup, campo: string, error: string): boolean {
    return (miFormulario.get(campo)?.errors?.[error]
      && miFormulario.get(campo)?.touched )
        ?  true : false;
  };
};
