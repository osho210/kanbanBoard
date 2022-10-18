import type { Store, Dispatch, StoreCreator } from 'redux'
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

interface Window{
    __REDUX_DEVETOOLS_EXTENSION__?():Store
}

declare module 'react-redux' {
    interface DefaultRootState extends State { }
    function useDispatch<TDdispatch = Dispatch<Action>>(): TDdispatch
    function useStores<S = DefaultRootState>(): Store<S, Action>
}