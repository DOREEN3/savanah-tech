"use client";

import {Provider} from "react-redux";
import {store} from "./index";
export default function storeProvider({
    children,

}:{
    children:React.ReactNode,
}){
    return(<Provider store={store}>{children}</Provider>);
}
