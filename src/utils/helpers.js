export const changeArrayElementsPosition = (array, from, to) => {
    array.splice(to, 0, array.splice(from, 1)[0]);
    return array;
}