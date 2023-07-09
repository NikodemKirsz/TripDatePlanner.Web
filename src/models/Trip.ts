import DateRange from "./DateRange";
import Participant from "./Participant";

interface Trip {
  id: string,
  name: string,
  password: string | null,
  allowedRange: DateRange,
  minDays: number,
  maxDays: number,
  participants: Participant[] | null,
}

export default Trip;