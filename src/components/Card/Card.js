import React, {useState, useContext} from 'react'
import heartFilled from '../../svgs/heartFilled.svg'
import heartOutlined from '../../svgs/heartOutlined.svg'
import { PetsContext } from '../Pets/Pets'
import './Card.css'

const Card = ({ name, phone, email, image, favored, index}) => {
    const { cats, setCats } = useContext(PetsContext)
    const [isFavored, setIsFavored] = useState(favored)

    const updateFavorite = (index, favored) => {
        const updateCats = [...cats]
        updateCats[index].favored = favored
        setCats(updateCats)
    }

    const toggleFavored = () => {
        updateFavorite(index, !isFavored)
        setIsFavored(!isFavored)
    }

    return(
        <article className="card">
            <div className="card-header">
                <img src={image.url} alt={image.alt} className='card-img'/>
                <button
                    className='heart'
                    onClick={toggleFavored}
                >
                    {isFavored ? (
                        <img src={heartFilled}
                            alt='filled heart'
                        />
                    ): (
                        <img
                            src={heartOutlined}
                            alt='outlined heart'
                        />
                    )}
                </button>
            </div>
            <div className="card-content">
                <h3>{name}</h3>
                <p>{phone}</p>
                <p>{email}</p>
            </div>
        </article>
    )
}

export default Card;