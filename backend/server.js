// cria um objeto da dependencia do express
const express = require('express');
//vamo criar o server do express 
const app = express();
//porta que o servidor vai ouvir
const port = process.env.PORT || 3001;

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
//criar um objeto da dependencia do cors - segurança 
const cors = require('cors');
app.use(cors());
//importando para dependencia node-correios
const Correios = require('node-correios')
//instanciar para um objeto  variavel 

const correios = new Correios()



app.get('/cep/:cep', (req, res) => {
    let x = req.params.cep // recuperar o que usuario envia como parametro 
    console.log(x)
    correios.consultaCEP({cep: x})
    .then(result => {
        console.log(result)
        res.json(result) //devolve para o front end 
    })
    .catch(erro => {
        console.log(erro) // mostra no console o erro 
    })
});

app.post('/frete', (req,res) => {
    console.log(req.body)
    const args = {
        nCdServico: req.body.servico,
        sCepOrigem: req.body.origem,
        sCepDestino:req.body.destino,
        nVlPeso: req.body.peso,
        nCdFormato: req.body.formato, 
        nVlComprimento: req.body.comp,
        nVlAltura: req.body.altura,
        nVlLargura: req.body.largura,
        nVlDiametro: req.body.diametro
    }

    correios.calcPreco(args)
    .then(result =>{
        console.log(result)
        res.status(200).json(result)
    })

})
//associa o servidor ao cors 



//vamos definir uma rota com método get 
app.get('/cep',(req, res, next) => {
    res.send("Aplicação em node com os Correios");
})

//sobe o sevidor - colocar para ouvir 
app.listen(port, () =>{
    console.log(`Servidor rodando na porta $ ${port}`)
});
