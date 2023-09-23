export function getColumnName(length: number, from: string = 'A') {
    const letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const fromPosition: number = letters.indexOf(from)
    const position: number = length + fromPosition

    if (position < 26) {
        return letters.charAt(position - 1)
    } else {
        const firstLetterPosition: number = position % 26
        const secondLetterPosition: number =
            parseInt((position / 26).toFixed(1)) - 1

        return (
            letters.charAt(secondLetterPosition) +
            letters.charAt(firstLetterPosition)
        )
    }
}
