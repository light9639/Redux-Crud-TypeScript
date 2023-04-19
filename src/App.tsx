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
