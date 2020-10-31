import React, { Component } from 'react'
//importando a dependencia axios para consumir as API
import axios from 'axios'

export default class Cep extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super()
        this.state = {
            frete:{
                origem:'',
                destino:'',
                servico:'',
                peso:'',
                formato:'',
                comp:'',
                altura:'',
                largura:'',
                diametro:''
            },
            resultado:'',
            resultado2:''
        }
    }

    setFrete(e){
        e.persist();
        let value = e.target.value;

        this.setState(prevState => ({
            frete: { ...prevState.frete, [e.target.name]: value}
        }))
    }

    chama(){
        const url =`http://localhost:3001/cep/${this.state.frete.origem}`
        axios.get(url)
        .then(resposta => {
            this.setState({resultado: resposta.data})// atualiza o endereco 
            console.log(resposta)
        })
    }

    fretar(){

        axios.post(`http://localhost:3001/frete`, this.state.frete)
        .then(resposta => {
            console.log(resposta.data[0]); this.setState({resultado2: resposta.data[0]})
        })
    }
    render() {
        return (
            <div className="container">
                <h2>Exemplo de Consulta ao CEP </h2>
                <form>
                    <div className="form-group">
                        <label> CEP </label>
                        <input type="number" className="form-control" name="origem" value={this.state.frete.origem} onChange={e => this.setFrete(e)}/>
                    </div>
                    <div className="form-group">
                        <button type ="button" onClick={ e => this.chama()} className="btn btn-primary"> Consulta </button>
                    </div>
                    <div className="form-group">
                        <ul>
                            <li> Logradouro : {this.state.resultado.logradouro}</li>
                            <li> Bairro : {this.state.resultado.bairro}</li>
                            <li> Localidade : {this.state.resultado.localidade}</li>
                            <li> UF : {this.state.resultado.uf}</li>
                            <li> DDD : {this.state.resultado.ddd}</li>
                        </ul>
                    </div>

                    <div className='form-group'>
                        <label>Destino</label>
                        <input type="number" className="form-control" name="destino" value={this.state.frete.destino} onChange={e => this.setFrete(e)}/>
                    </div>

                    <div className='form-group'>
                        <label>Serviço</label>
                        <input type="number" className="form-control" name="servico" value={this.state.frete.servico} onChange={e => this.setFrete(e)}/>
                    </div>

                    <div className='form-group'>
                        <label>Peso</label>
                        <input type="number" className="form-control" name="peso" value={this.state.frete.peso} onChange={e => this.setFrete(e)}/>
                    </div>

                    <div className='form-group'>
                        <label>Formato</label>
                        <input type="number" className="form-control" name="formato" value={this.state.frete.formato} onChange={e => this.setFrete(e)}/>
                    </div>

                    <div className='form-group'>
                        <label>Comprimento</label>
                        <input type="number" className="form-control" name="comp" value={this.state.frete.comp} onChange={e => this.setFrete(e)}/>
                    </div>

                    <div className='form-group'>
                        <label>Altura</label>
                        <input type="number" className="form-control" name="altura" value={this.state.frete.altura} onChange={e => this.setFrete(e)}/>
                    </div>

                    <div className='form-group'>
                        <label>Largura</label>
                        <input type="number" className="form-control" name="largura" value={this.state.frete.largura} onChange={e => this.setFrete(e)}/>
                    </div>

                    <div className='form-group'>
                        <label>Diâmetro</label>
                        <input type="number" className="form-control" name="diametro" value={this.state.frete.diametro} onChange={e => this.setFrete(e)}/>
                    </div>

                    <div className='form-group'>
                        <button className="btn btn-primary" type="button" onClick={e => this.fretar()}>Consulta</button>
                    </div>

                    <div className="form-group">
                        <ul>
                            <li> Valor: {this.state.resultado2.Valor}</li>
                        </ul>
                    </div>
                </form>
            </div>
        )
    }
}