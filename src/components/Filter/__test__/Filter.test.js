import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Filter from '../Filter'

describe('Filter', () => {
    test('should be able to change value of favorite select', () => {
        render (<Filter filters={{}} setFilters={() => {}}/>)

        const select = screen.getByLabelText(/favorite/i)

        expect(select.value).toBe('any')
        userEvent.selectOptions(select, "favored")
        expect(select.value).toBe('favored')
        userEvent.selectOptions(select, "not favored")
        expect(select.value).toBe('not favored')

    })

    test('should be able to change value of gender select', () => {
        render (<Filter filters={{}} setFilters={() => {}}/>)

        const select = screen.getByLabelText(/gender/i)

        expect(select.value).toBe('any')
        userEvent.selectOptions(select, "male")
        expect(select.value).toBe('male')
        userEvent.selectOptions(select, "female")
        expect(select.value).toBe('female')

    })
})