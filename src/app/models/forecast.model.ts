export class Forecast {
    constructor(init?: Partial<Forecast>) {
        this.zipcode = init?.zipcode || '';
        this.name = init?.name || '';
        this.minTemp = init?.minTemp || 0;
        this.maxTemp = init?.maxTemp || 0;
        this.iconUrl = init?.iconUrl || '';
        this.date = init?.date || null;
        this.condition = init?.condition || '';
    }

    zipcode: string;
    name: string;
    date: Date;
    condition: string;
    minTemp: number;
    maxTemp: number;
    iconUrl: string;
}
