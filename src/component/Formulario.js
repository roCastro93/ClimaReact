import React, {useState} from 'react';

const Formulario = ({datosConsulta}) => {

     //State del componente
    //Busqueda = state, guardarBusqueda = this.setState();
    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
    })


    const handleChange = e => {
        // Cambiar el state
        guardarBusqueda({
            //Compia del state Siempre hacerla
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const consultarClima = e =>{
        e.preventDefault();

        //envia a component principal la busqueda
        datosConsulta(busqueda);
    }

    return (
        <form
            onSubmit={consultarClima}
        >
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad</label>
            </div>
            <div className="input-field col s12">
                <select 
                onChange={handleChange}
                name="pais"
                >
                    <option value="">--seleciona un pais--</option>
                    <option value="US">Estados unidos</option>
                    <option value="CL">Chile</option>
                    <option value="AR">Argentina</option>
                    <option value="MX">Mexico</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Peru</option>
                </select>
            </div>
            <div className="input-field col s12">
                <input type="submit" className="waves-effect waves-light btn-large btn-block yellow  accent-4" value="Buscar Clima"/>
            </div>
        </form>
    )
}

export default Formulario;
