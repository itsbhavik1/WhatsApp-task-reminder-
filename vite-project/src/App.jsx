import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/navbar";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  function getphone(event) {
    setPhoneNumber(event.target.value);
  }

  for (let i = 0; i < todos.length; i++) {
    console.log(todos[i].todo);
  }
  const todoList = todos.map((todo) => todo.todo).join("\n");

  const handleRunExpressScript = async () => {
    try {
      const response = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: todoList,
          from: "whatsapp:+14155238886",
          to: `whatsapp:+91${phoneNumber}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Message sent successfully:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const savetols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleedit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    let updatedTodos = todos.filter((item) => {
      return item.id !== id;
    });

    settodos(updatedTodos);
    savetols();
  };

  const handledelete = (e, id) => {
    let updatedTodos = todos.filter((item) => {
      return item.id !== id;
    });

    settodos(updatedTodos);
    savetols();
  };

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    savetols();
    console.log(todos);
  };

  const handlechange = (e) => {
    settodo(e.target.value);
  };

  const sumbitphone = () => {
    console.log(phoneNumber);
  }; //debugging

  const handlecheckbox = (e) => {
    const id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    console.log(newtodos);

    savetols();
  };

  return (
    <>
      <Navbar />
    
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100  ">
        <div className="max-w-md w-full space-y-4 p-6 bg-white rounded-lg shadow-md ">
          
            <h2 className="text-2xl font-bold  ">Add a reminder </h2>
          <div className=""grid grid-cols-1 gap-4>
          <input
            onChange={handlechange}
            value={todo}
            type="text"
            className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  dark:text-gray-100 dark:border-gray-600"
          />
          <button
            onClick={handleadd}
            disabled={todo.length < 3}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm  bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full disabled:pointer-events-none disabled:opacity-50 my-2"
          >
            Save
          </button>
          <input
            onChange={getphone}
            type="text"
            placeholder="Enter Phone-number"
            name=""
            id=""
            className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  dark:border-gray-600"
          />
          <button
            onClick={handleRunExpressScript}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm  bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full my-2"
          >
            Sumbit phone
          </button>
        </div>

        <h1 className="text-2xl font-bold">Your upcomming tasks</h1>

        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5">There are no current reminders</div>
          )}

          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex justify-between w-full my-3"
              >
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handlecheckbox}
                    type="checkbox"
                    value={item.isCompleted}
                    id=""
                  />

                  <div className={item.isCompleted ? "line-through text-lg " : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons">
                  <button
                    onClick={(e) => handleedit(e, item.id)}
                    className="p-2 font-bold py-1 rounded-md hover:cursor-pointer text-white bg-indigo-600 mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handledelete(e, item.id)}
                    className="p-2 font-bold py-1 rounded-md hover:cursor-pointer text-white bg-indigo-600 mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default App;
