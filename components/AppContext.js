import { createContext, createRef } from "react";

export const latitudeContext = createContext(0)
export const longitudeContext = createContext(0)
export const mapRef = createRef(null);


// export {latitudeContext}