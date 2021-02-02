# 33 Concepts Every JavaScript Developer Should Know

> 깃허브 참고 https://github.com/leonardomso/33-js-concepts
>
> 영상 참고 https://www.youtube.com/watch?v=QkFkFqg-J04&list=PL7jH19IHhOLMmmjrwCi7-dMFVdoU0hhgF&index=10
>
> 번역본 참고 https://velog.io/@jakeseo_me/2019-04-30-1204-%EC%9E%91%EC%84%B1%EB%90%A8-fxjv37gc4s



## 1.Call Stack

> 자바스크립트가 함수를 핸들링하는 방법
>
> stack처럼 쌓이고, 후입선출
>
> JS의 ToDoList 느낌

```js
function three() {
    console.log("i love js");
}

function two() {
    three();
}

function one() {
    two();
}

function zero() {
    one();
}

zero();
```

- zero start - one start - two start - three start - "i love js" - three end - two end - one end - zero end



## 2. Primitive Types

> primitive : 기본적인

```js
function hello() {
    bye();
}

function bye() {
    hello();
}

hello();

# Maximum call stack exceeded
```

- string
  - 같은 '' "" 쌍
  - 문자열 안에 문자열 쓸땐 `\"`
- number
- boolean : true/false
- undefined : 정의되지 않음
- null : 존재하지 않음

```js
let hello;
console.log(hello);  // undefined

console.log(hello === undefined);  // true
console.log(hello === null);  // false

hello = null;
console.log(hello);  // null
```

- NaN : 수학 공식이 망함!
- typeof

```js
console.log(typeof true);  // "boolean"
```



## 3. Value Types and Reference Types

```js
let a = 50;
let b = a;  // a의 value를 copy해서 b에 paste

a = 10;
console.log(b);  // 50
```

```js
const a = ['element1', 'element2'];
const b = a;  // a와 b가 서로 동일한 배열을 참조

a.push('hELLO');
console.log(b);  // [ 'element1', 'element2', 'hELLO' ]
```

```js
console.log([10] === [10]);  // false, 메모리에 위치한 서로 다른 오브젝트
```

```js
const a = {
	x: 'hello',
}
const b = a;

b.x = 'lalala';
console.log(a);  // { x: 'lalala' }
```



## 4. Implicit, Explicit, Nominal, Structuring and Duck Typing

> Type Coercion (= Type Conversion)

```js
console.log(4 + "hello");  // 4hello

// js는 왼쪽에서 오른쪽 방향으로 읽음
console.log(4 + 4 + "hello");  // 8hello

// 별걸 다 바꿔줌 ㅇ0ㅇ
console.log(25-"1");  // 24

// boolean true는 숫자 1
console.log(1 == true);  // true
console.log(66 + true);  // 67

// 0, empty string, NaN, undefined, null은 false
// empty sting은 zero byte이고, js가 이를 0으로 변환시킴
console.log("" == true);  // false
console.log("" == false);  // true

// ==/!= 쓸 때만 type coercion이 작동
// ===/!== 쓸 때는 얄짤 ㄴ, 권장! 
console.log(1 == "1");  // true
console.log(1 === "1");  // false

// "true"는 변환이 안되고, true는 숫자 1로 변환되어 false
console.log("true" == true); // false
console.log("true" === true); // false
```



## 5. == vs === vs typeof

- typeof는 Primitive type에서 대부분 잘 작동

```js
console.log(typeof "hi");  // string 
console.log(typeof 13);  // number
console.log(typeof true);  // boolean
console.log(typeof undefined);  // undefined
console.log(typeof NaN);  // number
console.log(typeof null);  // object => 안고가는 bug
console.log(typeof []);  // object
```

- object인지 array인지 확인하고 싶을 땐? instaceof를 사용하면 됨,
- 다만 instanceof는 primitive type에서는 작동 ㄴ

```js
console.log([] instanceof Array);  // true
console.log({} instanceof Object);  // true
```



## 6. Function Scope, Block Scope and Lexical Scope

