// string de conec com banco
// mongodb+srv://23012706:Leo037@cluster0.ljy9jv1.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const uniqueValidator = require('mongoose-unique-validator')

app.use(express.json());
app.use(cors());

const Filme = mongoose.model("Filme", mongoose.Schema({

    titulo: {
        type: String
    },
    sinopse: {
        type: String
    }

}))

const usuarioSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

async function conectarAoMongoDB() {
    await mongoose.connect(
        `mongodb+srv://23012706:Leo037@cnluster0.ljy9jv1.mongodb.net/?retryWrites=true&w=majority`
    )
}

let filmes = [
    {
        titulo: "Forrest Gump - O Contador de Histórias",
        sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gu" +
                "mp (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    }, {
        titulo: "Um Sonho de Liberdade",
        sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a" +
                " sua vida radicalmente modificada ao ser condenado por um crime que nunca come" +
                "teu, o homicídio de sua esposa e do amante dela"
    }
]

// GET http://localhost:3000/oi app.get('/oi', (req, res) => {
// res.send('oi') })

app.listen(3000, () => {
    try {
        conectarAoMongoDB()
        console.log("network ok and up and running");
    } catch (e) {
        console("erro:", e)
    }
})

//ponto de acesso para atener as requisições get filmes
app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)

})

//ponto de acesso para um nome filme em memoria
app.post("/filmes", async (req, res) => {
    //obtém os dados enviados pelo cliente
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //monta um objeto agrupando os dados. Ele representa um novo filme
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    //adiciona o novo filme à base
    await filme.save()
    const filmes = await Filme.find()
    // responde ao cliente. Aqui, optamos por devolver a base inteira ao cliente,
    // embora não seja obrigatório.
    res.json(filmes);
})

app.post('/signup', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const usuario = new Usuario({login: login, password: password})
    const respMongo = await usuario.save()
    console.log(respMongo)
    res.end()
})
