import type { Store, Dispatch } from 'redux'
import type {State,Action} from ''

declare const process: Prosess
interface Process {
    env: {
        NODE_ENV: 'development' | 'production'
        API_ENDPOINT?: string
    }
}