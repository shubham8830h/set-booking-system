import { useEffect, useState } from "react";
import SEATS from "../constants/SeatOptions";

import Button from "../library/Button";
import { Row, Label, Col, Pagination } from "reactstrap";
import SingleSeat from "../library/SingleSeat";
import { useNavigate } from "react-router-dom";

const notAvailableSeat = ["K2", "I4", "I9"];

export default function SeatBooking({ onNext, seatSelection }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const navigate = useNavigate();
  function handleUpdateSelection(seatKey) {
    console.log(seatSelection.seatCount, selectedSeats.length);
    if (seatSelection.seatCount <= selectedSeats.length) {
      const ssss = [...selectedSeats, seatKey];
      ssss.shift();
      setSelectedSeats(ssss);
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  }

  function RenderSeatsRow({ structure }) {
    var rows = [];
    for (let i = 1; i <= structure.totalPlaces; i++) {
      rows.push(
        <SingleSeat
          seatNumber={i}
          row={structure.row}
          blank={!structure.seats.includes(i)}
          selected={selectedSeats.includes(`${structure.row}${i}`)}
          updateSelected={handleUpdateSelection}
          available={availableSeats.includes(`${structure.row}${i}`)}
        />
      );
    }
    return rows;
  }
  function getAvailableSeats() {
    let string = JSON.stringify(notAvailableSeat.flat());
    let setitem = localStorage.setItem("setdata", string);
    let getItem = localStorage.getItem("setdata");
    notAvailableSeat.push({ ...notAvailableSeat, selectedSeats });

    const availableSeats = [];
    SEATS.SEAT_TYPE.map((itemType) => {
      SEATS.SEAT_STRUCTURE[itemType.type].map((rowItem) => {
        rowItem.seats.map((seatItem) =>
          !getItem.includes(`${rowItem.row}${seatItem}`)
            ? availableSeats.push(`${rowItem.row}${seatItem}`)
            : null
        );
      });
    });
    return availableSeats;
  }
  useEffect(() => {
    const availableSeats = getAvailableSeats();
    setAvailableSeats(availableSeats);
    handleAutoSelection();
  }, []);

  function handleAutoSelection() {
    const selectedTeam = [];
    // console.log("seats", SEATS.SEAT_STRUCTURE[seatSelection.seatType]);
   
    SEATS.SEAT_STRUCTURE[seatSelection.seatType].map((seatRow) => {
      seatRow.seats.map((seat) => {
        console.log(` hii ${seatRow.row}`);
        if (
          !notAvailableSeat.includes(`${seatRow.row}${seat}`) &&
          selectedTeam.length < seatSelection.seatCount &&
          seatRow.row.includes(seatRow.row)
        ) {
          selectedTeam.push(`${seatRow.row}${seat}`);
        }
      });
    });
    setSelectedSeats(selectedTeam);
  }

  function handleNext() {
    notAvailableSeat.push(selectedSeats);
    let string = JSON.stringify(notAvailableSeat.flat());
    let setitem = localStorage.setItem("setdata", string);
    let getItem = localStorage.getItem("setdata");
    navigate("/confirm");

    
      console.log({...notAvailableSeat})
   
  }

  function handlePrev() {
    navigate("/");
  }
  return (
    <Row>
      <Col>
        <Label>Select your desired seat</Label>
        {SEATS.SEAT_TYPE.map((item) => (
          <Row key={`${item.type}_type`}>
            <Label>{item.title}</Label>
            {SEATS.SEAT_STRUCTURE[item.type].map((itemRow) => (
              <Row key={itemRow.row}>
                <Pagination aria-label="Page navigation example">
                  <RenderSeatsRow structure={itemRow} />
                </Pagination>
              </Row>
            ))}
          </Row>
        ))}
      </Col>
      <Label>
        Price : ₹
        {SEATS.SEAT_PRICE[seatSelection.seatType] * seatSelection.seatCount}.00
      </Label>
      <Row>
        <Col>
          <Button onClick={handlePrev} title="Prev" />{" "}
          <Button onClick={handleNext} title="Next" />
        </Col>
      </Row>
    </Row>
  );
}
