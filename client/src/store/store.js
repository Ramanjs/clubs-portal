import { configureStore  } from '@reduxjs/toolkit'
import userReducer from '../features/user/user'

const store = configureStore({
    reducer: {
        user: userReducer
    },
})

export { store }
