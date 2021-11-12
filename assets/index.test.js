import {render} from '@testing-library/react'
import NAME_COMPONENT from './index'

describe('components/NAME_COMPONENT', () => {
    test('should render the components without any props', () => {
        const {container} = render(<NAME_COMPONENT />)
        expect(container.childNodes.length).toBeGreaterThan(0)
    })
})
