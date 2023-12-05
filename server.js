const express = require('express')
const app = express()
const port = 3000
const Cliente=require('./models/cliente')
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cliente',async (req,res)=>{
    try {
        const cliente = await Cliente.find({});
        res.status(200).json(cliente)
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

app.get('/cliente/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const cliente = await Cliente.findById(id);
        res.status(200).json(cliente)
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

app.post('/cliente',async (req,res)=>{
    try{
        const cliente= await Cliente.create(req.body)
        res.status(200).json(cliente)
    } catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

app.put('/cliente/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const cliente=await Cliente.findByIdAndUpdate(id,req.body)
        if(!cliente){
            return res.status(404).json({message: 'Id nao encontrado'})
        } else{
        const updatedCliente= await Cliente.findById(id);
        res.status(200).json(updatedCliente)
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

app.delete('/cliente/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const  cliente= await Cliente.findByIdAndDelete(id);
        if(!cliente){
            return res.status(404).json({message: 'Id nao encontrado'})
        } else {
            res.status(200).json(cliente);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

mongoose.connect('mongodb+srv://Gabriel:1234@cluster0.8wdweim.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=> {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    console.log('connected to MongoDB')
}).catch((error)=>{
    console.log(error)
})

app.post('/', async (req, res) => {
    try {
        const novoCliente = await Cliente.create(req.body);
        res.status(201).json(novoCliente);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});
