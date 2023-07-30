import '../styles/ParticipantForm.css';
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { Participant } from "../models/Participant";
import DateRange from "../models/DateRange";
import DateRangeList from "./DateRangeList";
import { Trip } from "../models/Trip";

function ParticipantForm({participant = null, setParticipant, isEdit, trip, show, onClose, saveParticipant}: { 
  participant: Participant | null,
  setParticipant: Dispatch<SetStateAction<Participant | null>>,
  trip: Trip,
  isEdit: boolean,
  show: boolean,
  onClose: () => void,
  saveParticipant: (p: Participant) => Promise<void>,
}) {
  const [name, setName] = useState<string>(participant?.name ?? "");
  const [preferredRanges, setPreferredRanges] = useState<DateRange[]>(participant?.preferredRanges ?? []);
  const [rejectedRanges, setRejectedRanges] = useState<DateRange[]>(participant?.rejectedRanges ?? []);
  
  const onDecline = () => {
    setDataFromParticipant(null);
    onClose();
  }
  
  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newParticipant: Participant = {
      id: participant?.id ?? 0,
      tripId: trip.id,
      name: name,
      preferredRanges: preferredRanges,
      rejectedRanges: rejectedRanges,
      isEdit: isEdit,
    };

    await saveParticipant(newParticipant);
    
    onClose();
  }
  
  const setDataFromParticipant = (p: Participant | null) => {
    setName(participant?.name ?? "");
    setPreferredRanges(participant?.preferredRanges ?? []);
    setRejectedRanges(participant?.rejectedRanges ?? []);
  }
  
  useEffect(() => {
    setDataFromParticipant(null);
  }, [participant]);
  
  return (
    <Modal
      id="participant-form"
      root={document.body}
      show={show}
      size="xl"
      dismissible
      onClose={onClose} 
    >
      <Modal.Header id="modal-header">Participant</Modal.Header>
      <Modal.Body>
        {!!trip.allowedRange && (
          <form className="space-y-6" onSubmit={e => onSave(e)} onReset={onDecline}>
            <div>
              <div className="mb-0 ml-2 block">
                <Label htmlFor="participant-name" value="Name"/>
              </div>
              <TextInput
                id="participant-name"
                onChange={e => setName(e.target.value)}
                value={name}
                placeholder="John Thomas"
                autoComplete="name"
                required
              />
            </div>
            <div className="dates-container">
              <DateRangeList
                datesText="Preferred dates"
                styleText="text-green-500"
                dateRanges={preferredRanges}
                setDateRanges={setPreferredRanges}
                tripDateRange={trip.allowedRange}
              />
              
              <div className="vl"/>
              
              <DateRangeList
                datesText="Rejected dates"
                styleText="text-red-500"
                dateRanges={rejectedRanges}
                setDateRanges={setRejectedRanges}
                tripDateRange={trip.allowedRange}
              />
            </div>
            <div className="buttons-container">
              <Button type="submit" color="success">{isEdit ? "Save" : "Add"}</Button>
              <Button type="reset" color="failure">Close</Button>
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ParticipantForm;