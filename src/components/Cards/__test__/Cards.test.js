import {screen, render} from '@testing-library/react'
import Cards from '../Cards'
import cats from '../../../mocks/cats.json'

describe("Cards", () => {
    test('shoudl render 5 card components', () => {
        render (<Cards cats={cats} />)

        expect(screen.getAllByRole('article').length).toBe(5)
    })
})