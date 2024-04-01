import React, { useContext } from 'react'
import { pizzaContext } from '../context/PizzaProvider'
import ItemsCarrito from '../components/itemsCarrito';
import { formatoPrecio } from '../js/formatearMoneda';

const Carrito = () => {

  const { pizzasCarrito, setPizzasCarrito, precioTotal, listaPizzas, setListaPizzas } = useContext(pizzaContext);
  
  function pagar(){
    alert(`Se acaba de realizar un pago por ${formatoPrecio.format(precioTotal)} pesos.`)
    setListaPizzas([])
    setPizzasCarrito([])
  }

  return (
    <>
      <div className='container containerCarrito'>
        <h1>Detalles del pedido:</h1>
        <div className='elementosCarrito'>
          {listaPizzas.length > 0 ? (
            listaPizzas.map((pizza) =>{
              const cantidadPizzas = pizzasCarrito.filter((cantidad) =>{
                return cantidad.id === pizza.id;
              })
              return <ItemsCarrito key={pizza.id} pizzaAgregada = {pizza} cantidadPizzas = {cantidadPizzas.length} />
            })
          ): (
            <div className='carroVacio'>
              <p>El carrito está vacío 🛒</p>
              <br />
              <p>😞</p>
            </div>
          )}
        </div>
        <div className='totalIrAPagar'>
          <h2>{formatoPrecio.format(precioTotal)}</h2>
          <button onClick={pagar}>Ir A Pagar</button>
        </div>
      </div>
    </>
    
  )
}

export default Carrito