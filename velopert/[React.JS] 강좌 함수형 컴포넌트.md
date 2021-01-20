# [React.JS\] 강좌: 함수형 컴포넌트

> 이번 포스트에서는 React 에서 함수 형태로 컴포넌트를 정의하는 방법을 알아보겠습니다.
>
> https://velopert.com/2994



React 에서 컴포넌트를 정의 할 때는 보통 EcmaScipt 6 에 도입된 **class** 문법을 사용합니다. 컴포넌트에서 **라이프사이클 API** 를 사용해야 하거나, **state** 를 사용하는 경우에는 꼭 이렇게 정의를 해야하죠.

```javascript
import React, { Component } from 'react';


class Hello extends React.Component {
  render() {
    return (
      <div>Hello {this.props.name}</div>
    );
  }
}


export default Hello;
```

> React.createClass(…) 를 사용하는 방법도 있지만 요즘 잘 사용되지 않는 추세입니다.

만약에 여러분이 만들 컴포넌트가 라이프사이클 API 도 사용하지 않고, state 도 사용하지 않고, 그냥 props 만 전달해주면 뷰를 렌더링만 해주는 역할이라면 **함수형 컴포넌트** 형식으로 컴포넌트를 정의 할 수 있습니다. 한번 예제를 살펴볼까요?

```javascript
import React from 'react';


function Hello(props) {
    return (
        <div>Hello {props.name}</div>
    );
}


export default Hello;
```

아니면 ES6 의 화살표 함수를 사용해서 만들수도있습니다.

```javascript
import React from 'react';


const Hello = (props) => {
    return (
        <div>Hello {props.name}</div>
    );
}


export default Hello;
```

이 코드를 [비구조화 할당 (Object Destructuring)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 문법을 사용하면 다음과 같이 풀 수있죠.

```javascript
import React from 'react';


const Hello = ({name}) => {
    return (
        <div>Hello {name}</div>
    );
}


export default Hello;
```

컴포넌트를 만드는게 훨씬 더 쉬워졌죠?

현재 함수형 컴포넌트에는 따로 성능 최적화가 이뤄지지 않았기 때문에 작동함에 있어서의~~ 성능은 클래스형 컴포넌트와 다를바가 없습니다.~~ 이전에 리액트 팀에서 함수형 컴포넌트의 성능을 언젠간 최적화하겠다고 예고한 바 있었지만, 일부 상황에서 제대로 동작하지 않는 오류가 있어서 [PureComponent](https://facebook.github.io/react/docs/react-api.html#react.purecomponent) 를 따로 개발하고 이 계획은 무산으로 됐다고 합니다(이 소식은 [Reddit](https://m.reddit.com/r/reactjs/comments/5nuu7i/comment/dcel08w) 에서 봤습니다. 자세한 근거는 아닙니다)

**5월 11일 수정 :** 함수형 컴포넌트를 사용 할 때 첫 마운팅 속도에 있어서는 7% ~ 11% 빠릅니다. (https://github.com/missive/functional-components-benchmark)

 

## 그럼 이 함수형 컴포넌트를 **어떤 상황**에 사용해야 할까요?

저의 경우에는 **state** 나 **라이프사이클 API** 를 **전혀 사용하지 않을 때**, 그리고 해당 컴포넌트는 자체 기능은 따로 없고 **props 가 들어가면 뷰가 나온다는 것**을 명시하기 위해 사용합니다.

특히, Redux 를 사용하여 컴포넌트들을 구성 할 때, **Container 컴포넌트** (혹은 Smart, 컴포넌트) 는 **클래스형** 컴포넌트를 사용하고, **Presentational 컴포넌트** (혹은, Dumb 컴포넌트) 는 **함수형** 컴포넌트를 사용합니다.

 

> **UPDATE:** 리액트 16에서는 함수형 컴포넌트가 성능이 조금 더 빨라졌다고[ 페이스북 개발자가 언급](https://twitter.com/trueadm/status/916706152976707584)했습니다.