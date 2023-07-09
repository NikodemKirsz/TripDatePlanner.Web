import '../styles/ParticipantsSummary.css';
import Participant from "../models/Participant";
import {Button, Table} from 'flowbite-react';
import {RxCross2} from 'react-icons/rx'
import {FiSettings} from 'react-icons/fi'

function ParticipantsSummary({participants}: { participants: Participant[] }) {
  return (
    <Table id="participant-summary" hoverable>
      <Table.Head>
        <Table.HeadCell className="name-cell">
          Name
        </Table.HeadCell>
        <Table.HeadCell className="pdays-cell">
          Preferred Days
        </Table.HeadCell>
        <Table.HeadCell className="rdays-cell">
          Rejected Days
        </Table.HeadCell>
        <Table.HeadCell className="edit-cell">
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
        <Table.HeadCell className="remove-cell">
          <span className="sr-only">Remove</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {participants.map(p =>
          <Table.Row
            key={p.id}
            style={{cursor: "default"}}
          >
            <Table.Cell className="name-cell">
              {p.name}
            </Table.Cell>
            <Table.Cell className="pdays-cell">
              12
            </Table.Cell>
            <Table.Cell className="rdays-cell">
              54
            </Table.Cell>
            <Table.Cell className="edit-cell">
              <Button color="warning" size="xs" className="mx-1">
                <FiSettings size={14}/>
              </Button>
            </Table.Cell>
            <Table.Cell className="remove-cell">
              <Button color="failure" size="xs" className="mx-1">
                <RxCross2 size={14}/>
              </Button>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

export default ParticipantsSummary;