import type { Store, Dispatch, StoreCreator, StoreEnhancer } from 'redux'
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

interface Window {
    // https://github.com/zalmoxisus/redux-devtools-extension
    __REDUX_DEVTOOLS_EXTENSION__?(): StoreEnhancer
}

declare module 'react-redux' {
    interface DefaultRootState extends State { }
    function useDispatch<TDdispatch = Dispatch<Action>>(): TDdispatch
    function useStores<S = DefaultRootState>(): Store<S, Action>
}
}