import { useState } from "react";
import { post } from "../api";

export default function UserForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await post("/api/users", form);
      setMsg("User saved");
      setForm({ name: "", email: "" });
    } catch {
      setMsg("Error saving user");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>User Details</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <button type="submit">Save</button>
      <p>{msg}</p>
    </form>
  );
}
