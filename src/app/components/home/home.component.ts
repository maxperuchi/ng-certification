import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZipcodesService } from 'src/app/services/zipcodes/zipcodes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data: any = {};

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private zipcodesService: ZipcodesService
  ) {
    this.form = this.fb.group({
      zipcode: [null, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{5}')
      ])]
    });
  }

  public addZipcode(): void {
    this.zipcodesService.addZipcode(this.form.value.zipcode);
  }

  get isValid(): boolean {
    return this.form.valid;
  }

  get zipcodes(): string[] {
    return this.zipcodesService.getMyZipcodes();
  }
}
