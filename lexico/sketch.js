var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function setup() {
  createCanvas(400, 400);
}

/*
1. Find the largest x such that P[x]<P[x+1].
(If there is no such x, P is the last permutation.)

2. Find the largest y such that P[x]<P[y].

3. Swap P[x] and P[y].

4. Reverse P[x+1 .. n].

*/

function draw() {
  background(0);

  console.log(arr);

  //step 1
  var largestI = -1;

  for(var i = 0; i < arr.length - 1; ++i) {
    if(arr[i] < arr[i + 1]){
      largestI = i;
    }
  }

  if(largestI == -1){
    noLoop();
    console.log("Done");
  }

  //step 2
  var largestJ = -1;

  for(var i = arr.length; i >= largestI; i--) {
    if(arr[largestI] <= arr[i]){
      largestJ = i;
      break;
    }
  }

  //step 3
  swap(largestI, largestJ);

  //step 4
  var endArray = arr.splice(largestI + 1);
  endArray.reverse();
  arr = arr.concat(endArray);

  fill(255);
  textSize(64);
  var s = "";
  for(var i = 0; i < arr.length; ++i){
    s += arr[i];
  }
  
  text(s, 0, height/2);

}

function swap(i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
