
import { useRef, useContext } from "react";
import { useDay } from "@datepicker-react/hooks";
import DatepickerContext from "./datepickerContext";
import { getColor, getStyle } from "../../utils/getColor";

function Day({ dayLabel, date }) {
  const dayRef = useRef(null);
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover
  } = useContext(DatepickerContext);
  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef
  });
  if (!dayLabel) {
    return <div />;
  }

  const getColorFn = getColor(
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate
  );
  const getStyleFn = getStyle(
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate
  )
  const dayStyle = {
    padding: "8px",
    border: 0,
    color: getColorFn({
      selectedFirstOrLastColor: "#FFFFFF",
      normalColor: "#001217",
      selectedColor: "#FFFFFF",
      rangeHoverColor: "#FFFFFF",
      disabledColor: "#808285"
    }),
    background: getColorFn({
      selectedFirstOrLastColor: "#00aeef",
      normalColor: "#FFFFFF",
      selectedColor: "#71c9ed",
      rangeHoverColor: "#71c9ed",
      disabledColor: "#FFFFFF"
    }),
    ...getStyleFn({
      disabledDateStyle: {
        textDecoration: "line-through"
      }
    })
  }
  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      style={dayStyle}
    >
      {dayLabel}
    </button>

  );
}

export default Day;
