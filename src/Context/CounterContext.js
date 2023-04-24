import { createContext, useState } from "react";

export let CounterContext = createContext(0)
export default function CounterContextProvider(props){




    return <CounterContext.Provider >


    {props.chilren}

    </CounterContext.Provider>
}