import { Participant, ParticipantDto, ParticipantPostDto, MapParticipant } from "../models/Participant";
import { Trip, TripDto, TripPostDto, MapTrip } from "../models/Trip";
import ApiResponse from "../models/ApiResponse";
import axios, { AxiosResponse } from 'axios';

const localHost: string = "https://localhost:44347";
const remoteHost: string = "";

const apiClient = axios.create({
  baseURL: localHost,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

const getTripUrl: string = 'Trip/{id}/Get'
const getTripWithStatsUrl: string = 'Trip/{id}/GetWithStats'
const createTripUrl: string = 'Trip/Create'
const updateTripUrl: string = 'Trip/{id}/Update'

const getParticipantUrl: string = 'Participant/{id}/Get'
const getParticipantWithRangesUrl: string = 'Participant/{id}/GetWithRanges'
const getMultipleParticipantWithRangesUrlByTripId: string = 'Participant/GetMultipleWithRangesByTripId/{tripId}'
const createParticipantUrl: string = 'Participant/Create'
const createParticipantWithRangesUrl: string = 'Participant/CreateWithRanges'
const updateParticipantUrl: string = 'Participant/{id}/Update'
const updateParticipantWithRangesUrl: string = 'Participant/{id}/UpdateWithRanges'
const deleteParticipantUrl: string = 'Participant/{id}/Delete'

export async function getTrip(id: string): Promise<ApiResponse<Trip>> {
  const url = compileUrl(getTripUrl, { id });
  const res: AxiosResponse<TripDto, any> =
    await apiClient.get<TripDto>(url);

  return handleApiResponse<TripDto, Trip>(res, MapTrip.dtoToEntity);
}

export async function getTripWithStats(id: string): Promise<ApiResponse<Trip>> {
  const url = compileUrl(getTripWithStatsUrl, { id });
  const res: AxiosResponse<TripDto, any> =
    await apiClient.get<TripDto>(url);

  return handleApiResponse<TripDto, Trip>(res, MapTrip.dtoToEntity);
}

export async function createTrip(trip: Trip): Promise<ApiResponse<Trip>> {
  const tripPostDto: TripPostDto = MapTrip.entityToPostDto(trip);
  
  const url = createTripUrl;
  const res: AxiosResponse<TripDto, any> =
    await apiClient.post<TripDto, AxiosResponse<TripDto>, TripPostDto>(url, tripPostDto);
  
  return handleApiResponse<TripDto, Trip>(res, MapTrip.dtoToEntity);
}

export async function updateTrip(trip: Trip): Promise<ApiResponse<Trip>> {
  const tripPostDto: TripPostDto = MapTrip.entityToPostDto(trip);
  
  const url = compileUrl(updateTripUrl, { id: trip.id });
  
  const res: AxiosResponse<TripDto, any> =
    await apiClient.put<TripDto, AxiosResponse<TripDto>, TripPostDto>(url, tripPostDto);

  return handleApiResponse<TripDto, Trip>(res, MapTrip.dtoToEntity);
}

export async function getParticipant(id: number): Promise<ApiResponse<Participant>> {
  const url = compileUrl(getParticipantUrl, { id });
  const res: AxiosResponse<ParticipantDto, any> =
    await apiClient.get<ParticipantDto>(url);

  return handleApiResponse<ParticipantDto, Participant>(res, MapParticipant.dtoToEntity);
}

export async function createParticipant(participant: Participant): Promise<ApiResponse<Participant>> {
  const participantPostDto: ParticipantPostDto = MapParticipant.entityToPostDto(participant);

  const url = createParticipantUrl;
  const res: AxiosResponse<ParticipantDto, any> =
    await apiClient.post<ParticipantDto, AxiosResponse<ParticipantDto>, ParticipantPostDto>(url, participantPostDto);

  return handleApiResponse<ParticipantDto, Participant>(res, MapParticipant.dtoToEntity);
}

export async function createParticipantWithRanges(participant: Participant): Promise<ApiResponse<Participant>> {
  const participantPostDto: ParticipantPostDto = MapParticipant.entityToPostDto(participant);

  const url = createParticipantWithRangesUrl;
  const res: AxiosResponse<ParticipantDto, any> =
    await apiClient.post<ParticipantDto, AxiosResponse<ParticipantDto>, ParticipantPostDto>(url, participantPostDto);

  return handleApiResponse<ParticipantDto, Participant>(res, MapParticipant.dtoToEntity);
}

export async function updateParticipantWithRanges(participant: Participant): Promise<ApiResponse<Participant>> {
  const participantPostDto: ParticipantPostDto = MapParticipant.entityToPostDto(participant);

  const url = compileUrl(updateParticipantWithRangesUrl, { id: participant.id });
  const res: AxiosResponse<ParticipantDto, any> =
    await apiClient.put<ParticipantDto, AxiosResponse<ParticipantDto>, ParticipantPostDto>(url, participantPostDto);

  return handleApiResponse<ParticipantDto, Participant>(res, MapParticipant.dtoToEntity);
}

export async function updateParticipant(participant: Participant): Promise<ApiResponse<Participant>> {
  const participantPostDto: ParticipantPostDto = MapParticipant.entityToPostDto(participant);

  const url = compileUrl(updateParticipantUrl, { id: participant.id });
  const res: AxiosResponse<ParticipantDto, any> =
    await apiClient.put<ParticipantDto, AxiosResponse<ParticipantDto>, ParticipantPostDto>(url, participantPostDto);

  return handleApiResponse<ParticipantDto, Participant>(res, MapParticipant.dtoToEntity);
}

export async function deleteParticipant(id: number): Promise<ApiResponse<Participant>> {
  const url = compileUrl(deleteParticipantUrl, { id });
  const res: AxiosResponse<Participant, any> =
    await apiClient.delete<Participant>(url);
  
  return handleApiResponse<Participant, Participant>(res, x => x);
}

function handleApiResponse<T, U>(res: AxiosResponse<T, any>, map: (data: T) => U): ApiResponse<U> {
  return {
    data: !!map ? map(res.data) : res.data,
    statusCode: res.status,
    message: res.statusText,
  } as ApiResponse<U>;
}

function compileUrl(url: string, params: object) {
  let compiledUrl: string = url;
  for (let [key, value] of Object.entries(params)) {
    compiledUrl = compiledUrl.replace(`{${key}}`, String(value));
  }
  return compiledUrl;
}