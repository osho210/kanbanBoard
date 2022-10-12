import type { Store, Dispatch } from 'redux'
import type { State, Action } from './reducer'

declare global {
    const process: Process
    declare const process: Prosess
    interface Process {
        env: {
            NODE_ENV: 'development' | 'production'
            API_ENDPOINT?: string
        }
    }
}

declare module 'react-redux'{
    interface DefaultRootState extends 
}