> scope 한줄 요약 : 너의 variable이 존재하는가, 하지 않는가?
>
> 큰 곳에서 작은 곳으로는 접근이 불가능하고, 작은 곳에서 큰 곳으로는 접근이 가능

- global scope

```js
const h = "hello";

function a(){
    // 여기선 global scope인 h로 접근할 수 있지만,
    console.log(h);
    const b = "b";
}

a();  // hello
// 여기선 함수 a로 접근할 순 없어
console.log(b);  # error: Uncaught ReferenceError: b is not defined
```

```js
function a(){
	const b = "b";
	function c(){
		const d = "d";
		function e(){
			const nn = "nn";
		}
	}
}

// e는 b, d, nn접근 가능
// c는 b, d 접근 가능, nn 접근 불가
// a는 b 접근 가능, d, nn 접근 불가
```

```js
let hello;

if(true){
	hello = "hello";
}

console.log(hello);  // hello
```



## 7. Expression vs. Statement

- expression returns value
- statement 는 지시, 명령
  - if, else, else if , for, while etc

```js
function add(a, b){
    return a + b;
}
const how = add(5, 6);
console.log(how);  // 11
```



- Function declaration
  - hoisting 
    - 모든  declaraion을 상단으로 가져옴.
    - 따라서, 아래와 같은 순서로 짜도 실행이 가능
    - 권장은 ㄴ 선언을 먼저 해주고 사용하기

```js
const awesome = add(1, 5)
function add(a, b){
    return a + b;
}
console.log(awesome);  // 6
```

- Function expression

```js
const awesome = add(1, 5)
const add = (a, b) => a + b;
# error: Uncaught ReferenceError: Cannot access 'add' before initialization
# 이건 declaration아니고 expression!
console.log(awesome);
```

```js
const add = (a, b) => a + b;
const awesome = add(1, 5)
console.log(awesome);  // 6
```



## 8. IIFE, Modules and Namespaces

> 웹팩없는 자바스크립트 모듈

- IIFE (Immediately-Invoked Function Expressions)

```js
const secretUsers = ["user1", "user2", "user3", "user4"];
console.log(secretUsers);  // ["user1", "user2", "user3", "user4"]

// 콘솔로 가서
secretUsers.push("yelin");
console.log(secretUsers);  // ["user1", "user2", "user3", "user4", "yelin"]
```

- 비밀로 만들고 싶을때,  IIFE => 실행은 되지만, 바꿀 순 없어!

```js
// 함수를 만들고, 호출
// 1
(function(){
    const secretUsers = ["user1", "user2", "user3", "user4"];
	console.log(secretUsers);  // ["user1", "user2", "user3", "user4"]
})()

// 2
(() => {
    const secretUsers = ["user1", "user2", "user3", "user4"];
	console.log(secretUsers);  // ["user1", "user2", "user3", "user4"]
})()

// 콘솔로 가서
console.log(secretUsers);
# error: Uncaught ReferenceError: secretUsers is not defined
```



- Modules
  - import, export
  - 좋은 친구들이지만 브라우저에서는 import, export를 못함
  - script type="module" 로 해결~!

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>repl.it</title>
    <link href="style.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <script src="script.js"></script>
    <script type="module" src="app.js"></script>
    <script type="module" src="app2.js"></script> 
  </body>
</html>
```

app.js

```js
let users = ['user1', 'user2', 'user3', 'user4'];

export const addUsers = (user) => (users = [...users, user]);

export const getUsers = () => users;

export const deleteUser = (user) => (users = users.filter(aUser => aUser !== user));
```

app2.js

```js
import { addUsers, getUsers } from './app.js';

console.log(getUsers());  // [ 'user1', 'user2', 'user3', 'user4' ]
addUsers("yelin");
console.log(getUsers());  // [ 'user1', 'user2', 'user3', 'user4', 'yelin' ]
```



## 9. Message Queue and Event Loop

> 파이썬은 블로킹언어, 자바스크립트는 논블로킹언어

- blocking 언어 => 한번에 두가지 일을 할 수 없음

- 예로 alert는 blocking function

```js
alert("hello");
console.log("hi");
// alert문을 닫기전에는 hi가 실행되지 않음.
```

```js
setTimeout(() => console.log("hi"), 0); // 인자는 기다려야하는 최소 시간임.
console.log("bye");

