import express form "express"

const app = express()
const PORT = 3000; 

app.use(cors())

app.get('/Login' , (req,res)=>{
    res.send("got login data ")
})


app.get('/getData' , (req,res)=>{
    res.send("got login data ")
})

app.listen(PORT , () =>{
    console.log("server is live on http://localhost:"+PORT)
})