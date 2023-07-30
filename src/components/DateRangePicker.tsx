import DateOnly from "../models/DateOnly";
import { CSSProperties, useEffect, useState } from "react";
import DatePicker, { DateObject }  from "react-multi-date-picker"
import DateRange from "../models/DateRange";
import { wait } from "@testing-library/user-event/dist/utils";
import gregorian_en from "react-date-object/locales/gregorian_en"
import DateRangeList from "./DateRangeList";

function DateRangePicker({tripDateRange = null, onRangeChange, initialValue = null, clearTick, style, required}: {
  tripDateRange?: DateRange | null,
  onRangeChange: (arg: DateRange | null) => void,
  initialValue?: DateRange | null,
  clearTick?: boolean,
  style?: CSSProperties | undefined,
  required?: boolean,
}) {
  const convertToDateObject = (range: DateRange | null): DateObject[] | null => {
    if (range == null)
      return null;
    
    return [
      new DateObject(range.getStart().getDate()),
      new DateObject(range.getEnd().getDate()),
    ];
  }
  
  const [value, setValue] = useState<string | DateObject | DateObject[] | null>([new DateObject(new Date()), new DateObject(new Date())]);
  
  const rangeStart: Date | undefined = tripDateRange?.getStart().getDate() ?? new Date();
  const rangeEnd: Date | undefined = tripDateRange?.getEnd().getDate();
  
  const handleRangeChange = (value: DateObject | DateObject[] | null) => {
    setValue(value);
    
    let start: DateOnly, end: DateOnly;
    
    if (value instanceof DateObject) {
      start = end = new DateOnly(value.toDate());
    } else if (value instanceof Array && value.length == 2) {
      start = new DateOnly(value[0].toDate());
      end = new DateOnly(value[1].toDate());
    } else {
      return;
    }

    onRangeChange(new DateRange(start, end));
  };
  
  useEffect(() => {
    wait(0).then(() => setValue(convertToDateObject(initialValue)))
  }, [initialValue])
  
  useEffect(() => {
    setValue(null);
  }, [clearTick]);

  return (
    <DatePicker
      onChange={e => handleRangeChange(e)}
      minDate={rangeStart}
      maxDate={rangeEnd}
      value={value}
      locale={gregorian_en}
      weekStartDayIndex={1}
      placeholder={"Pick a date range"}
      format={"DD/MM/YYYY"}
      dateSeparator={DateRange.datesSeparator}
      range
      style={{fontSize: "13px", padding: "10 5px", margin: "0 5px", ...style}}
      required={required}
    />
  );
}

export default DateRangePicker;