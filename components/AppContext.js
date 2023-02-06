import { createContext, createRef, useState } from "react";

export const latitudeContext = createContext(0)
export const longitudeContext = createContext(0)
export const mapRef = createRef(null);
export const mapRefEdit = createRef(null);
export const filterContext = createContext(0)
export const rangeContext = createContext(null)
//console.log("filterContext value: ", filterContext._current_value)
export const tagData = [
    {label:'Fußball', value:'Fußball'},
    {label:'Basketball', value:'Basketball'},
    {label:'Schach', value:'Schach'},
    {label:'Kartenspiel', value:'Kartenspiel'},
    {label:'Tischtennis', value:'Tischtennis'},
    {label:'Picknick', value:'Picknick'},
    {label:'Shopping', value:'Shopping'},
    {label:'Treffen', value:'Treffen'}
  ]
export const userPosContext = createContext(0)
export const loggedInUser = createContext(0)
export const selectedUserContext = createContext(0)

export const editMarkerMode = createContext(false)
export const editMarkerValues = createContext([{
  creationDate: null,
  name: null,
  description: null,
  locationDescription: null,
  startDate: null,
  endDate: null,
  numberParticipants: null,
  tags: null,
  latitude: null,
  longitude: null
}])
export const editMarkerObject = createContext()

// export {latitudeContext}
