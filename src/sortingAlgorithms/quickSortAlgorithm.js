export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    var sortedArray = quick_Sort(array, 0, array.length - 1, animations);
    return animations;
}

function swap(array, leftIndex, rightIndex, animations) {
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;

    animations.push([leftIndex, rightIndex, 111]);
    animations.push([array[leftIndex], array[rightIndex], 111]);
}

function partition(array, left, right, animations) {
    var pivot = array[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    animations.push([Math.floor((right + left) / 2), pivot, 4]); // pivot val yellow
    while (i <= j) {
        while (array[i] < pivot) {
            animations.push([i, array[i], 1]);
            i++;
        }
        while (array[j] > pivot) {
            animations.push([j, array[j], 11]);
            j--;
        }
        if (i <= j) {
            animations.push([i, j, 2]);
            swap(array, i, j, animations); //swapping two elements
            i++;
            j--;
        }
    }
    animations.push([i, Math.floor((right + left) / 2), 3]);
    return i;
}

function quick_Sort(array, left, right, animations) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right, animations); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quick_Sort(array, left, index - 1, animations);
        }
        if (index < right) { //more elements on the right side of the pivot
            quick_Sort(array, index, right, animations);
        }
    }
    return array;
}