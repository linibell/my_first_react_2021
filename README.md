# 노마드코더 ReactJS로 영화 웹 서비스 만들기



### #0 INTRODUCTION

---



### #1 SETUP

---

1. ##### 초기 세팅

   - node.js
   - npm
   - npx
   - visual studio code
   - git



2. ##### react app 생성

```bash
npx create-react-app my_first_app_2021
```

 

3. ##### react app 실행

```bash
npm start
```



### #2 JSX & PROPS

---

- ##### compontent : HTML을 반환하는 함수
- ##### jsx : 자바스크립트랑 HTML사이의 조합!

- ##### PropTypes를 이용한 형식 검증

```bash
npm i prop-types
npm i
npm start
```



##### src/Potato.js

```js
function Potato() {
    return (
        <h3>I love potato</h3>
    )
}

export default Potato
```



##### src/index.js

```js
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />, // 하나의 component만 반환, 따라서 App안에 다 넣어야 함
  document.getElementById('root') // 아래의 index.html~!
)
```



##### public/index.html

```html
<div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
```



##### src/App.js

```js
import PropTypes from "prop-types"
// import Potato from "./Potato"

// 함수의 매개변수로 넣을 수 있는 형태들
// 1. ( props )
// 2. ( props.fav )
// 3. ({ fav })
// function Food({ fav }) {
//   return (
//       <h3>I love { fav }</h3>
//   );
// }

const foodILike = [
  {
    id: 1,
    name: "gimbab",
    image:
      "imgurl",
    rating: 8,
  },
  {
    id: 2,
    name: "chicken",
    image:
      "imgurl2",
    rating: 8.8,
  },
  {
    id: 3,
    name: "pizza",
    image:
      "imgurl3",
    rating: 9.2,
  },
]

function Food({ name, picture, rating }) {
  return (
    <div>
      <h3>I love { name }</h3>
      <h4>{ rating }/10.0</h4>
      <img src={ picture } alt={ name }/>
    </div>
  )
}

// PropTypes 사용법 체크
Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
}

// 주인공은 나야나~
function App() {
  return (
    <div>
      // map 사용법 체크
      {foodILike.map(dish => (
        <Food key={ dish.id } name={ dish.name } picture={ dish.image } rating={ dish.rating } />
      ))}
    </div>
  )
}

// 내보내기~!
export default App
```



### #3 STATE

---

##### src/App.js

```js
import React from "react"

// react component에서 상속받는 App component
// react는 자동적으로 class component의 render method를 실행!
// 왜 function이 아니라 class component 써야돼?
// => class component는 state를 갖고 있음, state는 object이고, component의 data를 넣을 공간이 있고, 이 데이터는 변함
class App extends React.Component{
  // constructor : component가 mount될 때 가장 먼저 실행되는 function => js에서 옴
  constructor(props) {
    super(props)
    console.log("hello")
  }
  state = {
    count: 0
  }
  plus = () => {
    // setState : 새 state와 함께 render function이 실행되도록 해줌
    // this.setState({count: this.state.count + 1})
    this.setState(current => ({count: current.count + 1}))
  }
  minus = () => {
    this.setState(current => ({count: current.count - 1}))
  }
  // componentDidMount : component가 처음 mount된 후 한번만 실행
  componentDidMount() {
    console.log("component rendered")
  }
  // componentDidUpdate : component가 처음 update되면 실행
  componentDidUpdate() {
    console.log("I'm just updated")
  }
  
  // componentWillUnmount : component가 떠날 때 실행 => 다른페이지로 가는 등
  componentWillUnmount() {
    console.log("goodbye")
  }
  render() {
    console.log("i am rendering")
    return (
      <div>
        <h1>The number is { this.state.count }</h1>
        <button onClick={ this.plus }>Plus</button>
        <button onClick={ this.minus }>Minus</button>
      </div>
    )
  }
}

export default App
```



```js
import React from "react"

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false})
      }, 6000); // 6초 후에 바뀜~!
  }
  render() {
    const { isLoading } = this.state
    return <div>{ isLoading ? "Loading..." : "We are ready" }</div>
  }
}

export default App
```



### #4 MAKING THE MOVIE APP

---

- ##### axios

```bash
npm i axios
```

- ##### API => YTS

```
https://yts-proxy.now.sh//list_movies.json // 노마드코더 제공 => 추후 url이 바뀔 것을 대비해서~!
https://yts.mx/api/v2/list_movies.json // 사이트
```



##### src/App.js

```js
import React from "react"
import axios from "axios"
import Movie from "./Movie"
import "./App.css"

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  }
  getMovies = async() => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    ) // sort_by
    this.setState({ movies, isLoading: false })
  }
  componentDidMount() {
    this.getMovies()
  }
  render() {
    const { isLoading, movies } = this.state
    return (
      <section className="container">
        {isLoading ? (
          <div className = "loader">
            <span className = "loader__text">Loading...</span>
          </div>
        ) : (
          <div className = "movies">
            {movies.map(movie => (
              <Movie
                key={ movie.id }
                id={ movie.id }
                year={ movie.year }
                title={ movie.title }
                summary={ movie.summary }
                poster={ movie.medium_cover_image }
                genres={ movie.genres }
              />
            ))}
          </div>
        )}
      </section>
    )
  }
}

export default App
```



##### src/Movie.js

```js
import React from "react"
import PropTypes from "prop-types"
import "./Movie.css"

function Movie({ id, year, title, summary, poster, genres }) {
    return (
        <div className="movie">
            <img src={ poster } alt={ title } title={ title } />
            <div className="movie__data">
                <h3 className="movie__title">{ title }</h3>
                <h5 className="movie__year">{ year }</h5>
                <ul className="movie__genres">
                    {genres.map((genre, idx) => (
                        <li key={ idx } className="genres__genre">s
                            { genre }
                        </li>
                    ))}
                </ul>
                <p className="movie__summary">{ summary.slice(0, 180) }...</p>
            </div>
        </div>
    )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie
```



##### src/Movie.css

```css
.movies .movie {
  width: 45%;
  background-color: white;
  margin-bottom: 70px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-weight: 300;
  padding: 20px;
  border-radius: 5px;
  color: #adaeb9;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
}

.movie img {
  position: relative;
  top: -50px;
  max-width: 150px;
  width: 100%;
  margin-right: 30px;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
}

.movie .movie__title,
.movie .movie__year {
  margin: 0;
  font-weight: 300;
}

.movie .movie__title {
  margin-bottom: 5px;
  font-size: 24px;
  color: #2c2c2c;
}

.movie .movie__genres {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  margin: 5px 0px;
}

.movie__genres li,
.movie .movie__year {
  margin-right: 10px;
  font-size: 14px;
}
```



##### src/App.css

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #eff3f7;
  height: 100%;
}

html,
body,
#potato,
.container {
  height: 100%;
  display: flex;
  justify-content: center;
}
.loader {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
}

.movies {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 50px;
  padding-top: 70px;
  width: 80%;
}
```



### #5 CONCLUSIONS

---



### #6 ROUTING BONUS

---