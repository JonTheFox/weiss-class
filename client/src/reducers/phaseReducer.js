const initPhaseReducer = ({
	phases = [],
	currentPhaseIndex = 0,
	wrapPhases = true
}) => {
	return {
		phases,
		numPhases: phases.length,
		currentPhaseIndex,
		currentPhase: phases[currentPhaseIndex],
		wrapPhases
	};
};

const phaseReducer = (state, action) => {
	const {
		phases,
		numPhases,
		//currentPhase,
		currentPhaseIndex,
		wrapPhases = true
	} = state;

	switch (action.type) {
		case "goNext":
			if (currentPhaseIndex >= numPhases - 1) {
				//currently in final phase.
				if (wrapPhases) {
					return {
						...state,
						currentPhaseIndex: 0,
						currentPhase: phases[0]
					};
				} else {
					//stay in current state, don't re-render,
					return state;
				}
			} else {
				//More phases to go. move forward.
				return {
					...state,
					currentPhaseIndex: currentPhaseIndex + 1,
					currentPhase: phases[currentPhaseIndex + 1]
				};
			}
		case "goBack":
			if (currentPhaseIndex <= 0) {
				//currently in start phase.
				if (wrapPhases) {
					return {
						...state,
						currentPhaseIndex: numPhases - 1,
						currentPhase: phases[numPhases - 1]
					};
				} else {
					//stay in place
					return state;
				}
			} else {
				//More phases left to go back to. move backward.
				return {
					...state,
					currentPhaseIndex: currentPhaseIndex - 1,
					currentPhase: phases[currentPhaseIndex - 1]
				};
			}
		case "goToStart":
			return {
				...state,
				currentPhaseIndex: 0,
				currentPhase: phases[0]
			};
		case "goToEnd":
			return {
				...state,
				currentPhaseIndex: numPhases - 1,
				currentPhase: phases[numPhases - 1]
			};
		default:
			throw new Error();
	}
};

export { initPhaseReducer };

export default phaseReducer;
