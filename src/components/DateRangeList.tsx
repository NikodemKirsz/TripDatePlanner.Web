import '../styles/DateRangeList.css';
import DateRange from "../models/DateRange";
import { Indexed } from "../models/Indexed";
import { Button } from "flowbite-react";
import { RxCross2 } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";

function DateRangeList({datesText, styleText, dateRanges, setDateRanges}: {
  datesText: string,
  styleText: string
  dateRanges: Indexed<DateRange>[],
  setDateRanges: Dispatch<SetStateAction<Indexed<DateRange>[]>>
}) {
  
  const removeDateRange = (id: string | number) => {
    setDateRanges(arr => arr.filter(range => range.id !== id))
  }
  
  return (
    <div className="date-range-list">
      <div className={`dates-title ${styleText}`}>{datesText}</div>
      <div className="date-list">
        {dateRanges.map(range =>
          <div key={range.id} className="flex text-sm my-2">
            <Button
              color="failure"
              onClick={() => removeDateRange(range.id)}
            >
              <RxCross2/>
            </Button>
            <span className="range">{range.entity.toString()}</span>
          </div>
        )}
        <Button color="success"><FiPlusCircle size={14}/></Button>
      </div>
    </div>
  )
}

export default DateRangeList;