# Nodejs TypeScript JsDoc and Clean Architect
### Why have I used clean architect

1. Clean architect helps me focusing on delivering business use cases firstly and implement technical later. Our use cases will not depend on any libraries and frameworks. It is used only pure Programming Language ( I am choosing Javascript ), and an open interface for our Technical Provider can provide.

2. A simple way to write testing, we can do  Acceptable Tests by write testing for use cases to make sure our application works well. Moreover, We do Unit Tests in our provider function without depending on other tiers.

3. Our app can be improved performance in the future. Because we implement technical provider lately so that means we can improve a technical provider by moving to a microservice or refactor our code performance without effect to our business use cases


### Why our project combines babel Javascript, Typescript and Jsdoc

1. Why Javascript and Typescript?
Javascript is very messy without checking type.

2. Why Typescript and Jsdoc?
Typescirpt takes a long time at re-compilation and increase our project size.

We combine Jsdoc to type checking in javascript with typescirpt defination.


### What is the project

1. It's one of many ways to implement clean architect.

2. Clean Architect in javascript with type checking helps that we can describe entities easier and make our code cleaner

### notes:
1. add this line to all contructor function to ts-check
```
// wait for @implement tags of typescript and jsdoc
/** @type {Change me as your tyep} */
const instance = this // eslint-disable-line no-unused-vars
```
