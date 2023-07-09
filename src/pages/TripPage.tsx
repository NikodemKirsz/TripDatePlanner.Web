import "../styles/Trip.css";
import Trip from "../models/Trip";
import DateOnly from "../models/DateOnly";
import DateRange from "../models/DateRange";
import {Button} from 'flowbite-react';
import {HiOutlinePlusCircle} from 'react-icons/hi'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";
import ParticipantsSummary from "../components/ParticipantsSummary";
import ParticipantForm from "../components/ParticipantForm";

function TripPage() {
  const params = useParams();
  const tripId = params["id"] || "";

  const [showParticipantForm, setShowParticipantForm] = useState<boolean>(false)

  const exampleTrip: Trip = {
    id: tripId,
    name: "Sulejów",
    password: null,
    allowedRange: new DateRange(DateOnly.today(), DateOnly.today()),
    minDays: 2,
    maxDays: 3,
    participants: [
      {id: 1, tripId: tripId, name: "Marcin Miler"},
      {id: 2, tripId: tripId, name: "Julek Cyren"},
      {id: 2, tripId: tripId, name: "Jan Mikołajczyl"},
    ]
  };

  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    wait(200).then(() => {
      setTrip(exampleTrip);
    })
  }, [])

  return (
    <>
      <div id="trip" className="page">
        {!!trip
          ?
          <div className="shadow-container">
            <div className="header-container">
              <div className="title">{trip.name}</div>
              <div className="info-container">
                <div className="side">
                  <span className="date-range key">Planning date range: </span>
                  <span className="date-range value">{trip.allowedRange.toString()}</span>
                </div>
                <div className="side">
                  <span className="duration key">Planned duration: </span>
                  <span className="duration value">{trip.minDays === trip.maxDays
                    ? trip.minDays
                    : `${trip.minDays}-${trip.maxDays}`
                  } days
              </span>
                </div>
              </div>
            </div>
            <hr className="rounded"/>
            <div className="main-container">
              {trip.participants && (
                <div className="participants">
                  <div className="participants-title">Participants</div>
                  <ParticipantsSummary participants={trip.participants}/>
                </div>
              )}
              <Button
                className="mx-auto my-5"
                color="success"
                size="sm"
                onClick={() => setShowParticipantForm(true)}
              >
                <HiOutlinePlusCircle size={16}/>&nbsp;Add participant
              </Button>
            </div>
          </div>
          :
          <div>
            Trip is null!
          </div>
        }
      </div>
      <ParticipantForm
        participant={null}
        show={showParticipantForm}
        onClose={() => setShowParticipantForm(false)}
      />
    </>
  );
}

export default TripPage;