// bye
// hi
```

##### fetch도 아래 사진과 같음

![image-20210131170733739](33 Concepts of JavaScript.assets/image-20210131170733739.png)



## 10. setTimeout, setInterval and requestAnimationFrame

> set Timeout은 js개념에서 온 아이가 아니고, 브라우저와 nodejs개념에서 옴

- settimeout은 시간이 지난 후에 기능을 메세지 큐에 붙여줌
- stack이 비면 큐가 실행됨
- 자바스크립트가 바쁘면 늦게 실행되고, 한가하면 빨리 실행되니까 시간이 정확하다고 볼 순 없음

```js
setTimeout(() => console.log("hi"), 1000);  // 1초뒤에 hi
```

```js
// 우리가 직접 함수를 호출하는 것이 아닌, setTimeout을 호출해서 setTimeout이 console.log를 호출하는 방식으로 사용하기
setTimeout(console.log, 1000, "hi");  // 1초뒤에 hi
```

```js
// 중간에 안하고 싶을때 clearTimeout! => timeout ID를 이용해서
const helloT = setTimeout(console.log, 1000, "hi"); 
console.log(helloT);  // 1  => timeout ID
clearTimeout(helloT);  // 이거 없으면 hi실행됨
```

```js
const helloT = setInterval(console.log, 1000, "hi");
console.log(helloT);
clearInterval(helloT);
```

- setTimeout은 정해진 초만큼 기다렸다가 함수를 실행
- setInterval은 정해진 초마다 함수를 실행
- 함수를 바로 실행하지 말고, 함수의 이름을 넣기
- 취소하고 싶다면 clear 사용 + 선언시 변수에 저장해서 ID를 저장할 수 있도록 하자
- Chrome에서는 interval이 1초보다 작으면 1초로 바꿔버림~!



requestAnimationFrame

- 이전에 스크린에서 무언가를 움직이게 하려면 setInterval를 사용했다, 5초마다 움직이기 등으로
- 이는 time specific이 아니기에 의지할 수 없고, cpu나 그래픽카드가 느리면 인터벌도 느려짐
- 그래서 나온게 requestAnimationFrame, 이는 브라우저를 렌더링하기 전에 함수를 실행
- 애니메이션 작업을 많이 하지 않는다면 안쓰겠지?
- 뭔가를 최대한 빠르게 실행하고 싶을때 사용해보기!



## 11. JavaScript Engines

> V8은 구글이 제공하는 강력한 오픈소스 자바스크립트 엔진이다. 자바스크립트 엔진이란 자바스크립트 코드를 마이크로프로세서가 이해할 수 있는 더 낮은 수준의 언어 혹은 기계어로 변환해주는 역할을 한다. Rhino, JavaScriptCore, SpiderMonkey와 같은 다양한 종류의 자바스크립트 엔진이 존재하며 자바스크립트는 ECMAScript 표준을 기반으로 하고, 엔진들은 ECMAScript 표준을 따른다. 



크롬 V8엔진의 특성

- V8엔진은 C++로 작성됐고 Chrome과 Nodejs에서 사용

- V8엔진은 ECMA-262에 기재된 ECMAScript를 구현

- V8엔진은 standalone으로 동작할 수 있어서 우리는 자바스크립트 엔진을 C++ 프로그램에 내장시킬 수 있음
  - 예를 들면, `print('hello world')`는 Node.js에서 유효한 구문이 아니므로 컴파일하면 에러를 송출할 것이다. 하지만 우리는 깃허브에 오픈소스로 제공된 V8엔진의 맨 위에 프린트 문을 추가할 수 있다. 그래서 print함수가 native로 동작하게 만들 수 있다. 이러한 행위는 자바스크립트가 ECMAScript 표준이 정의하는 자바스크립트 동작보다 더 많은 동작을 하도록 허용해준다.

  - 이는 강력한 기능이다. C++은 자바스크립트에 비교했을 때, 더 많은 특성을 갖고있기 때문이다. C++은 하드 드라이브에 있는 파일과 폴더를 다룰 때 하드웨어와 훨씬 더 가까이 있다. 우리가 C++로 된 코드를 작성하도록 허용하고 자바스크립트에서 동작 가능하게 만드는 것이 가능하고 그래서 우리는 자바스크립트에 더 많은 특성을 추가할 수 있다.
  - Node.js 자체는 V8엔진, C++ 구현이고, C++로 구현된 V8엔진은 서버사이드 프로그래밍과 네트워킹 어플리케이션을 다룰 수 있게 해준다.
  - C++코드에서 `Print`와 `Read`와 같은 함수들의 구현을 볼 수 있습니다. 이 함수들은 Node.js에서 네이티브로는 불가능한 것들이다.



## 12. Bitwise Operators, Type Arrays and Array Buffers

> 비트연산자



```js
const myObject = {
  foo1: false,
  foo2: true,
  foo3: false,
  foo4: true
}

