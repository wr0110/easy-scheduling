import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import RsvpTimePicker from "./RsvpTimePicker";

const RsvpAvailabilityPicker = ({
  bookings,
  friendWindow,
  setPickerStatus,
  setAvailableDateTime
}) => {
  const [availableDateInput, setAvailableDateInput] = useState([]);
  const [availableTimesInput, setAvailableTimesInput] = useState([]);

  const handleDatePick = (date) => {
    setAvailableDateInput(date);
  };

  const handleSlotSubmit = () => {
    if (availableDateInput.length > 0 && availableTimesInput.length > 0) {

      let availabilityArray = {
        date: availableDateInput,
        time: [...availableTimesInput.sort()]
      };
      setAvailableDateTime(prevInput => prevInput.concat(availabilityArray).sort());
      setPickerStatus(false);
    }
  }

  return (
    <div>
      <div className="flex flex-row gap-6">
        <div className="flex">
          <div className="flex flex-col gap-6">
            {/* Date picker corresponding to time picked */}
            <Flatpickr
              onChange={(browserDates, dateStr) => handleDatePick(dateStr)}
              className="invisible"
              options={{
                inline: true,
                minDate: friendWindow.startDate,
                maxDate: friendWindow.endDate,
              }}
            />
            <div className="border text-left rounded-sm p-3 text-xs">
              <span className="text-emerald-500">Green</span> at least one friend is available at that date and time.
            </div>
          </div>

        </div>
        <div>
          {/* Time picker corresponding to dates picked */}
          <RsvpTimePicker
            setAvailableTimesInput={setAvailableTimesInput}
            availableDateInput={availableDateInput}
            bookings={bookings}
          />
        </div>
      </div>
      <div className="flex mt-6 flex-row justify-center gap-6">
        <button
          className="btn"
          onClick={() => handleSlotSubmit()}>
          Add Availability
        </button>
        <button
          className="btn bg-gray-200"
          onClick={() => setPickerStatus(false)}>
          Chosen Slots
        </button>
      </div>
    </div>

  );
};


export default RsvpAvailabilityPicker;