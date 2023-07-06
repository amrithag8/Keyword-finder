import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Modal } from "./Components/Modal";

import "./App.css";

function App() {
  const pageRef = useRef();
  const [showInput, setshowInput] = useState(false);
  const [value, setValue] = useState("");
  const [PageContent, setPageContent] = useState("");
  const [highlightLength, sethighlightLength] = useState();
  const [index, setIndex] = useState(0);

  // disable google cntrl+F search
  const handler = (e) => {
    if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();

      setshowInput(true);
    }
  };
  window.addEventListener("keydown", handler);

  useEffect(() => {
    
    
    setPageContent(pageRef.current.innerHTML);
  }, []);

  const valueHandler = (e) => {
    const highlightText = e.target.value;
    setValue(highlightText);

    if (highlightText === "" || highlightText === null) {
      return (pageRef.current.innerHTML = PageContent);
    }
    const regex = new RegExp(`(?![^<>]*>)(${highlightText})`, "gi");
    const highlightedContent = PageContent.replace(regex, (match, index) => {
      return `<span class="highlighted">${match}</span>`;
    });

    pageRef.current.innerHTML = highlightedContent;

    let highlightedNodes = pageRef.current.querySelectorAll(".highlighted");

    const highlightedNodeslength = highlightedNodes.length;

    sethighlightLength(highlightedNodeslength);

    if (highlightedNodeslength >= 1) {
      setIndex(0);
    }

    highlightedNodes[index]?.classList.add("currentHighlight");
  };

  const nextHandler = () => {
    let highlightedNode = pageRef.current.querySelectorAll(".highlighted");
    

    if (index === highlightLength - 1) {
      setIndex(0);
      highlightedNode[index].classList.remove("currentHighlight");
      highlightedNode[0].classList.add("currentHighlight");
    } else {
      setIndex((prev) => prev + 1);

      highlightedNode[index].classList.remove("currentHighlight");
      highlightedNode[index + 1].classList.add("currentHighlight");
    }
  
  };

  const prevHandler = () => {
    let highlightedNod = pageRef.current.querySelectorAll(".highlighted");

    if (index < 1) {
      setIndex(highlightLength - 1);
      highlightedNod[index].classList.remove("currentHighlight");
      highlightedNod[highlightLength - 1].classList.add("currentHighlight");
    } else {
      setIndex((prev) => prev - 1);
      highlightedNod[index].classList.remove("currentHighlight");
      highlightedNod[index - 1].classList.add("currentHighlight");
    }
  
  };

  const closeHandler=()=>{
    setshowInput(false);

    let highlightedN = pageRef.current.querySelectorAll(".highlighted");
    for(let i=0; i<=highlightLength-1; i++){
      highlightedN[i].classList.remove("currentHighlight");
      highlightedN[i].classList.remove("highlighted");
    }

  }

  return (
    <>
      {showInput && (
        <div className="form">
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => valueHandler(e)}
          />
          {value && `${index + 1}/${highlightLength}`}
          <i className="fa fa-arrow-up" onClick={prevHandler}></i>
          <i className="fa fa-arrow-down" onClick={nextHandler}></i>

          <div className="close" onClick={closeHandler}>X</div>
        </div>
      )}

      <Modal pageRef={pageRef} />
    </>
  );
}

export default App;
