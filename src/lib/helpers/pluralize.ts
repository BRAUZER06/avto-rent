/** Склонение слов в зависимости от числа.
 * @param {number} number - Число
 * @param {Array<string>} words - Массив склонений
 * @return {string}
 */

export default function pluralize(number: number, words: Array<string>) {
    return words[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
}
