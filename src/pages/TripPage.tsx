import "../styles/Trip.css";
import { Button } from 'flowbite-react';
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { BiSolidEdit } from 'react-icons/bi';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Trip, TripDefaultId } from "../models/Trip";
import ParticipantsSummary from "../components/ParticipantsSummary";
import ParticipantForm from "../components/ParticipantForm";
import { Participant } from "../models/Participant";
import { refreshPage } from "../logic/helpers";
import {
  createParticipantWithRanges,
  createTrip,
  deleteParticipant,
  getTripWithStats,
  updateParticipantWithRanges,
  updateTrip
} from "../logic/backend";
import TripForm from "../components/TripForm";
import { HttpStatusCode } from "axios";

function TripPage() {
  const params = useParams();
  const tripId = params["id"] ?? TripDefaultId;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [showParticipantForm, setShowParticipantForm] = useState<boolean>(false);
  const [showTripForm, setShowTripForm] = useState<boolean>(false);
  const [isParticipantEdit, setIsParticipantEdit] = useState<boolean>(false);
  
  const showParticipantFormFunc = (participant: Participant | null, edit: boolean) => {
    setCurrentParticipant(participant);
    setIsParticipantEdit(edit);
    setShowParticipantForm(true);
  }

  const showTripFormFunc = (trip: Trip | null) => {
    setTrip(trip);
    setShowTripForm(true);
  }

  const removeParticipant = async (participant: Participant) => {
    const participantResponse = await deleteParticipant(participant.id);
    
    const deletedParticipant = participantResponse.data;
    if (!deletedParticipant) {
      console.warn(participantResponse.statusCode, participantResponse.message);
      refreshPage();
      return;
    }
    
    setParticipants(prev => prev.filter(p => p.id !== deletedParticipant.id));
  }

  const saveParticipant = async (participant: Participant) => {
    const participantResponse = !!participant.isEdit
      ? await updateParticipantWithRanges(participant)
      : await createParticipantWithRanges(participant);
    
    const createdParticipant = participantResponse.data;
    if (!createdParticipant) {
      console.warn(participantResponse.statusCode, participantResponse.message);
      refreshPage();
      return;
    }
    
    setParticipants(prev => {
      const matchedParticipant: Participant | undefined = prev.find(p => p.id === createdParticipant.id);
      if (!!matchedParticipant) {
        matchedParticipant.name = createdParticipant.name;
        matchedParticipant.preferredRanges = createdParticipant.preferredRanges;
        matchedParticipant.rejectedRanges = createdParticipant.rejectedRanges;
        matchedParticipant.preferredDays = undefined;
        matchedParticipant.rejectedDays = undefined;
        return prev;
      } else {
        return [...prev, participant];
      }
    });
  }

  const saveTrip = async (newTrip: Trip) => {
    const tripResponse = newTrip.isEdit
      ? await updateTrip(newTrip)
      : await createTrip(newTrip);

    const createdTrip = tripResponse.data;
    if (!createdTrip) {
      refreshPage();
      return;
    } 
    
    setTrip(createdTrip);
  }

  useEffect(() => {
    getTripWithStats(tripId)
      .then(res => {
        const trip = res.data;
        if (res.statusCode === HttpStatusCode.Ok && !!trip) {
          setTrip(trip);
          setParticipants(trip.participants ?? []);
        } else {
          console.log(res);
        }
      })
      .catch(res => {
        console.warn(res);
        setTrip(null);
      });
  }, [tripId]);

  return (
    <>
      <div id="trip" className="page">
        {!!trip ? (
          <div className="shadow-container">
            <div className="header-container">
              <div className="title-container">
                <div className="title">{trip.name}</div>
                <button className="edit-button" onClick={() => showTripFormFunc(trip)}><BiSolidEdit/></button>
              </div>
              <div className="info-container">
                <div className="side">
                  <span className="date-range key">Planning date range: </span>
                  <span className="date-range value">{trip.allowedRange.toString(false)}</span>
                </div>
                <div className="side">
                  <span className="duration key">Trip duration: </span>
                  <span className="duration value">
                    {trip.minDays === trip.maxDays
                      ? trip.minDays
                      : `${trip.minDays}-${trip.maxDays}`
                    } days
                  </span>
                </div>
              </div>
            </div>
            <hr className="rounded"/>
            <div className="main-container">
              {participants && (
                <div className="participants">
                  <div className="participants-title">Participants</div>
                  <ParticipantsSummary
                    participants={participants}
                    onEdit={p => showParticipantFormFunc(p, true)}
                    onRemove={p => removeParticipant(p)}
                  />
                </div>
              )}
              <Button
                className="mx-auto my-5"
                color="success"
                size="sm"
                onClick={() => showParticipantFormFunc(null, false)}
              >
                <HiOutlinePlusCircle size={16}/>&nbsp;Add participant
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div>Trip not found!</div>
            
          </div>
        )}
      </div>
      {!!trip && (
        <ParticipantForm
          participant={currentParticipant}
          setParticipant={setCurrentParticipant}
          trip={trip}
          show={showParticipantForm}
          isEdit={isParticipantEdit}
          onClose={() => setShowParticipantForm(false)}
          saveParticipant={saveParticipant}
        />
      )}
      <TripForm
        trip={trip}
        show={showTripForm}
        onClose={() => setShowTripForm(false)}
        saveTrip={saveTrip}
      />
    </>
  );
}

export default TripPage;