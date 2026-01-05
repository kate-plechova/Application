import { Provider } from 'react-redux' 
import { store } from '../src/app/store'
import type { Decorator } from '@storybook/react-vite'

export const withRedux: Decorator = (Story) => {
    return (
        <Provider store={store}>
            <Story />
        </Provider>
    )
}