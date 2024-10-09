const express = require("express");
const app = express();
const port = process.env.port || 3001;
const cors = require("cors");

app.use(cors())

const users = require('./db.json');

const { Client,Pool } = require('pg');

const client = new Client({
	user: 'postgres',
	password: 'postgres',
	host: 'localhost',
	database: 'BIGBRAIN',
    //DB:'testdb',
    pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
    }

});


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

client.connect()

app.get("/",(req, res) => {
    res.send("Hello There!!");
    
});

app.get('/users', async (req, res) => {
  //res.json(users)
  try {
    //let results = await client.query('SELECT * FROM users')
    //res.json(results)
    const {rows} = await client.query('SELECT * FROM users')
    res.json(rows)

  } catch (error) {
    console.error('Error fetching users:', error.message)
    res.status(500).json({ error: 'Error fetching users' })
  }
});

app.get('/users/:id',async (req, res)=>{
    const id = req.params.id
    //res.json(users.find(user => user.id === Number(req.params.id)))
    try {
        //let results = await client.query('SELECT * FROM users')
        //res.json(results)
        const {rows} = await client.query(`SELECT * FROM users WHERE id = ${id}`)
        await res.json(rows)
    
      } catch (error) {
        console.error('Error :', error.message)
        res.status(500).json({ error: 'Error' })
      }

})

app.post('/users', async(req, res) => {
    //users.push(req.body)
    //const json = req.body
    //res.send(`Add new user '${json.username}' completed.`)
    const data = req.body
    //res.json(data)

    try {
        //let results = await client.query('SELECT * FROM users')
        //res.json(results)
        await client.query(`INSERT INTO users (id,username,name) values (${data.id}, '${data.username}', '${data.name}')`)
        await res.json(data)

      } catch (error) {
        console.error('Error :', error.message)
        res.status(500).json({ error: 'Error' })
    }


})

app.put('/users/', async(req,res) => {
    /*const updateIndex = users.findIndex(user => user.id === Number(req.params.id))

    res.send(`Update user id : '${users[updateIndex].id}' Completed. `)*/
    //const id = req.params.id
    const data = req.body
    

    try {
        
        await client.query(`UPDATE users set username= '${data.username}' ,name= '${data.name}' WHERE id= ${data.id}`)
        await res.json(data)
      } catch (error) {
        console.error('Error :', error.message)
        res.status(500).json({ error: 'Error' })
    }
})

app.delete('/users/:id', async (req, res) => {
    /*const deletedIndex = users.findIndex(user => user.id === Number(req.params.id))
    res.send(`Delete user '${users[deletedIndex].username}' completed.`)*/

    const id = req.params.id
    //res.json(data)

    try {
        
        await client.query(`DELETE FROM users WHERE id= ${id}`)
        res.json(`Delete id: ${id} complete .`)

      } catch (error) {
        console.error('Error :', error.message)
        res.status(500).json({ error: 'Error' })
    }
})



app.listen(port,()=>{
    console.log("Starting at port: "+port);
});
