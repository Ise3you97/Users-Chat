import React from "react";
import ChatContainer from "./components/ChatContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <section>
        <div className="air air1"></div>
        <div className="air air2"></div>
        <div className="air air3"></div>
        <div className="air air4"></div>
        <ChatContainer />
      </section>
    </div>
  );
}

export default App;