const HAS_FOO1 = 1;       // 0001
const HAS_FOO2 = 1 << 1;  // 0010
const HAS_FOO3 = 1 << 2;  // 0100
const HAS_FOO4 = 1 << 3;  // 1000

let myBitNumber = 0;

if (myObject['foo1'] === true)
  myBitNumber = myBitNumber | HAS_FOO1;
  // 합집합의 형태를 띄기 위해 bit연산자인 "|"를 사용합니다.

if (myObject['foo2'] === true)
  myBitNumber = myBitNumber | HAS_FOO2;

if (myObject['foo3'] === true)
  myBitNumber = myBitNumber | HAS_FOO3;

if (myObject['foo4'] === true)
  myBitNumber = myBitNumber | HAS_FOO4;

console.log(myBitNumber.toString(2));

if (myBitNumber & HAS_FOO1) {
  // False
}
if (myBitNumber & HAS_FOO2) {
  // True
}

if (myBitNumber & (HAS_FOO1 | HAS_FOO2)) {
  // True
}
if (myBitNumber & (HAS_FOO1 | HAS_FOO3)) {
  // False
}

if (myBitNumber == (HAS_FOO2 | HAS_FOO4)) {
  // True
}
if (myBitNumber == (HAS_FOO2 | HAS_FOO3 | HAS_FOO4)) {
  // False
}

console.log(HAS_FOO2 | HAS_FOO4)  // 10
console.log(myBitNumber | (HAS_FOO2 | HAS_FOO4))  // 10
if (myBitNumber == (myBitNumber | (HAS_FOO2 | HAS_FOO4))) {
  // True
}
console.log((HAS_FOO2 | HAS_FOO3 | HAS_FOO4))  // 14
console.log((myBitNumber | (HAS_FOO2 | HAS_FOO3 | HAS_FOO4)))  // 14
if (myBitNumber == (myBitNumber | (HAS_FOO2 | HAS_FOO3 | HAS_FOO4))) {
  // False
}
```



## 13. DOM and Layout Trees

DOM?

- 웹사이트는 HTML Document라는 것을 포함한다. 웹사이트를 보기 위해 사용하는 브라우저는 HTML과 CSS를 해석하는 프로그램이다. 그리고 style, content, structure 등을 우리가 보는 페이지에 렌더링한다.
- HTML과 CSS의 structure와 style을 파싱하기 위해서, 브라우저는 Document Object Model이라 불리는 document의 겉모양(representation)을 만든다. 이 **모델(model)** 은 자바스크립트가 오브젝트로서의 웹사이트 document의 컨텐트와 엘리먼트에 접근할 수 있도록 해준다.



Document 객체(Document Object)

- `document` 객체는 우리가 웹사이트에 접근하고 수정할 수 있는 많은 **프로퍼티(properties)** 와 **메소드(methods)** 를 가진 빌트인 오브젝트이다. DOM을 어떻게 작업해야 하는지 이해하기 위해, 자바스크립트에서 오브젝트가 어떻게 동작하는지 이해하는 것이 필수적이다.

- *Console*창에서 `document`라고 타이핑하신 뒤에 엔터를 치면, Elements 탭에서 보던 것과 같은 내용을 결과로 보게 된다.

```js
> document;
```

```js
// Output
// #document
<!DOCTYPE html>
<html lang="en">

  <head>
    <title>Learning the DOM</title>
  </head>

  <body>
    <h1>Document Object Model</h1>
  </body>

