import { render, screen, within } from '@testing-library/react'
import Pets from '../Pets'
import catsMock from '../../../mocks/cats.json'

import { rest } from 'msw'
import { setupServer} from 'msw/node'
import userEvent from '@testing-library/user-event'

const server = setupServer(
    rest.get("http://localhost:4000/cats", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(catsMock)
        )
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers )
afterAll(() => server.close())

describe('Pets', () => {
    test('should render the correct amounts of cards', async () => {
        render(<Pets />)

        const cards = await screen.findAllByRole('article')
        expect(cards.length).toBe(5)
    })

    test('should filter for male cats', async () => {
        render(<Pets />)
        const cards = await screen.findAllByRole('article')
        userEvent.selectOptions(screen.getByLabelText(/gender/i), 'male')
        const maleCards = screen.getAllByRole('article')

        expect(maleCards).toStrictEqual([cards[1], cards[3]])
    })

    test('should filter for female cats', async () => {
        render(<Pets />)
        const cards = await screen.findAllByRole('article')
        userEvent.selectOptions(screen.getByLabelText(/gender/i), 'female')
        const femaleCards = screen.getAllByRole('article')

        expect(femaleCards).toStrictEqual([cards[0], cards[2], cards[4]])
    })

    test('should filter for favored cats', async () => {
        render(<Pets />)
        const cards = await screen.findAllByRole('article')
        const btnForFirstCard = within(cards[0]).getByRole('button')
        const btnForFourthCard = within(cards[3]).getByRole('button')

        userEvent.click(btnForFirstCard)
        userEvent.click(btnForFourthCard)
        
        userEvent.selectOptions(screen.getByLabelText(/favorite/i), 'favored')

        expect(screen.getAllByRole('article')).toStrictEqual([cards[0], cards[3]])
    })

    test('should filter for not favored cats', async () => {
        render(<Pets />)
        const cards = await screen.findAllByRole('article')
        const btnForFirstCard = within(cards[0]).getByRole('button')
        const btnForFourthCard = within(cards[3]).getByRole('button')

        userEvent.click(btnForFirstCard)
        userEvent.click(btnForFourthCard)
        
        userEvent.selectOptions(screen.getByLabelText(/favorite/i), 'not favored')

        expect(screen.getAllByRole('article')).toStrictEqual([cards[1], cards[2], cards[4]])
    })

    test("should filter for favored male cats", async ()=> {
        render(<Pets />)
        const cards = await screen.findAllByRole('article')
        const btnForFirstCard = within(cards[0]).getByRole('button')
        const btnForFourthCard = within(cards[3]).getByRole('button')

        userEvent.click(btnForFirstCard)
        userEvent.click(btnForFourthCard)

        userEvent.selectOptions(screen.getByLabelText(/favorite/i), 'favored')
        userEvent.selectOptions(screen.getByLabelText(/gender/i), 'male')

        expect(screen.getAllByRole('article')).toStrictEqual([cards[3]])
    })
})