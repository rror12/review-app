import { useState } from "react";
import { post } from "../api";

export default function ReviewForm() {
  const empty = { productName: "", review: "", rating: 5 };
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await post("/api/reviews", { ...form, rating: Number(form.rating) });
      setMsg("Review saved");
      setForm(empty);
    } catch {
      setMsg("Error saving review");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Product Review</h2>
      <input
        placeholder="Product name"
        value={form.productName}
        onChange={(e) => setForm({ ...form, productName: e.target.value })}
        required
      />
      <textarea
        placeholder="Review"
        value={form.review}
        onChange={(e) => setForm({ ...form, review: e.target.value })}
        required
      />
      <select
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
      <p>{msg}</p>
    </form>
  );
}
