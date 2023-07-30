import DateRange from "./DateRange";

interface Participant {
  id: number,
  name: string,
  tripId: string,
  preferredRanges: DateRange[],
  rejectedRanges: DateRange[],
  preferredDays?: number,
  rejectedDays?: number,
  isEdit?: boolean | null,
}

interface ParticipantDto extends Omit<Participant,
  'preferredRanges' | 'rejectedRanges' | 'isEdit'
> {
  preferredRanges: string[],
  rejectedRanges: string[],
  preferredDays: number,
  rejectedDays: number,
}

interface ParticipantPostDto extends Omit<Participant,
  'preferredRanges' | 'rejectedRanges' | 'preferredDays' | 'rejectedDays' | 'isEdit'
> {
  preferredRanges: string[],
  rejectedRanges: string[],
}

export abstract class MapParticipant {
  public static entityToPostDto(participant: Participant): ParticipantPostDto {
    return {
      id: participant.id,
      name: participant.name,
      tripId: participant.tripId,
      preferredRanges: participant.preferredRanges?.map(r => r.toString()) ?? [],
      rejectedRanges: participant.rejectedRanges?.map(r => r.toString()) ?? [],
    } as ParticipantPostDto;
  }

  public static dtoToEntity(participant: ParticipantDto): Participant {
    return {
      id: participant.id,
      name: participant.name,
      tripId: participant.tripId,
      preferredRanges: participant.preferredRanges?.map(s => DateRange.parse(s)) ?? [],
      rejectedRanges: participant.rejectedRanges?.map(s => DateRange.parse(s)) ?? [],
      preferredDays: participant.preferredDays,
      rejectedDays: participant.rejectedDays,
      isEdit: false,
    } as Participant;
  }
}

export type { Participant, ParticipantDto, ParticipantPostDto };