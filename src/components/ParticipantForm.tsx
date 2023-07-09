import '../styles/ParticipantForm.css';
import Participant from "../models/Participant";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import DateRange from "../models/DateRange";
import { FiPlusCircle } from 'react-icons/fi';
import DateOnly from "../models/DateOnly";
import { RxCross2 } from "react-icons/rx";
import { Indexed } from "../models/Indexed";
import DateRangeList from "./DateRangeList";

function ParticipantForm({participant, show, onClose}: { 
  participant: Participant | null, 
  show: boolean,
  onClose: () => void,
}) {
  const datesExample: Indexed<DateRange>[] = [
    {id: "1", entity: new DateRange(DateOnly.today(), DateOnly.today())},
    {id: "2", entity: new DateRange(DateOnly.today(), DateOnly.today())},
    {id: "3", entity: new DateRange(DateOnly.today(), DateOnly.today())},
    {id: "4", entity: new DateRange(DateOnly.today(), DateOnly.today())},
    {id: "5", entity: new DateRange(DateOnly.today(), DateOnly.today())},
    {id: "6", entity: new DateRange(DateOnly.today(), DateOnly.today())},
    {id: "7", entity: new DateRange(DateOnly.today(), DateOnly.today())},
    {id: "8", entity: new DateRange(DateOnly.today(), DateOnly.today())},
  ]                
  
  const [preferredDates, setPreferredDates] = useState<Indexed<DateRange>[]>(datesExample);
  const [rejectedDates, setRejectedDates] = useState<Indexed<DateRange>[]>([]);
  
  
  
  return (
    <Modal
      id="participant-form"
      show={show}
      size="xl"
      popup
      dismissible
      onClose={onClose} 
    >
      <Modal.Header id="modal-header">
        &nbsp;&nbsp;&nbsp;Participant
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <div className="mb-0 ml-2 block">
              <Label htmlFor="name" value="Name"/>
            </div>
            <TextInput id="name" placeholder="John Thomas" required/>
          </div>
          <div className="dates-container">
            <DateRangeList
              datesText="Preferred dates"
              styleText="text-green-500"
              dateRanges={preferredDates}
              setDateRanges={setPreferredDates}
            />
            <div className="vl"/>
            <DateRangeList
              datesText="Rejected dates"
              styleText="text-red-500"
              dateRanges={rejectedDates}
              setDateRanges={setRejectedDates}
            />
          </div>
          <div className="buttons-container">
            <Button
              onClick={onClose}
              color="success"
            >
              Save
            </Button>
            <Button
              onClick={onClose}
              color="failure"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ParticipantForm;