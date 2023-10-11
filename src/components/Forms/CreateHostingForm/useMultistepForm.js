import { useState } from "react"

export function useMultistepForm(steps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(+sessionStorage.getItem('form-phase') || 0)

    function next() {
        sessionStorage.removeItem('form-phase');

        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) {
                sessionStorage.setItem('form-phase', +currentStepIndex);
                return i;
            }
            sessionStorage.setItem('form-phase', +currentStepIndex + 1);
            return i + 1
        })
    }

    function back() {
        sessionStorage.removeItem('form-phase');

        setCurrentStepIndex(i => {
            if (i <= 0) {
                sessionStorage.setItem('form-phase', +currentStepIndex);
                return i;
            }
            sessionStorage.setItem('form-phase', +currentStepIndex - 1);
            return i - 1
        })
    }

    function goTo(index) {
        setCurrentStepIndex(index)
    }

    return {
        currentStepIndex,
        currentForm: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        stepsLength: steps.length,
        goTo,
        next,
        back,
    }
}