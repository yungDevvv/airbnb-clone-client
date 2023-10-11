import { useDatepicker, START_DATE } from "@datepicker-react/hooks";
import Month from "./Month";
import NavButton from "./NavButton";
import DatepickerContext from "./datepickerContext";
import { useEffect, useState } from "react";
import { useSearchStore } from "../../store/SearchStore";

const getPastDates = () => {
    let pastDates = [];
    let dateNow = new Date(), y = dateNow.getFullYear(), m = dateNow.getMonth(), d = dateNow.getDate();
    for (let i = 1; i < 55; i++) {
        pastDates.push(new Date(y, m, d - i))
    }
    return pastDates;
}

function Datepicker({
    unavailableDates,
    children
}) {
    const { startDate, endDate, focusedInput, updateDates } = useSearchStore(
        (state) => ({
            startDate: state.dateState.startDate,
            endDate: state.dateState.endDate,
            focusedInput: state.dateState.focusedInput,
            updateDates: state.updateDates
        })
    )
    const [state, setState] = useState({
        startDate: startDate ? new Date(startDate) : '',
        endDate: endDate ? new Date(endDate) : '',
        focusedInput: focusedInput
    })
    useEffect(() => {
        updateDates(state)
    }, [state.startDate, state.endDate])
    const {
        firstDayOfWeek,
        activeMonths,
        isDateSelected,
        isDateHovered,
        isFirstOrLastSelectedDate,
        isDateBlocked,
        isDateFocused,
        focusedDate,
        onDateHover,
        onDateSelect,
        onDateFocus,
        goToPreviousMonths,
        goToNextMonths
    } = useDatepicker({
        startDate: state.startDate,
        endDate: state.endDate,
        focusedInput: state.focusedInput,
        unavailableDates: unavailableDates ? [...unavailableDates.map(item => new Date(item)), ...getPastDates()] : [...getPastDates()],
        onDatesChange: handleDateChange
    });

    function handleDateChange(data) {
        if (data.startDate !== data.endDate) { // can't select same dates
            if (!data.focusedInput) {
                setState({ ...data, focusedInput: START_DATE });
            } else {
                setState(data);
            }
        }
    }
    return (
        <DatepickerContext.Provider
            value={{
                unavailableDates,
                focusedDate,
                isDateFocused,
                isDateSelected,
                isDateHovered,
                isDateBlocked,
                isFirstOrLastSelectedDate,
                onDateSelect,
                onDateFocus,
                onDateHover
            }}
        >
            {
                children
            }
            <div className="flex" style={{
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <NavButton style={new Date() > new Date(activeMonths[0].date) ? { display: "none" } : {}} onClick={goToPreviousMonths}><i className="lni lni-chevron-left"></i></NavButton>
                <NavButton style={{ marginLeft: "auto" }} onClick={goToNextMonths}><i className="lni lni-chevron-right"></i></NavButton>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${activeMonths.length}, 300px)`,
                    gridGap: "0 64px",
                    height: 0,
                    paddingBottom: "47%"
                }}
            >
                {activeMonths.map(month => (
                    <Month
                        key={`${month.year}-${month.month}`}
                        year={month.year}
                        month={month.month}
                        firstDayOfWeek={firstDayOfWeek}
                    />
                ))}
            </div>
        </DatepickerContext.Provider>
    );
}

export default Datepicker;
