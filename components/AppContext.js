import { createContext, createRef, useState } from "react";

export const latitudeContext = createContext(0)
export const longitudeContext = createContext(0)
export const mapRef = createRef(null);
export const filterContext = createContext(0)
console.log("filterContext value: ", filterContext._current_value)
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