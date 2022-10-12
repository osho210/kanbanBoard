import type { Store, Dispatch } from 'redux'
import type { State, Action } from './reducer'

declare gl

declare const process: Prosess
interface Process {
    env: {
        NODE_ENV: 'development' | 'production'
        API_ENDPOINT?: string
    }
}