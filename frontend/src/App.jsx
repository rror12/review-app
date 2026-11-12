import { useState } from "react";
import UserForm from "./components/userForm";
import ReviewForm from "./components/ReviewForm";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("user");

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={tab === "user" ? "tab active" : "tab"}
          onClick={() => setTab("user")}
        >
          Tab 1: User Details
        </button>
        <button
          className={tab === "review" ? "tab active" : "tab"}
          onClick={() => setTab("review")}
        >
          Tab 2: Product Review
        </button>
      </div>

      <div className="panel">
        {tab === "user" ? <UserForm /> : <ReviewForm />}
      </div>
    </div>
  );
}
