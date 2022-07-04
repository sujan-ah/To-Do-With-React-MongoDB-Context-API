import { useReducer,createContext } from "react";

const Store = createContext()

const initialState = {
    todo: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case "TODOLIST":
        return {
            ...state,
            todo: action.payload,
        };
        default:
        return state;
    }
};

function StoreProvider(props) {
    const [todoState, todoDispatch] = useReducer(reducer, initialState);

    const value = {todoState, todoDispatch}

    return <Store.Provider value={value}>
        {props.children}
    </Store.Provider>
}

export { Store, StoreProvider }