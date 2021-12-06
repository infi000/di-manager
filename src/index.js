/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const render = (Root) => {
  ReactDOM.render(<Root />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}



//1.手写函数柯里化
function curry(func) {
  //此处补全
  let arr = []
  const len = func.length;
  return function fn(...rest) {
    arr=arr.concat(rest)
    
    if(arr.length>=len){
        const res = func.apply(null,arr);
        arr  = []
        return res;
    }else{
      return fn
    }
  }
}
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);


console.log(curriedSum(1, 2, 3)); // 6, still callable normally
console.log(curriedSum(1)(2, 3)); // 6, currying of 1st arg
console.log(curriedSum(1)(2)(3)); // 6, full currying
