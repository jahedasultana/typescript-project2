import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export type CreateType = {
    image: string,
    title: string,
    price: string,
    description: string
}

const Create = () => {

    const [product, setProduct] = useState<CreateType>({

        image: "",
        title: "",
        price: "",
        description: ""
    });

    const handelCreate = async(e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(product);
        const res = await axios.post("http://localhost:3000/products-create",product);
        console.log(res.data);
        

    }

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,[e.target.name] : e.target.value,
        });
    };

    return (
        <div>
            <form onSubmit={handelCreate}>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <label className="block" htmlFor="image">Image</label>
                        <input className="block p-2 border border-green-500/85 w-full" type="text" name="image" id="image" placeholder="image" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block" htmlFor="title">title</label>
                        <input className="block p-2 border border-green-500/85 w-full" type="text" name="title" id="title" placeholder="title" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block" htmlFor="price">price</label>
                        <input className="block p-2 border border-green-500/85 w-full" type="number" name="price" id="price" placeholder="price" onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label className="block" htmlFor="description">description</label>
                        <input className="block p-2 border border-green-500/85 w-full" type="text" name="description" id="description" placeholder="description" onChange={handleInputChange}/>
                    </div>
                </div>
                <button className="p-2 bg-green-400/75 mt-6" type="submit">Post Data</button>
            </form>
        </div>
    );
};

export default Create;