const quickSort = (arr) => {
    if (arr.length < 2) 
        return arr;

    let left = [];
    let right = [];

    const pivot = arr[0];

    for (let i = 1; i < arr.length; i++) 
        if (pivot > arr[i])
            left.push(arr[i]);
        else
            right.push(arr[i]);

    
    return quickSort(left).concat(pivot, quickSort(right));
}

module.exports = { quickSort }