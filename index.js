const express = require ('express');
const app = express();
app.use(express.json());

let filmes = [
    {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    },
    {
    titulo: "Um Sonho de Liberdade",
    sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]



//GET http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
    })

app.listen(3000, () => console.log("up and running"));

//ponto de acesso para atener as requisições get filmes
app.get("/filmes", (req, res) => {
    res.json(filmes)
    })

    //ponto de acesso para um nome filme em memoria
app.post("/filmes", (req, res) => {
    //obtém os dados enviados pelo cliente
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //monta um objeto agrupando os dados. Ele representa um novo filme
    const filme = {
        titulo: titulo,
        sinopse: sinopse
    }
    //adiciona o novo filme à base
    filmes.push(filme);
    //responde ao cliente. Aqui, optamos por devolver a base inteira ao cliente, embora não seja obrigatório.
    res.json(filmes);
});
     

