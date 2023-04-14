import { useState } from "react";
import { Container, Row } from "reactstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SeatBooking from "./pages/SeatBooking";
import SelectSeatType from "./pages/SelectSeatType";
import Confirmation from "./pages/Confirmation";
import TAB_OPTIONS from "./constants/TabOptions";
export default function App() {
  const [tab, setTab] = useState(TAB_OPTIONS.SEAT_TYPE);
  const [seatSelection, setSeatSelection] = useState({});
  function handleTabChange(tab, seatSelection) {
    setTab(tab);
    setSeatSelection(seatSelection);
  }
  return (
    <Container>
    <BrowserRouter>
      <Row>
        <h1>Welcome to My Cenema ticket booking system</h1>
      </Row>
      <Routes>
        <Route
          path="/"
          element={
            tab === TAB_OPTIONS.SEAT_TYPE ? (
              <SelectSeatType onNext={handleTabChange} />
            ) : null
          }
        ></Route>
        {/* {tab === TAB_OPTIONS.SEAT_TYPE ? (
            <SelectSeatType onNext={handleTabChange} />
          ) : null} */}
        <Route
          path="/sets"
          element={
            tab === TAB_OPTIONS.SEAT_SELECTION ? (
              <SeatBooking
                onNext={handleTabChange}
                seatSelection={seatSelection}
              />
            ) : null
          }
        ></Route>
        {/* {tab === TAB_OPTIONS.SEAT_SELECTION ? (
          <SeatBooking onNext={handleTabChange} seatSelection={seatSelection} />
        ) : null} */}
        <Route path="/confirm" element={<Confirmation />}></Route>
      </Routes>
    </BrowserRouter>
    </Container>
  );
}
