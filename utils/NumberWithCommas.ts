export const numberWithCommas = (x: string, y: number = 8) => {
    const ammount = x?.toString().replace(/\B(?=(\d{9})+(?!\d))/g, ',');
    return parseFloat(ammount).toFixed(y)
};
