import React, {useState} from 'react'
import heartFilled from '../../svgs/heartFilled.svg'
import heartOutlined from '../../svgs/heartOutlined.svg'
import './Card.css'

const Card = ({ name, phone, email, image, favored}) => {

    const [isFavored, setIsFavored] = useState(favored)

    const toggleFavored = () => {
        setIsFavored(!isFavored)
    }

    return(
        <div className="card">
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
        </div>
    )
}

export default Card;