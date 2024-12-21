const initialState = {
    refreshKey: 0,
};

const refreshReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TRIGGER_REFRESH":
            return {
                ...state,
                refreshKey: state.refreshKey + 1,
            };
        default:
            return state;
    }
};

export default refreshReducer;
