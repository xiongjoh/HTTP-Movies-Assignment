import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const initialFormState = {
    id:'',
    title:'',
    director:'',
    metascore:'',
    stars:''
}

const AddMovie = (props) => {
    const {movies, setMovies} = props
    const [formValues, setFormValues] = useState(initialFormState)
    const history = useHistory()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormValues({
            ...formValues,
            [name]:value
        })
    }

    // add movie to api and state
    const handleAddMovie = (event) => {
        event.preventDefault()
        // converts stars to an array and adds in id based on length of movielist
        const updatedForm = {...formValues, stars:formValues.stars.split(','), id:(movies.length === 0 ? movies.length : movies.length+1)}
        axios.post('http://localhost:5000/api/movies', updatedForm)
        .then(res => {
            console.log(res)
            setMovies(res.data)
            history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <form onSubmit={handleAddMovie}>
            <label>Title:
                <input 
                name='title'
                type='text'
                value={formValues.title}
                onChange={handleChange}
                />
            </label>
            <label>Director:
                <input 
                name='director'
                type='text'
                value={formValues.director}
                onChange={handleChange}
                />
            </label>
            <label>Metascore:
                <input
                name='metascore'
                type='number'
                value={formValues.metascore}
                onChange={handleChange}
                />
            </label>
            <label>Stars:
                <input
                name='stars'
                type='text'
                value={formValues.stars}
                onChange={handleChange}
                />
            </label>
            <button>Add</button>
        </form>
    )
}

export default AddMovie