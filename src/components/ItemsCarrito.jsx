import React from 'react'
import { capitalizeStr } from '../js/capitalize'
import { formatoPrecio } from '../js/formatearMoneda'
import { useState, useContext } from 'react'
import { pizzaContext } from '../context/PizzaProvider'

const ItemsCarrito = ({ pizzaAgregada, cantidadPizzas }) => {

  const [numeroPizzas, setNumeroPizzas] = useState(cantidadPizzas)
  const {pizzasCarrito, setPizzasCarrito, listaPizzas, setListaPizzas} = useContext(pizzaContext);

  function incrementoYDecremento(operacion){

    if(operacion === "incrementar"){
      setNumeroPizzas(numeroPizzas+1)
      setPizzasCarrito([...pizzasCarrito, pizzaAgregada])
    }
    if(operacion === "restar" && numeroPizzas > 0){
      setNumeroPizzas(numeroPizzas-1)
      const indiceAEliminar = pizzasCarrito.findIndex((pizza)=>{
        return pizza.id === pizzaAgregada.id;
      })
      const nuevoArray = [...pizzasCarrito]
      nuevoArray.splice(indiceAEliminar, 1)
      setPizzasCarrito(nuevoArray)

      if(numeroPizzas === 1){
        const indiceAEliminar = listaPizzas.findIndex((pizza)=>{
          return pizza.id === pizzaAgregada.id;
        })
        const nuevoArray = [...listaPizzas]
        nuevoArray.splice(indiceAEliminar, 1)
        setListaPizzas(nuevoArray)
      }
    }
  }

  return (
    <>
      <div className='itemsCarrito'>
        <div className='itemsCarrito-img'>
          <img src={pizzaAgregada.img} alt={pizzaAgregada.name} />
          <h4>{capitalizeStr(pizzaAgregada.name)}</h4>
        </div>
        <div className='itemsCarrito-precioButtons'>
          <p>{formatoPrecio.format(pizzaAgregada.price*numeroPizzas)}</p>
          <button onClick={()=>{
            incrementoYDecremento("restar")
          }}>
            {numeroPizzas === 1 ? "🗑️" : "-"}
          </button>
          <p>{numeroPizzas}</p>
          <button onClick={()=>{
            incrementoYDecremento("incrementar");
          }}>
            +
          </button>
        </div>
      </div>
      <hr />
    </>
  )
}

export default ItemsCarrito