const express = require("express")
const server = express()

//pegar o DB
const db = require("./database/db")

//configurar pasta publica, aqui vamos tornar as subpastas inseridas na public visiveis ao index.

server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação

server.use(express.urlencoded({ extended:true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da aplicação

// página inicial
//req: requisiçao
//res: resposta
server.get("/",  (req, res) => {
    return res.render("index.html")
})



server.get("/create-point",  (req, res) => {

   // req.query: query Strings da nossa url
//    console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    //req.body: o corpo do formulario
    // console.log(req.body)

    //inserir dados no banco de dados
    //     // //inserir dados na tabela
        const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        )  VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData (err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com Sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

    // return res.send("ok")
})

server.get("/search",  (req, res) => {


    const search = req.query.search

    if(search == "") {
        return res.render("search-results.html", {total:0})
        //pesquisa vazia
    }

    //pegar os dados do banco de dados

    //consultar dados na tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length
        // console.log("Aqui estão seus registros:")
        // console.log(rows)

        //mostrar a pagina html com os dados do DB
        return res.render("search-results.html", { places: rows, total: total})
    })  
   
})

//ligar o servidor

server.listen(3000)