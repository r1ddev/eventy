export const initialState = {
    activePanel: "start-loading",
    history: ["start-loading"]
}

const panels = (state, action) => {
    if (state === undefined) {
        return initialState
    }

    console.log(state)

    switch (action.type) {
        case 'GO':
            return {
                ...state,
                activePanel: action.payload,
                history: [...state.history, action.payload]
            };

        case 'GO_NO_HISTORY':
            return {
                ...state,
                activePanel: action.payload,
            };

        case 'HISTORY_NO_GO':
            return {
                ...state,
                history: [...state.history, action.payload]
            };

        case 'GO_BACK':
            let history = state.history;
            if ((history[history.length - 1]) == state.activePanel)
                return {
                    ...state,
                    activePanel: history[history.length - 2],
                    history: state.history.slice(0, history.length - 1)
                }

            return {
                ...state,
                activePanel: history[history.length - 1],
            };

        default:
            return state;
    }
};


export default panels;