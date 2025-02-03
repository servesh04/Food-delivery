import axios from "axios";
import { useState } from "react";
import "./chatBot.css";

const ChatBot = () => {
  const [ans, setAns] = useState("");
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const prompt = formdata.get("prompt");
    try {
      setDisable(true);
      setAns("thinking...");
      const response = await axios.post("http://localhost:5000/api/user/chat", {
        prompt,
      });
      setAns(response.data.message);
    } catch (error) {
        console.log(error);
        setAns("something went wrong...")
    } finally {
      setDisable(false);
    }
  };

  const handleShow = () => {
    setShow(!show);
    setAns("");
  };
  return (
    <div
      className="chat-container"
      style={{
        backgroundColor: show ? "#faebd7" : "transparent",
        padding: show && "20px",
      }}
    >
      {ans.length > 0 && <p>{ans}</p>}
      <br />
      {show ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="prompt"
            className="input-box"
            placeholder="chat with me..."
            required
          />
          <input
            type="submit"
            value="send"
            className="send-btn"
            disabled={disable}
          />
          <button onClick={handleShow}>
            {show ? "close" : <img src="../../../public/chatbot.png" />}
          </button>
        </form>
      ) : (
        <button onClick={() => setShow(!show)}>
          {show ? "close" : <img src="../../../public/chatbot.png" />}
        </button>
      )}
    </div>
  );
};

export default ChatBot;
