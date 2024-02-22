export const tipCalculator = (total, base, percent) => {
    if (total < 10) {
        return Number(base).toFixed(2)
    }
    else {
        return Math.floor((total * percent)).toFixed(2)
    }
}
