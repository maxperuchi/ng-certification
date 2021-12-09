import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from 'src/app/models/forecast.model';
import { OpenWeatherService } from 'src/app/services/open-weather/open-weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  forecast?: Forecast[];

  constructor(
    private route: ActivatedRoute,
    private openWeatherService: OpenWeatherService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.openWeatherService.getForecastByZipcode(params.zipcode).subscribe(response => {
        this.forecast = response;
      });
    });
  }

  get cityName(): string {
    return this.forecast ? this.forecast[0]?.name : '';
  }

  get zipcode(): string {
    return this.forecast ? this.forecast[0]?.zipcode : '';
  }
}
