export const formatPrice = (value: number, withSign = true) => {
    return `${withSign ? '$' : ''}${value}`;
};
