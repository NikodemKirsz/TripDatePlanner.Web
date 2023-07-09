import DateOnly from "./DateOnly";

class DateRange {
  start: DateOnly;
  end: DateOnly;
  
  constructor(start: DateOnly | Date | string, end: DateOnly | Date | string) {
    this.start = new DateOnly(start);
    this.end = new DateOnly(end);
  }
  
  getStart(): DateOnly { 
    return this.start;
  }
  
  getEnd(): DateOnly {
    return this.end;
  }
  
  toString(): string {
    return `${this.start} - ${this.end}`;
  }
}

export default DateRange;