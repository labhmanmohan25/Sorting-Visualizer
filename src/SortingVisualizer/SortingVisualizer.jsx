import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSortAlgorithm.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSortAlgorithm.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSortAlgorithm.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 70;

// 0 This is the main color of the array bars. 
const PRIMARY_COLOR = 'turquoise';

// 1 & 11 & 111 This is the color of array bars that are being compared throughout the animations. 
const SECONDARY_COLOR = 'green';

// 2 This is comparing color when wrong
const TEMP_COLOR = 'red';

// 3 when sorted
const FINAL_COLOR = 'purple';

// 4 pivot
const PIVOT_COLOR = 'yellow';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [index, newHeight, newColor] = animations[i];
      if (newColor === 4) {
        setTimeout(() => {
          const barOne = arrayBars[index].style;
          barOne.backgroundColor = PIVOT_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      else if (newColor === 1) {
        setTimeout(() => {
          const barOne = arrayBars[index].style;
          barOne.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        setTimeout(() => {
          const barOne = arrayBars[index].style;
          barOne.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * ANIMATION_SPEED_MS);
      }
      else if (newColor === 11) {
        setTimeout(() => {
          const barOne = arrayBars[index].style;
          barOne.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        setTimeout(() => {
          const barOne = arrayBars[index].style;
          barOne.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * ANIMATION_SPEED_MS);
      }
      else if (newColor === 2) {
        setTimeout(() => {
          const barOne = arrayBars[index].style;
          const barTwo = arrayBars[newHeight].style;
          barOne.backgroundColor = TEMP_COLOR;
          barTwo.backgroundColor = TEMP_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      else if (newColor === 111) {
        const barOne = arrayBars[index].style;
        const barTwo = arrayBars[newHeight].style;
        i++;
        const [heightOne, heightTwo, barColor] = animations[i];
        setTimeout(() => {
          barOne.height = `${heightOne}px`;
          barTwo.height = `${heightTwo}px`;
          barOne.backgroundColor = SECONDARY_COLOR;
          barTwo.backgroundColor = SECONDARY_COLOR;
        }, (i - 1) * ANIMATION_SPEED_MS);
        setTimeout(() => {
          barOne.backgroundColor = PRIMARY_COLOR;
          barTwo.backgroundColor = PRIMARY_COLOR;
        }, (i) * ANIMATION_SPEED_MS);
      }
      else if (newColor === 3) {
        const barOne = arrayBars[index].style;
        const barTwo = arrayBars[newHeight].style;
        setTimeout(() => {
          barOne.backgroundColor = FINAL_COLOR;
          barTwo.backgroundColor = PRIMARY_COLOR;

        }, (i - 1) * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      for (let j = 0; j < NUMBER_OF_ARRAY_BARS; j++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const barOne = arrayBars[j].style;
        barOne.backgroundColor = FINAL_COLOR;
      }
    }, (animations.length) * ANIMATION_SPEED_MS);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [first, second, third] = animations[i]; 
      if(first === -2 && third === -2){
        setTimeout(() => {
          for (let j = 0; j < second; j++){
            const barOne = arrayBars[j].style;
            barOne.backgroundColor = FINAL_COLOR;
          }
        }, i * ANIMATION_SPEED_MS); 
      }
      if(second === -1){
        setTimeout(() => {
          const barOne = arrayBars[first].style;
          barOne.backgroundColor = FINAL_COLOR;
        }, i * ANIMATION_SPEED_MS); 
      }
      else{
        if (third === 1) {
          const barOne = arrayBars[first].style;
          const barTwo = arrayBars[second].style;
          setTimeout(() => {
            barOne.backgroundColor = SECONDARY_COLOR;
            barTwo.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS); 
          setTimeout(() => {
            barOne.backgroundColor = PRIMARY_COLOR;
          }, (i + 1) * ANIMATION_SPEED_MS); 
        }
        else if(third === 2) {
          const barOne = arrayBars[first].style;
          const barTwo = arrayBars[second].style;
          setTimeout(() => {
            barOne.backgroundColor = TEMP_COLOR;
            barTwo.backgroundColor = TEMP_COLOR;
          }, i * ANIMATION_SPEED_MS); 
          i++;
          const [heightOne, heightTwo, barColor] = animations[i]; 
          setTimeout(() => {
            barOne.height = `${heightOne}px`;
            barTwo.height = `${heightTwo}px`;
            barOne.backgroundColor = SECONDARY_COLOR;
            barTwo.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS); 
          setTimeout(() => {
            barOne.backgroundColor = PRIMARY_COLOR;
//            barTwo.backgroundColor = SECONDARY_COLOR;
          }, (i + 1) * ANIMATION_SPEED_MS); 
        } 
      }
    }
  }

  heapSort() {
    
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
//      <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

