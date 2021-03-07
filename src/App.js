import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import Formulario from './component/Formulario';
import Error from './component/Error';
import Clima from './component/Clima';


function App() {

  //State principal
  //ciudad  = state, guardar ciudad = this.setState();
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    //prevenir primera ejecucion
    if (ciudad === '') return;
    const consultarAPI = async () => {

      const appID = 'bdc286c94062147f0fcaccc0df1163dc';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

      //consultar la url
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarResultado(resultado);
    }
    consultarAPI();
  }, [ciudad, pais])



  const datosConsulta = datos => {
    //validad que ambos compos esten
    if (datos.ciudad === '' || datos.pais === '') {
      guardarError(true);
      return;
    }

    //Ciudad y pais existen agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }


  //Cargar un componente condicionalmente
  let componente;
  if (error) {
    //hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
  } else {
    //mostrar el clima
    componente = <Clima
                  resultado={resultado}
                />;
  }

  return (
    <div className="app">
      <Header
        titulo="React API de clima"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta} />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
