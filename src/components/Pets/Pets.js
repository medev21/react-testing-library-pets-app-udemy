import React, { useEffect, useState, createContext } from 'react'
import './Pets.css'
import Filter from '../Filter/Filter'
import PetCards from '../Cards/Cards'
import axios from 'axios'

export const PetsContext = createContext({
    cats: [],
    setCats: () => {}
})

const Pets = () => {
    const [cats, setCats] = useState([])
    const [filteredCats, setFilteredCats] = useState([])
    const [filters, setFilters] = useState({
        gender: 'any',
        favored: 'any'
    })
    const fetchCats = async () => {
        const response = await axios.get("http://localhost:4000/cats")
        setCats(response.data)
        setFilteredCats(response.data)
    }

    useEffect(() => {
        fetchCats()
    }, [])

    useEffect(() => {
        let catsFiltered = [...cats]
        if(filters.gender !== 'any') {
            catsFiltered = catsFiltered.filter(cat => cat.gender === filters.gender)
        }
        if(filters.favored !== 'any'){
            catsFiltered = catsFiltered.filter((cat) => {
                return cat.favored === filters.favored
            })
        }
        setFilteredCats(catsFiltered)
    }, [filters])

    return(
        <div className="container">
            <div className="app-container">
                <PetsContext.Provider value={{ cats: filteredCats, setCats}}>
                    <Filter filters={filters} setFilters={setFilters}/>
                    <PetCards />
                </PetsContext.Provider>
            </div>
        </div>
    )
}

export default Pets;