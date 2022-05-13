const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { get } = require('express/lib/response');
const queryId = require('mongodb').ObjectId
const app = express();
const port = process.env.PORT || 5000;

// Middleware use 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('running my crud operations')
})


// UserName : dbUser21
// Password :RA213Q2abYAA1M7n

// MongoDB DataBase  Conected to Server 



const uri = "mongodb+srv://dbUser21:RA213Q2abYAA1M7n@cluster0.laant.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db('foodExpress').collection('user')
        // const user = { name: 'Mahiya Mahi khan', email: 'mahiyamahikhan@gmail.com' }
        // const result = await userCollection.insertOne(user);
        // console.log(`User inserted id ${result.insertedId}`)

        // Get data User

        app.get('/user', async (req, res) => {
            const query = {}
            const cursor = userCollection.find(query)
            const users = await cursor.toArray()
            res.send(users)
        })


        // Post data and collection User
        app.post('/user', async (req, res) => {
            const newUser = req.body
            console.log('adding to new user', newUser)
            const result = await userCollection.insertOne(newUser)
            res.send(result)
        })

        // Delete Data And Collection 

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally {

    }

}

run().catch(console.dir);




// Server Listening 
app.listen(port, () => {
    console.log('CRUD server is running');
});