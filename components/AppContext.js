import { createContext, createRef, useState } from "react";

export const latitudeContext = createContext(0)
export const longitudeContext = createContext(0)
export const mapRef = createRef(null);
export const filterContext = createContext(0)
console.log("filterContext value: ", filterContext._current_value)
export const tagData = [
    {key:'1', value:'Fußball'},
    {key:'2', value:'Basketball'},
    {key:'3', value:'Schach'},
    {key:'4', value:'Kartenspiel'},
    {key:'5', value:'Tischtennis'},
    {key:'6', value:'Picknick'},
    {key:'7', value:'Shopping'},
    {key:'8', value:'Treffen'}
  ]