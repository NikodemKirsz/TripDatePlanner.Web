import '../styles/DateRangeList.css';
import { Button } from "flowbite-react";
import { RxCross2, RxPlus } from "react-icons/rx";
import { Dispatch, SetStateAction, useState } from "react";
import DateRange from "../models/DateRange";
import DateRangePicker from "./DateRangePicker";

function DateRangeList({datesText, styleText, dateRanges, setDateRanges, tripDateRange}: {
  datesText: string,
  styleText: string,
  dateRanges: DateRange[],
  setDateRanges: Dispatch<SetStateAction<DateRange[]>>,
  tripDateRange: DateRange,
}) {
  const [clearTick, setClearTick] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  
  const removeDateRange = (id: string): void => {
    setDateRanges(arr => arr.filter(range => range.getId() !== id));
  }

  const addDateRange = () => {
    if (dateRange == null)
      return;
    
    setDateRanges(arr => [...arr, dateRange]);
    setClearTick(old => !old);
    setDateRange(null);
  }
  
  return (
    <div className="date-range-list">
      <div className={`dates-title ${styleText}`}>{datesText}</div>
      <div className="date-list">
        {dateRanges.map(range =>
          <div key={range.getId()} className="flex text-sm my-2">
            <Button color="failure" onClick={() => removeDateRange(range.getId())}><RxCross2/></Button>
            <span className="range">{range.toString(false, '/')}</span>
          </div>
        )}
        <div key={"new-date"} className="flex text-sm my-2">
          <Button color="success" onClick={addDateRange}><RxPlus/></Button>
          <DateRangePicker
            tripDateRange={tripDateRange}
            onRangeChange={val => setDateRange(val)}
            clearTick={clearTick}
          />
        </div>
      </div>
    </div>
  );
}

export default DateRangeList;