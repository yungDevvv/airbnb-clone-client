import React from "react";

export const datepickerContextDefaultValue = {
  unavailableDates: [],
  focusedDate: null,
  isDateFocused: () => false,
  isDateSelected: () => false,
  isDateHovered: () => false,
  isDateBlocked: () => false,
  isFirstOrLastSelectedDate: () => false,
  onDateFocus: () => {},
  onDateHover: () => {},
  onDateSelect: () => {}
};

export default React.createContext(datepickerContextDefaultValue);
