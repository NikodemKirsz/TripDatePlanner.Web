import { pad } from "../logic/helpers";

class DateOnly {
  public static readonly valuesSeparator: string = '-';
  
  private readonly date: Date;
  
  constructor(date: DateOnly | Date | string = new Date()) {
    if (date instanceof Date) {
      this.date = date;
    } else if (date instanceof DateOnly) {
      this.date = new Date(date.toString());
    } else {
      this.date = new Date(date);
    }
  }
  
  static parse(dateOnlyStr: string): DateOnly {
    return new DateOnly(dateOnlyStr);
  }
  
  static today(): DateOnly {
    return new DateOnly(new Date());
  }
  
  getDate(): Date {
    return this.date;
  }
  
  addDays(count: number): DateOnly {
    const newDateDays: number = this.date.getDate() + count;
    const newDate: Date = new Date(this.date);
    newDate.setDate(newDateDays);
    
    return new DateOnly(newDate);
  }
  
  toString(yearFirst: boolean = true, separator: string = DateOnly.valuesSeparator): string {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();

    return yearFirst
      ? `${pad(year, 4)}${separator}${pad(month, 2)}${separator}${pad(day, 2)}`
      : `${pad(day, 2)}${separator}${pad(month, 2)}${separator}${pad(year, 4)}`;
  }
}

export default DateOnly;