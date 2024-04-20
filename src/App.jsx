import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'
import './App.css'

const url = "http://localhost:3000/products"

function App() {

  const {data: items, httpConfig} = useFetch(url)
  
  const [products, setProducts] = useState([])

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  /*
  useEffect(() =>{
    async function fetchData(){
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
    }

    fetchData()
  }, [])
*/

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const product = {
      name,
      price
    }

    /*

    const res = await fetch("http://localhost:3000/products", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
      },
       body: JSON.stringify(product),
     });

     const addedProduct = await res.json()

     setProducts((prevProducts) => [...prevProducts, addedProduct])
    */

     httpConfig(product, "POST")
     setName("")
     setPrice("")
  }

  return (
    <>
      <h1>Lista de produtos</h1>
      <ul>
        {items && items.map((product) =>(
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>

      <div className="add-product">
        <p>Adicionar produto:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Nome: <input type="text" value={name} name='name' onChange={(e) => setName(e.target.value)}/>
            Preço: <input type="number" value={price} name='price' onChange={(e) => setPrice(e.target.value)}/>
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </>
  )
}

export default App
