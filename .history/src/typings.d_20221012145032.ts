import type {Store,Di}

declare const process: Prosess
interface Process {
    env: {
        NODE_ENV: 'development' | 'production'
        API_ENDPOINT?: string
    }
}