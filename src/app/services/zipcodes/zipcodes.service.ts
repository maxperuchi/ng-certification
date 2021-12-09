import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ZipcodesService {

  static ZIPCODES_KEY = 'zipcodes';

  constructor(private localStorageService: LocalStorageService) { }

  getMyZipcodes(): string[] {
    return this.localStorageService.get(ZipcodesService.ZIPCODES_KEY) || [];
  }

  addZipcode(zipcode: string): void {
    const zipcodes = this.getMyZipcodes();
    if (!zipcodes.includes(zipcode)) {
      zipcodes.push(zipcode);
    }
    this.localStorageService.set(ZipcodesService.ZIPCODES_KEY, zipcodes);
  }

  removeZipcode(zipcode: string): void {
    this.localStorageService.set(ZipcodesService.ZIPCODES_KEY, this.getMyZipcodes().filter(z => z !== zipcode));
  }
}
