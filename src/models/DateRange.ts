import DateOnly from "./DateOnly";
import { v4 as uuid } from "uuid";

class DateRange {
  public static readonly datesSeparator: string = ' - ';
  
  private readonly id: string;
  private readonly start: DateOnly;
  private readonly end: DateOnly;
  
  constructor(
    start: DateOnly | Date | string,
    end: DateOnly | Date | string, 
    id: string | null = null) {
    this.start = new DateOnly(start);
    this.end = new DateOnly(end);
    this.id = id ?? uuid();
  }
  
  static parse(dateRangeStr: string): DateRange {
    const splits: string[] = dateRangeStr.split(this.datesSeparator);
    if (splits.length !== 2) {
      throw new Error("Date Range String was in a wrong format!");
    }
    
    return new DateRange(
      DateOnly.parse(splits[0]),
      DateOnly.parse(splits[1])
    );
  }

  getId(): string {
    return this.id;
  }
  
  getStart(): DateOnly { 
    return this.start;
  }
  
  getEnd(): DateOnly {
    return this.end;
  }
  
  toString(yearFirst: boolean = true, separator: string = DateOnly.valuesSeparator): string {
    return `${this.start.toString(yearFirst, separator)}${DateRange.datesSeparator}${this.end.toString(yearFirst, separator)}`;
  }
}

export default DateRange;