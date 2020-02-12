/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import axios from 'axios';

const API = "http://localhost:4000/film/";

class FilmsRoomAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salas: [],
            peliculas: [],
            horarios: [],
            idsala: '',
            idpelicula: '',
            idhorario: '',
        }
    }
    
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        axios.get(API+"sala")
        .then(response => {
            this.setState({ salas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(API+"pelicula")
        .then(response => {
            this.setState({ peliculas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(API+"horario")
        .then(response => {
            this.setState({ horarios: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })
    }

    saveData = e => {
        e.preventDefault()
        console.log(this.state.idsala)
        this.post = {
            datos: {
                idsala: this.state.idsala,
                idpelicula: this.state.idpelicula,
                idhorario: this.state.idhorario,
            }
        }

        if (this.post.datos.idsala === "" ||
            this.post.datos.idpelicula === "" ||
            this.post.datos.idhorario === ""
            ) {
          alert("Complete todos los datos para continuar...");
        } else {
          axios.post(API+"sala_pelicula", this.post)
          .then(response => {
            if ( response.data.ok === true ) {
                alert("Asignación agregada exitosamente")
                window.location.assign("http://localhost:3000/films_room");
            }
          })
          .catch(error => {
            alert(error)
          })
        }
    };

    render() {
        const { salas, peliculas, horarios, idsala, idpelicula, idhorario } = this.state
        return(
            <div>
                <Sidebar />,
                <Header />,
                <div className="ml-64">
                    <hr />
                    <main className="my-8">
                        <p className="text-center my-5 text-2xl">Asignar Peliculas.</p>
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mx-8" onSubmit={ this.saveData }>
                            <p className="text-red text-xs italic">Coloque el número de la sala, pelicula y horario deseado.</p>
                            <hr />
                            <div className="-mx-3 md:flex mb-6 ">
                                <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="idsala">
                                        Sala
                                    </label>
                                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                                        type="number" 
                                        min="1"
                                        name="idsala"
                                        value={ idsala }
                                        onChange={ this.changeHandler } 
                                    />
                                </div>
                                <div className="md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="idpelicula">
                                        Pelicula
                                    </label>
                                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                                        type="number" 
                                        min="1"
                                        name="idpelicula"
                                        value={ idpelicula }
                                        onChange={ this.changeHandler } 
                                    />
                                </div>
                                <div className="md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="valorBoleto">
                                        Horario
                                    </label>
                                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                                        type="number"
                                        min="1"
                                        name="idhorario"
                                        value={ idhorario }
                                        onChange={ this.changeHandler } 
                                    />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex mb-6 ">
                                <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                                    { salas.map(element => <span className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" key={ element.id }> { element.id + " - " + element.nombre } </span>) }
                                </div>
                                <div className="md:w-1/3 px-3">
                                    { peliculas.map(element => <span className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" key={ element.id }> { element.id + " - " + element.titulo} </span>) }
                                </div>
                                <div className="md:w-1/3 px-3">
                                    { horarios.map(element => <span className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" key={ element.id }> { element.id + " - " + element.hora} </span>) }
                                </div>
                            </div>

                            <div className="mt-4">
                                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded" type="submit">Guardar</button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        )
    }
}

export default FilmsRoomAdd;