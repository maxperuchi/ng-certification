import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrentWeather } from 'src/app/models/current-weather.model';
import { Forecast } from 'src/app/models/forecast.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(private httpClient: HttpClient) { }

  getForecastByZipcode(zipcode: string): Observable<Forecast[]> {
    return this.httpClient.get<any>(`https://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&appid=${environment.openWeatherAppId}`)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          console.log('Zipcode not found.');
        } else {
          console.log(error);
        }
        return of(null);
      }),
      map(response => {
        if (response?.city?.name?.length > 0) {
          const days: any[] = response.list;
          let dayCounter = 0;
          return days.map(r => new Forecast({
            zipcode: zipcode,
            name: response.city.name,
            condition: r.weather[0].main,
            date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (dayCounter++)),
            minTemp: r.temp.min,
            maxTemp: r.temp.max,
            iconUrl: this.getIconUrl(r.weather[0].main.toLowerCase())
          }));
        } else {
          return [new Forecast({ zipcode: zipcode })];
        }
      }));
  }

  getCurrentWeatherByZipcode(zipcode: string): Observable<CurrentWeather> {
    return this.httpClient.get<any>(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${environment.openWeatherAppId}`)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            console.log('Zipcode not found.');
          } else {
            console.log(error);
          }
          return of(null);
        }),
        map(response => {
          if (response?.name?.length > 0) {
            return new CurrentWeather({
              zipcode: zipcode,
              name: response.name,
              currentCondition: response.weather[0].main,
              currentTemp: response.main.temp,
              minTemp: response.main.temp_min,
              maxTemp: response.main.temp_max,
              iconUrl: this.getIconUrl(response.weather[0].main.toLowerCase())
            });
          } else {
            return new CurrentWeather({ zipcode: zipcode });
          }
        }));
  }

  private getIconUrl(condition: string): string {
    const baseUrl = 'https://www.angulartraining.com/images/weather/';
    if (condition === 'snow') {
      return baseUrl + 'snow.png';
    } else if (condition.includes('rain') || condition === 'thunderstorm') {
      return baseUrl + 'rain.png';
    } else if (condition.includes('clouds')) {
      return baseUrl + 'clouds.png';
    } else {
      return baseUrl + 'sun.png';
    }
  }
}
