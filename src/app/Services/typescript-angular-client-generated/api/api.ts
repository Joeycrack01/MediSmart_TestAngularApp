export * from './userData.service';
import { UserDataService } from './userData.service';
export * from './weatherForecast.service';
import { WeatherForecastService } from './weatherForecast.service';
export const APIS = [UserDataService, WeatherForecastService];
