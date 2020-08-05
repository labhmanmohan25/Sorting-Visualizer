export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubble_Sort(array, animations);
    return animations;
}

function bubble_Sort(array, animations) {
    var swapp;
    var n = array.length - 1;
    do {
        swapp = false;
        for (var i = 0; i < n; i++) {
            // turn green
            animations.push([i, i + 1, 1]);
            if (array[i] > array[i + 1]) {
                // turn red if wrong
                animations.push([i, i + 1, 2]);
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapp = true;
                animations.push([array[i], array[i + 1], 1]);
            }
        }
        animations.push([n, -1, 3]);
        n--;
    } while (swapp);
    animations.push([-2, array.length - 1, -2]);
}
