# 🔐 Redux-Toolkit과 Redux-Persist, Redux-Logger를 이용하여 만든 CRUD 예제 파일.
:octocat: 바로가기: https://light9639.github.io/Redux-Crud-TypeScript/

![127 0 0 1_5173_](https://user-images.githubusercontent.com/95972251/232992525-a417ba69-b906-42f1-b976-f00cfc99c304.png)

:sparkles: 🔐 Redux-Toolkit과 Redux-Persist, Redux-Logger를 이용하여 만든 CRUD 예제 파일. :sparkles:
## :tada: React 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt 선택하면 생성 완료.
## 🚤 Redux-Toolkit, Redux-logger, Redux-persist 설치
- `Redux-Toolkit`, `Redux-logger`, `Redux-persist`를 다음명령어로 설치한다. 
- `Redux-logger`는 리덕스 값이 변경될 때 콘솔에 값이 출력되도록 하는 라이브러리이며, `Redux-persist`는 값이 로컬스토리지에 저장되도록 하는 라이브러리이다.
```bash
npm install redux react-redux @reduxjs/toolkit redux-logger redux-persist
# or
yarn add redux react-redux @reduxjs/toolkit redux-logger redux-persist
```

## ✒️ main.tsx, App.tsx, index.html, App.css 수정 및 작성
### :zap: main.tsx
- `PersistGate`를 이용하여 로컬스토리지에 값이 저장되도록 한다.
- `Provider`를 `redux`에서 가져오고 `store.ts` 파일을 가져와 사용할 수 있도록 설정한다.
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from "@redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import usersReducer from "@redux/User";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
```
### :zap: App.tsx
- `useSelector`, `useDispatch` 함수를 `store.ts`에서 `import` 하여 사용한다.
- `input`에 `onChange`를 사용하여 각각의 `useState` 값에 데이터를 입력되도록 한다.
- `input`에 이름과 유저명을 입력하면 그 이름이 추가되는데 이 때 세팅해 놓은 `redux-logger`로 인해 콘솔에 `redux` 값이 출력되며, `redux-persist`로 인해 로컬스토리지에 값이 저장되도록 한다.
- 각각의 `input`에 `redux-Toolkit` 함수를 `import` 하여 각각의 함수가 실행되도록 작성한다.
```typescript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector, useDispatch } from "@redux/store";
import { addUser, deleteUser, updateUsername } from "@redux/User";

interface UserType {
  id: number;
  name: string;
  username: string;
}

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");

  return (
    <div className="App">
      <a href='https://redux-toolkit.js.org/'>
        <img src="https://raw.githubusercontent.com/light9639/Redux-Persist-TypeScript/main/public/logo512.png" className="App-logo" alt="logo" />
      </a>
      <h1>Redux Crud</h1>
      <div className="addUser">
        <input
          type="text"
          placeholder="이름"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="유저명"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          style={{ marginLeft: "5px" }}
        />
        <button
          onClick={() => {
            dispatch(
              addUser({
                id: userList[userList.length - 1].id + 1,
                name,
                username,
              })
            );
          }}
        >
          Add User
        </button>
      </div>
      <div className="displayUsers">
        {userList.map((user: UserType) => {
          return (
            <div key={user.id}>
              <h2> {user.name}</h2>
              <h2> {user.username}</h2>
              <input
                type="text"
                placeholder="새로운 유저명"
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  dispatch(
                    updateUsername({ id: user.id, username: newUsername })
                  );
                }}
              >
                유저이름 변경
              </button>
              <button
                onClick={() => {
                  dispatch(deleteUser({ id: user.id }));
                }}
              >
                유저 삭제하기
              </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}
```
### :zap: index.html
- `html` 상단의 `title`명과 로고 이미지를 한다.
```html
<link rel="icon" type="image/svg+xml" href="https://raw.githubusercontent.com/light9639/Redux-Persist-TypeScript/main/public/logo512.png" />
<title>Redux-Crud-TypeScript</title>
```
### :zap: App.css
- `displayUsers`에 `css` 추가하기
```css
.displayUsers {
  margin-top: 20px;
}

.displayUsers div {
  width: 400px;
  height: 150px;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}
```
## ✒️ FakeData.ts, User.ts, store.ts 수정 및 작성
### :zap: FakeData.ts
- 가짜 데이터를 만들어 다음과 같이 설정한다. 필자는 `Python`의 `Faker`를 이용하여 작성하였다.
```typescript
export const UsersData = [
    {
        id: 1,
        name: "김민지",
        username: "Melinda Obrien",
    },
    {
        id: 2,
        name: "한예은",
        username: "Susan Ruiz",
    },
    {
        id: 3,
        name: "권옥자",
        username: "Gina Ramirez",
    },
    {
        id: 4,
        name: "박지우",
        username: "Megan Raymond",
    },
    {
        id: 5,
        name: "윤영진",
        username: "Alexander Jones",
    },
    {
        id: 6,
        name: "오춘자",
        username: "Cameron Wyatt",
    },
    {
        id: 7,
        name: "이영순",
        username: "Miranda Figueroa",
    },
    {
        id: 8,
        name: "박미경",
        username: "Shelia Chen",
    },
];

```
### :zap: User.ts
- 각각의 리덕스 함수들을 만들고 타입을 지정한다.
```typescript
import { createSlice } from "@reduxjs/toolkit";
import { UsersData } from "@data/FakeData";

export const userSlice = createSlice({
    name: "users",
    initialState: { value: UsersData },
    reducers: {
        addUser: (state, action) => {
            state.value.push(action.payload);
        },
        deleteUser: (state, action) => {
            state.value = state.value.filter((user) => user.id !== action.payload.id);
        },
        updateUsername: (state, action) => {
            state.value.map((user) => {
                if (user.id === action.payload.id) {
                    user.username = action.payload.username;
                }
            });
        },
    },
});

export const { addUser, deleteUser, updateUsername } = userSlice.actions;
export default userSlice.reducer;
```
### :zap: store.tsx
- `useDispatch`, `useSelector`의 타입을 아래와 같이 지정해준다.
- `middleware`에 `redux-logger`를 사용하고, `redux-persist`를 아래와 같이 세팅하면 사용할 수 있다.
```typescript
import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist';
import usersReducer from './User';
import {
    TypedUseSelectorHook,
    useDispatch as _useDispatch,
    useSelector as _useSelector
} from "react-redux";
import logger from "redux-logger";

// 리덕스에서 타입 가져오기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// useDispatch, useSelector에 타입 추가하여 타입 설정
export const useDispatch: () => AppDispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

const reducers = combineReducers({
    users: usersReducer,
});

const persistConfig = {
    key: 'root',
    storage
};

// redux-persist 사용
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
```
