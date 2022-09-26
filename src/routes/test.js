const express = require('express')

module.exports = app =>{
    const route = express.Router()
    app.use("/test",route)

    route.get("/",(req,res)=>{
        console.log("Funcionando")
        return res.send("It Work")
    })

}
