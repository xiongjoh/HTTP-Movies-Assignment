import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialFormState = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

const UpdateMovie = props => {
    const { movies, setMovies, fetch, setFetch } = props
    const { id } = useParams()
    const history = useHistory()
    const [formValues, setFormValues] = useState(initialFormState)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res)
            setFormValues(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormValues({
            ...formValues,
            [name]:value
        })
    }

    const handleUpdate = (event) => {
        event.preventDefault()

        const updatedForm = {...formValues, stars:(Array.isArray(formValues.stars) ? formValues.stars : formValues.stars.split(',') )}

        axios.put(`http://localhost:5000/api/movies/${id}`, updatedForm)
        .then(res => {
            console.log(res.data)
            const updatedMoviesList = movies.map(movie => movie.id === id ? res.data : movie)
            setMovies(updatedMoviesList)
            setFetch(!fetch)
            history.push(`/movies/${id}`)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <form onSubmit={handleUpdate}>
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
            <button>Update</button>
        </form>
    )
}

export default UpdateMovie