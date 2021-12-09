import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeather } from 'src/app/models/current-weather.model';
import { OpenWeatherService } from 'src/app/services/open-weather/open-weather.service';
import { ZipcodesService } from 'src/app/services/zipcodes/zipcodes.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input()
  set zipcode(value: string) {
    this.openWeatherService.getCurrentWeatherByZipcode(value).subscribe(response => {
      this.currentWeather = response;
    });
  }

  currentWeather?: CurrentWeather;

  constructor(
    private zipcodesService: ZipcodesService,
    private openWeatherService: OpenWeatherService
  ) { }

  ngOnInit(): void {
  }

  remove(): void {
    this.zipcodesService.removeZipcode(this.currentWeather?.zipcode);
  }
}
