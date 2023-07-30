const minTripNameLength: number = 4;
const maxTripNameLength: number = 30;
const minTripPasscodeLength: number = 4;
const maxTripPasscodeLength: number = 24;
const minTripDays = 1;
const maxTripDays = 99;
const minParticipantNameLength: number = 4;
const maxParticipantNameLength: number = 30;

export function validateTripName (value: string | null | undefined, hard: boolean = false): boolean {
  if (value == null)
    return false;
  if (hard && value.length < minTripNameLength)
    return false;
  if (value.length > maxTripNameLength)
    return false;
  
  return true;
}

export function validatePasscode (value: string | null | undefined, hard: boolean = false): boolean {
  if (value == null)
    return false;
  if (hard && value.length < minTripPasscodeLength)
    return false;
  if (value.length > maxTripPasscodeLength)
    return false;

  return true;
}

export function validateTripDays(value: number, hard: boolean = false): boolean {
  if (hard && value < minTripDays)
    return false;
  if (value > maxTripDays)
    return false;
  
  return true;
}
