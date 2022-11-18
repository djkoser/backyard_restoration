export {};
const testSet = new Set();

const test1Obj = { thing: 1, thing2: 2 };
const test1Obj2 = { thing: 1, thing2: 2 };
const testArr = [test1Obj, test1Obj2];

testArr.includes({ thing: 1, thing2: 2 }); //?
testSet.add(test1Obj);
testSet.add(test1Obj2);

console.log(testSet);
