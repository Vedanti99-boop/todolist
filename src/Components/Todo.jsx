import React, { useEffect, useState } from "react";
import "./Todo.css";
import todo from "../Components/images/todo.jpg";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const getLocalItems = () => {
  let list = localStorage.getItem("Lists");
  if (list) {
    return JSON.parse(localStorage.getItem("Lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [input, setInput] = useState("");
  //it was 1st array
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);

  const addEle = () => {
    if (!input) {
      alert("fill the data");
    } else if (input && !toggleSubmit) {
      setItems(
        items.map((curEle) => {
          if (curEle.id === isEditItem) {
            return { ...curEle, name: input };
          }
          return curEle;
        })
      );
      setToggleSubmit(true);
      setInput("");
      setisEditItem(null);
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: input };
      setItems([...items, allInputData]);
      setInput("");
    }
  };

  const editItem = (id) => {
    let newEditItem = items.find((curEle) => {
      return curEle.id === id;
    });
    setToggleSubmit(false);
    setInput(newEditItem.name);
    setisEditItem(id);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return index != curElem.id;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  // add data to local storage
  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img className="img-size" src={todo} alt="" />
          </figure>
          <figcaption>Add Your List Here✌</figcaption>
          <div className="container-input">
            <input
              type="text"
              placeholder="✍ Add Items..."
              className="add-items "
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <span className="i-color">
              {toggleSubmit ? (
                <AiOutlinePlus size={25} onClick={addEle} />
              ) : (
                <AiFillEdit style={{ color: "white" }} onClick={addEle} />
              )}
            </span>
          </div>
          <div>
            {/* map used for looping */}
            {items.map((curEle) => {
              return (
                <div>
                  <p className="styleborder" key={curEle.id}>
                    {curEle.name}
                  </p>
                  <AiFillEdit
                    style={{ color: "white" }}
                    onClick={() => editItem(curEle.id)}
                  />
                  <BsFillTrash3Fill
                    style={{ color: "white" }}
                    onClick={() => deleteItem(curEle.id)}
                  />
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button className="text-white" onClick={removeAll}>
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
