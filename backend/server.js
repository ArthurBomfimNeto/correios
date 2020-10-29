// cria um objeto da dependencia do express
const express = require('express');

//vamo criar o server do express 
const server = express();

//criar um objeto da dependencia do cors - segurança 
const cors = require('cors');
//importando para dependencia node-correios
const Correios = require('node-correios')
//instanciar para um objeto  variavel 

const correios = new Correios()

server.use(cors());

server.get('/cep/:cep', (req, res) => {
    let user = req.params.cep // recuperar o que usuario envia como parametro 
    console.log(user)
    correios.consultaCEP({cep: user})
    .then(result => {
        console.log(result)
        res.json(result) //devolve para o front end 
    })
    .catch(erro => {
        console.log(erro) // mostra no console o erro 
    })
});

server.get('/frete/', (req,res) => {

    const args = {
        nCdServico: '04014',
        sCepOrigem: '14401295',
        sCepDestino: '14403646',
        nVlPeso: "1",
        nCdFormato: 10,
        nVlComprimento: 10,
        nVlAltura: 10,
        nVlLargura: 10,
        nVlDiametro: 10
    }

    correios.calcPreco(args)
    .then(result =>{
        console.log(result)
        res.status(200).json(result)
    })

})
//associa o servidor ao cors 



//porta que o servidor vai ouvir
const port = process.env.PORT || 3001;

//vamos definir uma rota com método get 
server.get('/cep',(req, res, next) => {
    res.send("Aplicação em node com os Correios");
})

//sobe o sevidor - colocar para ouvir 
server.listen(port, () =>{
    console.log(`Servidor rodando na porta $ ${port}`)
});
