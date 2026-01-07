import { Provider } from 'react-redux' 
import { store, type RootState } from '../src/app/store'
import type { Decorator } from '@storybook/react-vite'
import { getStore } from '../src/app/utils'

export const withRedux: Decorator = (Story, context) => {

    const { redux } = context.parameters

    const currentStore = redux && redux.user ? getStore({user: redux.user as RootState['user']}) : store

    return (
        <Provider store={currentStore}>
            <Story />
        </Provider>
    )
}