</html>
```



DOM과 HTML 소스 코드의 차이점은 무엇일까?

- DOM은 자바스크립트 클라이언트 사이드에 의해 수정된다.
- 브라우저는 소스코드에 존재하는 에러를 자동으로 고친다.

```js
> document.body
```

```js
// Output
<body>
  <h1>Document Object Model</h1>
</body>
```

`document`는 오브젝트입니다. `body`는 '.'으로 접근할 수 있는 `document`의 프로퍼티로 `document.body`를 콘솔에 작성하는 것은 `body` 엘리먼트와 그 안에 있는 모든 것들을 출력한다. 콘솔에서, 이 웹페이지의 `body` 오브젝트의 라이브 프로퍼티의 일부를 수정할 수 있다. 배경색을 `fuchsia`로 바꿔보자.

*Element* 탭으로 이동해서 `document.body`를 다시 콘솔에 타이핑해보세요. DOM이 변경된 것을 보실 수 있을 겁니다.

```js
// Output
<body style="background-color: fuchsia;">
  <h1>Document Object Model</h1>
</body>
```

우리가 타이핑했던 `body`의 배경색을 `fuchsia`로 할당했던 자바스크립트 코드는 이젠 DOM의 일부이다.

하지만, 웹사이트의 소스는 우리가 자바스크립트를 통해 추가했던 새로운 스타일 속성을 갖고 있지 않다. 웹사이트의 소스는 변하지 않고, 페이지를 새로고침하면, 우리가 콘솔에 추가했던 새로운 코드는 사라집니다.

DOM이 HTML 소스코드와 다른 출력결과를 갖는 또 하나의 사례는 소스코드에 에러가 있을 때이다. 하나의 공통적인 예시를 들자면 `table` 태그에는 안에 `tbody` 태그가 요구됩니다. 하지만 개발자들은 HTML 소스 내부에 좀처럼 잘 추가하지 않는다. 브라우저는 자동적으로 에러를 찾아주고 DOM을 수정하여 `tbody` 코드를 추가해준다. DOM은 제대로 닫히지 않은 태그에 대해서도 수정해준다.



## 14. Factories and Classes

1. 생성자 함수

```js
function Vehicle(make, model, color) {
  this.make = make,
  this.model = model,
  this.color = color,
  this.getName = function () {
    return this.make + " " + this.model;
  }
}
```

```js
let car = new Vehicle("Toyota", "Corolla", "Black");
let car2 = new Vehicle("Honda", "Civic", "White");
```

이 기술에는 몇가지 문제점이 있다. 우리가 `new Vehicle()`이라는 코드를 작성할 때, 자바스크립트 엔진이 실제로 하는 일은 우리의 각 오브젝트에 대해서 `Vehicle` 생성자 함수를 복사하는 일이다. 각각 그리고 모든 프로퍼티 그리고 메소드가 `Vehicle`의 새로운 인스턴스에 복사된다. 그래서 이게 무슨 문제가 있냐고요?

문제는 바로 우리는 우리 생성자 함수의 멤버 함수가 모든 오브젝트에서 반복되는 것을 원하지 않는다는 점이다. 이건 중복된 코드를 계속 생성한다. 또 다른 문제는 우리가 새로운 프로퍼티나 메소드를 존재하는 생성자 함수(constructor function)에 추가할 수 없다는 점이다.

```js
car2.year = "2012" // ('존재하는 오브젝트에는 가능하지만 생성자 함수에는 추가할 수 없다')
```

year 프로퍼티를 추가하려면 생성자 함수 자체에 추가해야 한다.

```js
function Vehicle(make, model, color, year) {
        this.make = make,
        this.model = model,
        this.color = color,
        this.year = year,
        this.getName = function () {
            return this.make + " " + this.model;
        }
}
```



2. 프로토타입

자바스크립트에서 새로운 함수가 만들어질때마다, 자바스크립트 엔진은 기본으로 `prototype` 프로퍼티를 추가한다. 이 프로토타입은 우리가 "프로토타입 오브젝트(prototype object)"라고 부르는 것이다. 기본으로 이 프로토타입 오브젝트는 우리 함수를 다시 가리키는 생성자 프로퍼티와 오브젝트인 또 다른 프로퍼티 `__proto__`를 갖고 있다.

![img](33 Concepts of JavaScript.assets/prototypevehicle.png)

`__proto__` 프로퍼티는 'dunder proto'라고 불리고 이 프로퍼티는 우리의 생성자 함수의 프로퍼티를 가리킨다.

생성자 함수의 새로운 인스턴스가 생성될 때마다, 다른 프로퍼티와 메소드와 함께 이 프로퍼티(**proto**)도 인스턴스에 복사된다.

![img](33 Concepts of JavaScript.assets/proto.png)

이 프로퍼티 오브젝트는 생성자 함수에 새로운 프로퍼티와 메소드를 추가하기 위해 사용될 수 있다. 다음 문법을 사용하면 모든 생성자 함수 인스턴스에서 사용 가능할 것이다.

```js
car.__proto__.year = "2016"; // 원문은 car.prototype.year = "2016" 이었으나 현재는 동작하지 않는 코드
```

프로토타입은 멋집니다 하지만 프로토타입 접근법을 사용하는동안 몇가지 유의해야할 점이 있다. 프로토타입 프로퍼티와 메소드는 모든 생성자 함수 인스턴스 간에 공유가 되지만 생성자 함수의 인스턴스 중 하나에서 어떤 프리미티브 프로퍼티를 변경하였을 때는, 해당 인스턴스에만 반영이 되고, 다른 인스턴스들 사이에서는 반영이 안된다는 것이다.

![img](33 Concepts of JavaScript.assets/reflect-only-one.png)

또 하나 알아둬야 할 것은, 참조 타입 프로퍼티는 항상 모든 인스턴스 사이에서 공유된다는 것이다. 예를 들면, 배열 타입의 프로퍼티의 경우, 만일 생성자 함수의 한 인스턴스에 의해 수정되었다면, 모든 인스턴스에 대해 수정된다.

![img](33 Concepts of JavaScript.assets/array-property-ref.png)



3. 클래스

```js
class Vehicle {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    getName() {
        return this.make + " " + this.model;
    }
}
```

```js
let car = new Vehicle("Toyota", "Corolla", "Black");
```

위의 코드를 작성함으로써, 우리는 `Vehicle`이라는 이름을 가진 변수를 만들었다. 이 변수는 클래스에 정의된 생성자 함수를 참조한다. 또한 우리는 `Vehicle` 변수의 프로토타입에 메소드도 추가했다.

```js
function Vehicle(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
}

