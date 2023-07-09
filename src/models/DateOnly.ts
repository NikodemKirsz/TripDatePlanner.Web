import { pad } from "../logic/helpers";

class DateOnly {
  date: Date;
  
  constructor(date: DateOnly | Date | string = new Date()) {
    if (date instanceof Date) {
      this.date = date;
    } else if (date instanceof DateOnly) {
      this.date = new Date(date.toString());
    } else {
      this.date = new Date(date);
    }
  }
  
  static today(): DateOnly {
    return new DateOnly(new Date());
  }
  
  getDate(): Date {
    return this.date;
  }
  
  toString(): string {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();

    return `${pad(year, 4)}/${pad(month, 2)}/${pad(day, 2)}`;
  }
}

export default DateOnly;