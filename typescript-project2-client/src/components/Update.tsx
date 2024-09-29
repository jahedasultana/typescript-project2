import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CreateType } from "./Create";
import { useParams } from "react-router-dom";
import { Products } from "./Read";

const Update = () => {
    const [product, setProduct] = useState<CreateType>({
        title: "",
        image: "",
        description: "",
        price: "",
    });
    const [products, setProducts] = useState<Products>({
        _id: "",
        title: "",
        image: "",
        description: "",
        price: "",
    });
    const params = useParams();

    // Destructuring fields
    const { title, image, description, price } = products;

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:3000/products-single/${params?.id}`);
            setProducts(response.data?.result);
        };
        getData();
    }, [params?.id]);

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create an object to store only changed fields
        const updatedFields: Partial<CreateType> = {};

        if (product.title && product.title !== products.title) {
            updatedFields.title = product.title;
        }
        if (product.image && product.image !== products.image) {
            updatedFields.image = product.image;
        }
        if (product.description && product.description !== products.description) {
            updatedFields.description = product.description;
        }
        if (product.price && product.price !== products.price) {
            updatedFields.price = product.price;
        }

        // Check if there are any updated fields to send
        if (Object.keys(updatedFields).length === 0) {
            console.log("No fields updated.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/products-update/${params.id}`, updatedFields);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="px-5">
            <form onSubmit={handleUpdate}>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <label className="block" htmlFor="image">Image</label>
                        <input
                            className="block p-2 border border-green-500/85 w-full"
                            type="text"
                            name="image"
                            id="image"
                            placeholder="image"
                            defaultValue={image}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block" htmlFor="title">Title</label>
                        <input
                            className="block p-2 border border-green-500/85 w-full"
                            type="text"
                            name="title"
                            id="title"
                            placeholder="title"
                            defaultValue={title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block" htmlFor="price">Price</label>
                        <input
                            className="block p-2 border border-green-500/85 w-full"
                            type="number"
                            name="price"
                            id="price"
                            placeholder="price"
                            defaultValue={price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block" htmlFor="description">Description</label>
                        <input
                            className="block p-2 border border-green-500/85 w-full"
                            type="text"
                            name="description"
                            id="description"
                            placeholder="description"
                            defaultValue={description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <button className="p-2 bg-green-400/75 mt-6" type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default Update;