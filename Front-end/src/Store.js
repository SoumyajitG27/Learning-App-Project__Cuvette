import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    courseStore: {
        storeItems: []
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'STORE_ADD_ITEM':
            // const newItem = action.payload;
            // const existItem = state.courseStore.storeItems.find(
            //     (item) => item._id === newItem.id);
            // const storeItems = existItem ? state.courseStore.storeItems.map((item) =>
            //     item._id === existItem._id ? newItem : item)
            //     :
            //     [...state.courseStore.storeItems, newItem];
            // return { ...state, courseStore: { ...state.courseStore, storeItems } };

            return {
                ...state,
                courseStore: {
                    ...state.courseStore,
                    storeItems: [...state.courseStore.storeItems, action.payload],
                }
            };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>
        {props.children}
    </Store.Provider>
}