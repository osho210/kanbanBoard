// ランダムな12文字の
export function randomID() {
    const alphabet =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-'

    let id = ''
    for (let i = 12; i > 0; i--) {
        id += alphabet[(Math.random() * 64) | 0]
    }

    return id
}