import Card from '../Card/Card'
import './Cards.css'

const Cards = ({ cats, setCats }) => {

    const updateFavorite = (index, favored) => {
        const updateCats = [...cats]
        updateCats[index].favored = favored
        setCats(updateCats)
    }
    return(
        <div className="pet-cards-container">
            {cats.map((cat, index)=> {
                return <Card
                    key={cat.id}
                    name={cat.name}
                    phone={cat.phone}
                    email={cat.email}
                    image={cat.image}
                    favored={cat.favored}
                    updateFavorite={updateFavorite}
                    index={index}
                />
            })}
        </div>
    )
}

export default Cards;