Vehicle.prototype.getName = function () {
    return this.make + " " + this.model;
}

let car = new Vehicle("Toyota", "Corolla", "Black");
```

우리가 배운 내용이 증명하는 것은, 클래스는 그저 생성자 함수를 작성하는 새로운 방법이다. 하지만 진짜 클래스처럼 만들기 위해서 새로 소개된 몇가지 것들과 규칙들이 더 있다.

​	1. 클래스에서는 `constructor`를 작동시키기 위해 `new` 키워드가 필요하다. 이것이 의미하는 것은 생성자는 우리가 다음과 같이 코드를 작성했을 때만 호출시킬 수 있다는 것이다.

```js
let car = new Vehicle("Toyota", "Corolla", "Black");
```

![img](33 Concepts of JavaScript.assets/constructor-function-without-new.png)

![img](33 Concepts of JavaScript.assets/class-constructor.png)

	2. 클래스 메소드는 enumerable하지 않다. 자바스크립트에서, 오브젝트의 각 프로퍼티는 `enumerable` 플래그를 갖고 있다. 이 플래그는 그 프로퍼티에서 어떤 명령이 실행되는지 유효성을 정의한다. 클래스는 `prototype`에 정의된 모든 메소들에 대해 이 플래그를 `false`로 설정한다.
 	3. `constructor`를 클래스에 추가하지 않는다면, 기본 값으로 빈 `constructor`가 자동으로 추가된다.

```js
constructor() {}
```

	4. 클래스 내부의 코드는 항상 `strict` 모드다. 이러한 점은 코드를 작성하는 도중 에러를 날림으로써, 오타 또는 문법적인 에러가 없는 코드를 작성하는 것을 돕는다. 실수로 어딘가에서 참조되는 코드를 지웠을 때도 알아채기 쉽다.
 	5. 클래스 선언은 `hoisted`되지 않는다. 자바스크립트에서 호이스팅은 모든 선언문들이 자동적으로 현재 스코프의 가장 위로 올라가는 것이다. 호이스팅은 변수나 함수가 실제로 선언되기 전에 쓰이게 만들어 버그와 의도치 않은 동작을 유발한다.

호이스팅의 예는 다음과 같다.

![img](33 Concepts of JavaScript.assets/hoisting1.png)

이 코드는 동작한다.

![img](33 Concepts of JavaScript.assets/hoisting2.png)

이 코드는 동작하지 않는다.

​	6. 클래스는 오브젝트 리터럴이나 생성자 함수 같은 것을 프로퍼티의 값으로 할당하는 것을 허락하지 않습니다. 함수나 getters/setters 같은 것만 가질 수 있습니다. 그러니 클래스에서 `property:value` 할당을 바로 하지마세요.



클래스 특성

1. 생성자

클래스 선언에서, 생성자는 특별한 함수, 생성자는 클래스 자체를 표현하는 함수를 정의

```js
let car = new Vehicle("Honda", "Accord", "Purple");
```

생성자는 클래스의 생성자를 확장된 형태로 부르기 위해 `super` 키워드를 사용

2. 정적 메소드

정적 메소드는 프로토타입 위에 있는 것이 아닌 클래스 자체에 있는 함수

`prototype`에서 정의된 메소드들은 정적 메소드와 다릅니다.

정적 메소드들은 `static` 키워드를 사용하여 선언

정적 메소드의 대부분은 공용 함수(utility functions)를 만들기 위해 사용

정적 메소드들은 클래스의 인스턴스를 생성하지 않고 호출

```js
class Vehicle {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    getName() {
        return this.make + " " + this.model;
    }

