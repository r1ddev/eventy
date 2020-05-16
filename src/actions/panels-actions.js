const go = (panel) => {
    window.history.pushState({ panel: panel }, panel);
    return {
        type: 'GO',
        payload: panel
    }
};

const goNoHistory = (panel) => {
    window.history.pushState({ panel: 'profile' }, 'profile');
    return {
        type: 'GO_NO_HISTORY',
        payload: panel
    }
};


const goBack = () => {
    return {
        type: 'GO_BACK',
    };
};

const historyNoGo = (panel) => {
    window.history.pushState({ panel: panel }, panel);
    return {
        type: 'GO',
        payload: panel
    }
};


export {
    go,
    goNoHistory,
    goBack,
    historyNoGo
};