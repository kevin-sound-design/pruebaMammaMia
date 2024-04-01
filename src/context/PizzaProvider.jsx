import React, { useEffect } from 'react'
import { createContext } from 'react'
import pizzas from "../json/pizzas.json"
import { useState } from 'react';

export const pizzaContext = createContext();

const PizzaProvider = ({children}) => {
  
  const [pizzaData, setPizzaData] = useState(pizzas)
  const [pizzasCarrito, setPizzasCarrito] = useState([])
  const [listaPizzas, setListaPizzas] = useState([])
  const [precioTotal, setPrecioTotal] = useState(null)
  useEffect(() => {

    let sumaTotal = 0

    function calculoTotal(pizzasCarrito){
      for(let i = 0; i < pizzasCarrito.length; i++){
        sumaTotal+=pizzasCarrito[i].price;
      }
    }
    calculoTotal(pizzasCarrito);
    setPrecioTotal(sumaTotal);
  }, [pizzasCarrito])
  

  return (
    <pizzaContext.Provider value={{pizzaData, setPizzaData, pizzasCarrito, setPizzasCarrito, precioTotal, listaPizzas, setListaPizzas}}>
      {children}
    </pizzaContext.Provider>
  )
}

export default PizzaProvider