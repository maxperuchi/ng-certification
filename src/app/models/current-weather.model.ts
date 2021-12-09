export class CurrentWeather {
    constructor(init?: Partial<CurrentWeather>) {
        this.zipcode = init?.zipcode || '';
        this.name = init?.name || '';
        this.currentCondition = init?.currentCondition || '';
        this.currentTemp = init?.currentTemp || 0;
        this.minTemp = init?.minTemp || 0;
        this.maxTemp = init?.maxTemp || 0;
        this.iconUrl = init?.iconUrl || '';
    }

    zipcode: string;
    name: string;
    currentCondition: string;
    currentTemp: number;
    minTemp: number;
    maxTemp: number;
    iconUrl: string;
}
