export const formatPrice = (price: number, currency = 'NGN') => {
    if (price >= 10000000) {
        const amount = (price / 1000000).toFixed(1);
        return `$${amount}M`;
    } else if (price >= 1000000) {
        const amount = (price / 1000000).toFixed(1);
        return `$${amount}M`;
    }

    return `${price}`;
};