    static getColor(v) {
        return v.color;
    }
}

let car = new Vehicle("Honda", "Accord", "Purple");

Vehicle.getColor(car); // "purple"
```

기억하셔야 할 점은, 정적 메소드는 클래스 인스턴스에서 호출할 수 없다는 점

3. Getters/Setters

클래스는 또 프로퍼티의 값을 가져오거나/프로퍼티의 값을 설정하기 위해 getters/setters를 가질 수 있습니다. 예제는 아래와 같습니다.

```js
class Vehicle {
    constructor(model) {
        this.model = model;
    }
    
    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }
}
```

내부에서(under the hood), getters/setters는 클래스 `prototype`에 정의

4. Subclassing

Subclassing은 자바 클래스에서 상속을 구현할 수 있는 방법입니다. `extends`라는 키워드는 클래스의 자식 클래스를 만들 때 사용

```js
class Vehicle {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    getName() {
        return this.make + " " + this.model;
    }
}

class Car extends Vehicle{
    getName(){
        return this.make + " " + this.model +" in child class.";
    }
}

let car = new Car("Honda", "Accord", "Purple");

car.getName(); // "Honda Accord in child class."
```

위 소스에서 `getName()` 함수를 불러올 때, 자식 클래스에서 불러진 것을 볼 수 있다.

때때로 우리는 베이스 클래스의 함수를 불러올 필요가 있을 때가 있다. 우린 자식 클래스의 메소드 내에서 베이스 클래스의 메소드를 호출하기 위해 `super` 키워드를 사용한다.

```js
class Car extends Vehicle{
    getName(){
        return super.getName() + " - called base class function from child class.";
    }
}
```

![img](33 Concepts of JavaScript.assets/extends.png)



## 15. this, call, apply and bind