# 누구든지 하는 리액트 6편: input 상태 관리하기

> 이 튜토리얼은 10편으로 이뤄진 시리즈입니다. 이전 / 다음 편을 확인하시려면 [목차](https://velopert.com/3613)를 확인하세요.
>
> https://velopert.com/3634



자, 우리가 지금까지 배웠던것들을 요약해봅시다.

- 컴포넌트 만들기
- props 와 state
- LifeCycle API

딱히 배운게 그리 많지는 않죠? 그런데 이것만으로도 정말 많은 것들을 만들 수 있습니다!
리액트는, 그냥 자바스크립트와 가깝습니다. 자바스크립트를 잘 알고 있다면, 리액트 관련해서는 배울게 그리 많지는 않습니다.

앞으로 우리는 전화번호부 프로젝트를 만들어볼건데요, 이 프로젝트에서는 우리가 배웠던 지식들을 응용하여 다양한 작업들을 구현하고, input 상태를 관리하는 방법과 배열을 다루는 방법을 알아보겠습니다.

> 프로젝트 코드는 https://github.com/vlpt-playground/phone-book 에서 확인 할 수 있습니다.



## 프로젝트 생성하기

우리가 기존에 만들었던 프로젝트는 그대로 두고, 새 프로젝트를 만들겠습니다.

```javascript
create-react-app phone-book
```

그리고, 해당 디렉토리를 VSCode로 열고, 내부에서 `yarn start` 를 통해서 개발서버를 시작하세요.



## 첫번째 컴포넌트, PhoneForm 만들기

우리가 먼저 만들 컴포넌트는 PhoneForm 입니다. 이 컴포넌트에서는 사용자에게서 이름과 전화번호를 입력받을 것입니다. 아직 우리가 input 컴포넌트의 입력을 state 에 담는 방법에 대해선 알아보지 않았었지요? 한번 알아봅시다.



### input 다루기

우선, src 디렉토리 내부에 components 라는 디렉토리를 만드세요. 그리고, 그 안에 PhoneForm.js 라는 파일을 만들어서 다음 코드를 입력하세요.

```javascript
// file: src/components/PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <div>{this.state.name}</div>
      </form>
    );
  }
}

export default PhoneForm;
```

onChange 이벤트가 발생하면, e.target.value 값을 통하여 이벤트 객체에 담겨있는 현재의 텍스트 값을 읽어올 수 있습니다. 해당 값을 state 의 name 부분으로 설정하세요.
render 부분에서 input 을 렌더링 할 떄에는 value 값과 onChange 값을 넣어주었습니다. onChange 는 input 의 텍스트 값이 바뀔때마다 발생하는 이벤트입니다. 여기에 우리가 만들어둔 handleChange 를 설정했습니다. 그리고, 나중에 우리가 데이터를 등록하고나면 이 name 값을 공백으로 초기화 해줄건데요, 그렇게 초기화 됐을 때 input 에서도 반영이 되도록 value 를 설정해주었습니다.

그리고 그 하단에는 name 값이 잘 바뀌고 있는지 확인 할 수 있도록 값을 렌더링해주었습니다.



자~ 그러면 이 컴포넌트를 App 에서 보여줄게요.

```javascript
// file: src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';


class App extends Component {
  render() {
    return (
      <div>
        <PhoneForm />
      </div>
    );
  }
}

export default App;
```

![img](https://i.imgur.com/vS7rXOB.png)

결과물이 잘 나타났나요? 한번 여러분들도 input 값을 수정해보세요. 하단에 잘 나오고있나요?

전화번호부에는 전화번호가 들어가야겠지요. input 을 하나 더 추가해주겠습니다. input 이 여러개일때는 어떻게 처리해야할까요? 다음 코드를 살펴보세요.

```javascript
// file: src/components/PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <div>{this.state.name} {this.state.phone}</div>
      </form>
    );
  }
}

export default PhoneForm;
```

아마 또 다른 이벤트 핸들러 함수를 만들면 되지 않을까? 라고 생각하신 분들도 있을겁니다. 그 방법은 물론 나쁜 방법은 아닙니다만 더 나은 방법이 있습니다.

바로, input 의 name 속성을 사용하는건데요, render 부분에 보시면, 각 input 에 `name` 값을 부여해주었습니다. 이를 통하여 우리는 각 input 을 구분 할 수 있게 됐죠.

이 name 값은, `event.target.name` 을 통해서 조회 할 수 있습니다.

setState 내부에서 사용된 문법은 [Computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) 라는 문법입니다. 혹여나 key 부분에 [ ] 괄호가 사용된 것이 생소하다면 링크를 클릭해보세요.

자, 이제 결과물을 확인해보세요. 두 input이 제대로 작동하나요?

![img](https://i.imgur.com/HoV0QC7.png)



### 부모 컴포넌트에게 정보 전달하기

이제 state 안에 있는 값들을 부모 컴포넌트에게 전달해줄 차례입니다. 이러한 상황에는, 부모 컴포넌트에서 메소드를 만들고, 이 메소드를 자식에게 전달한 다음에 자식 내부에서 호출하는 방식을 사용합니다.

![img](https://i.imgur.com/xKe2v5s.png)

우리는 App 에서 handleCreate 라는 메소드를 만들고, 이를 PhoneForm 한테 전달해주겠습니다. 그리고, PhoneForm 쪽에서 버튼을 만들어서 submit 이 발생하면 props 로 받은 함수를 호출하여 App 에서 파라미터로 받은 값을 사용 할 수 있도록 하겠습니다.

우선 App 을 다음과 같이 수정하세요.

```javascript
// file: src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  handleCreate = (data) => {
    console.log(data);
  }
  render() {
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default App;
```

그 다음엔, PhoneForm 에서 버튼과 onSubmit 이벤트를 설정하겠습니다.

```javascript
// file: src/components/PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      name: '',
      phone: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;
```

handleSubmit 함수를 확인해보세요. 맨 위에 `e.preventDefault()` 라는 함수가 호출됐죠? 이 뜻은, 원래 이벤트가 해야 하는 작업을 방지시킨다는 의미입니다. 원래는 form 에서 submit 이 발생하면 페이지를 다시 불러오게 되는데요, 그렇게 되면 우리가 지니고있는 상태를 다 잃어버리게 되니까 이를 통해서 방지해주었습니다.

그 다음에는, props 로 받은 onCreate 함수를 호출하고, 상태값을 초기화해주었습니다.

render 부분에서는 submit 버튼을 만들고, form 부분에 onSubmit 이벤트를 등록해주었습니다.

코드를 다 작성하셨으면, 제대로 작동하는지 확인해보세요.

![img](https://i.imgur.com/g0Za58l.png)



## 정리

이제 input 은 어떻게 다뤄야 할 지 감을 잡으셨지요? 이제 App 컴포넌트에서 state 내부에 배열을 선언하고, 배열안에 PhoneForm 에서 입력한것들을 집어넣고 배열 내부의 데이터를 렌더링하는 방법을 알아보겠습니다.