const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wotzmkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        
        const database = client.db('CodeUse');
        const productsCollection = database.collection("products")

        // products post / create method
        app.post('/products-create', async (req, res) => {
            try {
                const body = req.body;
                console.log(body);
                const result = await productsCollection.insertOne(body)
                res.status(201).send({ messages: "products create successfully", status: 201, result })
            } catch (error) {
                res.status(500).send({ messages: "have an error, not create", status: 500, error })
            }
        });

        // all get data here
        app.get('/products', async (req, res) => {
            const result = await productsCollection.find().toArray()
            res.send(result)
        })

        app.get('/products-single/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const query = { _id: new ObjectId(id) }
                const result = await productsCollection.findOne(query)
                res.send({ message: "data get successfully", result })
            } catch (error) {
                res.send({ message: "single data get problem", error })
            }
        })

        // delete data
        app.delete('/products-delete/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                res.json({ message: 'Product deleted successfully', result });
            } catch (error) {
                console.error('Error deleting product:', error);
                res.status(500).json({ message: 'Server error while deleting product' });
            }
        });

        // update all products
        app.put('/products-update/:id',async(req,res)=>{
            const updatedData = req.body
            const id = req.params.id;

            console.log(updatedData);

            console.log(id,updatedData);
            const options = { upsert: true };

            const query = {_id: new ObjectId(id)}
            const update = {
                $set: {
                    ...updatedData
                }
            }

            const result = await productsCollection.updateOne(query,update,options)
            res.send({message: "data is updated",result})
        })
        

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send("this is Products server, you can use it")
});
app.listen(port, () => {
    console.log(`the TypeScript server running on ${port}`);
});