// ランダムな12文字の文字列を作成
export function randomID() {
    const alphabet =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-'

    let id = ''
    for (let i = 12; i > 0; i--) {
        id = alphabet[(Math.random() * 64) | 0]
    }

    return id
}


export function sortBy<
    E extends { id: Exclude<V, null> },
    V extends string | null
>(list: E[], order: Record<string, V>, head: Exclude<V, null>) {
    const map = list.reduce((m, e) => m.set(e.id, e), new Map<V, E>())

    const sorted: typeof list = []

    let id = order[head]
    for (let i = list.length; i > 0; i--) {
        if (!id || id === head) break

        const e = map.get(id)
        if (e) sorted.push(e)

        id = order[id as Exclude<V, null>]
    }

    return sorted
}