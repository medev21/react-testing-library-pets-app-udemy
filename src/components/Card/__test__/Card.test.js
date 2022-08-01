import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PetsContext } from '../../Pets/Pets'
import Card from '../Card'
import cats from '../../../mocks/cats.json'

const cardProps = {
    name: 'Sydney',
    phone: "111-111-1111",
    email: 'laith@hotmail.com',
    image: {url: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', alt: 'cute cat'},
    favored: false,
    index: 1,
}

const renderCardComoponentWithProvider = (props) => {
    render(<PetsContext.Provider
        value={
            {
                cats,
                setCats: () => {}
            }
        }
    >
        <Card {...props}/>
    </PetsContext.Provider>)
}

describe('Card Component', () => {
    test('should show name of cat', () => {
        renderCardComoponentWithProvider(cardProps)

        expect(screen.getByRole('heading', {
            name: /sydney/i
        })).toBeInTheDocument()
    })

    test('should show the phone number', () => {
        renderCardComoponentWithProvider(cardProps)

        expect(screen.getByText(
            /111-111-1111/i
        )).toBeInTheDocument()
    })

    test('should show email', () => {
        renderCardComoponentWithProvider(cardProps)

        expect(screen.getByText(
            /laith@hotmail.com/i
        )).toBeInTheDocument()
    })

    test('should show image with correct source', () => {
        renderCardComoponentWithProvider(cardProps)

        expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url)
    })

    test('should show outlined heart', () => {
        renderCardComoponentWithProvider(cardProps)

        expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
        expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument()
    })

    test('should show filled heart', () => {
        renderCardComoponentWithProvider({...cardProps, favored: true})

        expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
        expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument()

    })

    test('should toggle heart status', () => {
        renderCardComoponentWithProvider(cardProps)

        userEvent.click(screen.getByRole('button'))

        expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
        expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument()

        userEvent.click(screen.getByRole('button'))

        expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
        expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument()
    })
})