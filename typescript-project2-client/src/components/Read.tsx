
import axios from "axios";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";

export type Products = {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: string;
};

const Read = () => {
  const [products, setProducts] = useState<Products[]>([]);
  console.log(products);

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const response = await axios.get("http://localhost:3000/products");
    setProducts(response.data);
  };

const handleDelete = async ( id :string) => {
    console.log(id);
    try {
        const result = await axios.delete(`http://localhost:3000/products-delete/${id}`)
        console.log(result.data); 
    } catch (error) {
        console.log(error);
    }
}



  return (
    <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-4 px-5">
      {products.map((product) => (
        <div
          key={product._id}
          className="p-2 border-2 border-green-500/80 space-y-4"
        >
          <div className="h-[300px] w-full">
            <img className="h-full w-full object-cover" src={product.image} alt="" />
          </div>
          <div className="space-y-2">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
          <div className="flex justify-between flex-wrap gap-y-3">
            <button className="p-2 bg-green-400/60">Details</button>
            <button className="p-2 bg-green-400/60">Add To card</button>
            <button className="p-2 bg-green-400/60">Buy This</button>
            <button onClick={()=>handleDelete(product._id)} className="p-2 bg-green-400/60">Delete</button>
            <Link to={`/update/${product._id}`} className="p-2 bg-green-400/60">Update</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Read;