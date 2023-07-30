import DateRange from "./DateRange";
import { MapParticipant, Participant, ParticipantDto } from "./Participant";

export const TripDefaultId: string = '0';

interface Trip {
  id: string,
  name: string,
  passcode: string | null,
  allowedRange: DateRange,
  minDays: number,
  maxDays: number,
  participants: Participant[] | null,
  isEdit?: boolean | null,
}

interface TripDto extends Omit<Trip,
  'allowedRange' | 'participants' | 'isEdit'
> {
  allowedRange: string,
  participants: ParticipantDto[],
}

interface TripPostDto extends Omit<Trip,
  'allowedRange' | 'participants' | 'isEdit'
> {
  allowedRange: string,
}

export abstract class MapTrip {
  public static entityToPostDto(trip: Trip): TripPostDto {
    return {
      id: trip.id,
      name: trip.name,
      passcode: trip.passcode,
      allowedRange: trip.allowedRange.toString(),
      minDays: trip.minDays,
      maxDays: trip.maxDays,
      participants: null,
      isEdit: false,
    } as TripPostDto;
  }

  public static dtoToEntity(trip: TripDto): Trip {
    return {
      id: trip.id,
      name: trip.name,
      passcode: trip.passcode,
      allowedRange: DateRange.parse(trip.allowedRange),
      minDays: trip.minDays,
      maxDays: trip.maxDays,
      participants: trip.participants.map(p => MapParticipant.dtoToEntity(p)),
      isEdit: false,
    } as Trip;
  }
}

export type { Trip, TripDto, TripPostDto };