import '../styles/TripForm.css';
import { Trip } from "../models/Trip";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { FormEvent, useEffect, useRef, useState } from "react";
import DateRange from "../models/DateRange";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import DateRangePicker from "./DateRangePicker";
import { validateTripDays, validatePasscode, validateTripName } from "../logic/validation";
import { v4 as uuid } from "uuid";


function TripForm({trip = null, show, onClose, saveTrip}: {
  trip: Trip | null,
  show: boolean,
  onClose: () => void,
  saveTrip: (t: Trip) => Promise<void>,
}) {
  const [name, setName] = useState<string | null>(trip?.name ?? null);
  const [passcode, setPasscode] = useState<string | null>(trip?.passcode ?? null);
  const [allowedRange, setAllowedRange] = useState<DateRange | null>(trip?.allowedRange ?? null);
  const [minDays, setMinDays] = useState<number>(trip?.minDays ?? 0);
  const [maxDays, setMaxDays] = useState<number>(trip?.maxDays ?? 0);
  
  const isEdit = trip != null;
  
  const setNameSafe = (name: string) => {
    if (!validateTripName(name))
      return;
    
    setName(name);
  }

  const setPasscodeSafe = (passcode: string) => {
    if (!validatePasscode(passcode))
      return;
    
    setPasscode(passcode);
  }

  const setMinDaysSafe = (minDaysStr: string) => {
    const minDays = Number(minDaysStr);
    
    if (isNaN(minDays))
      return;
    if (!validateTripDays(minDays))
      return;
    
    setMinDays(minDays);
    
    if (maxDays < minDays) {
      setMaxDays(minDays);
    }
  }

  const setMaxDaysSafe = (maxDaysStr: string) => {
    const maxDays = Number(maxDaysStr);
    
    if (isNaN(maxDays))
      return;
    if (!validateTripDays(maxDays))
      return;
    
    setMaxDays(maxDays);
  }

  const onDecline = () => {
    setDataFromCurrentTrip();
    onClose();
  }

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (name == null || allowedRange == null)
      return;
    
    const newTrip: Trip = {
      id: trip?.id ?? uuid(),
      name: name,
      passcode: passcode,
      allowedRange: allowedRange,
      minDays: minDays,
      maxDays: maxDays,
      participants: null,
      isEdit: isEdit,
    }
    
    await saveTrip(newTrip);
    
    onClose();
  }
  
  const setDataFromCurrentTrip = () => {
    if (trip == null)
      return;

    setName(trip.name);
    setAllowedRange(trip.allowedRange);
    setPasscode(trip.passcode);
    setMinDays(trip.minDays);
    setMaxDays(trip.maxDays);
  }

  useEffect(() => {
    setDataFromCurrentTrip();
  }, [trip]);
  
  return (
    <Modal
      id={"trip-form"}
      root={document.body}
      show={show}
      size="md"
      onClose={onClose}
      dismissible
    >
      <ModalHeader>Trip</ModalHeader>
      <ModalBody>
        <form className="space-y-6" onSubmit={e => onSave(e)} onReset={onDecline}>
          <div>
            <div className="mb-0 ml-2 block">
              <Label htmlFor={"trip-name"} value="Name"/>
            </div>
            <TextInput
              id={"trip-name"}
              onChange={e => setNameSafe(e.target.value)}
              value={name ?? ""}
              placeholder="Barcelona, boyzzz"
              required
            />
          </div>
          <div>
            <div className="mb-0 ml-2 block">
              <Label htmlFor={"trip-passcode"} value="Passcode"/>
            </div>
            <TextInput
              id={"trip-passcode"}
              onChange={e => setPasscodeSafe(e.target.value)}
              value={passcode ?? ""}
              placeholder="NotThatSecurePasscode!23"
            />
          </div>
          <div className="flex">
            <div className="mr-1">
              <div className="mb-0 ml-2 block">
                <Label htmlFor={"trip-allowedRange"} value="Allowed Range"/>
              </div>
              <DateRangePicker
                onRangeChange={e => setAllowedRange(e)}
                initialValue={allowedRange}
                style={{padding: "20px 10px", textAlign: "left"}}
                required
              />
            </div>
            <div className="mr-2">
              <div className="mb-0 ml-2 block">
                <Label htmlFor={"trip-mindays"} value="Days"/>
              </div>
              <TextInput
                id={"trip-mindays"}
                addon="Min"
                onChange={e => setMinDaysSafe(e.target.value)}
                value={minDays}
                placeholder="10"
                required
                style={{minWidth: "40px"}}
              />
            </div>
            <div>
              <div className="mb-0 ml-2 block">
                <Label htmlFor={"trip-maxdays"} value="Days"/>
              </div>
              <TextInput
                id={"trip-maxdays"}
                addon="Max"
                onChange={e => setMaxDaysSafe(e.target.value)}
                value={maxDays}
                placeholder="14"
                required
                style={{minWidth: "40px"}}
              />
            </div>
          </div>
          <div className="buttons-container">
            <Button type="submit" color="success">{isEdit ? "Save" : "Create"}</Button>
            <Button type="reset" color="failure">Close</Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default TripForm;