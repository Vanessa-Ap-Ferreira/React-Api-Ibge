import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  const [state, setState] = useState({
    estado : ''
  });

  const loadRegioes = (UF: string) => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`)
      .then(response => response.json())
      .then(listaCidades => {
        setCidades(listaCidades.map((d: any) => ({id: d.id, nome: d.nome})));
      })
  }
  

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => response.json())
      .then(listaEstados => {
        setEstados(listaEstados.map((d: any) => ({id: d.sigla, nome: d.nome})));
      })

    // TODO Especifique como limpar depois desse efeito:
    return () => {};
  },[state.estado]);

  
  const listaEstadoRender = estados.map((d: any) => <option value={d.id}>{d.nome}</option>)

  const cidadesRender = cidades.map((d: any) => <option value={d.id}>{d.nome}</option>)


  function onChangeEstado(event: any) {
    console.log(event.target.value);
    setState({...state, estado: event.target.value});
    loadRegioes(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
      <label htmlFor="Estado">Escolha o Estado:</label>
        <select id="Estado" value={state.estado} onChange={onChangeEstado} >
          {listaEstadoRender}
        </select>

        <label htmlFor="Municipio">Escolha o Município:</label>
        <select id="Municipio">
          {cidadesRender}
        </select>

      </header>
    </div>
  );
}

export default App;
