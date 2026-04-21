import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: ""
  });

  const API = "http://localhost:8080/books";

  const fetchBooks = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setBooks(data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBook = () => {
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    }).then(() => {
      fetchBooks();
      setForm({ title: "", author: "", price: "" });
    });
  };

  const deleteBook = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    }).then(() => fetchBooks());
  };

return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.title}>📚 Bookstore Management</h2>

      {/* Form */}
      <div style={styles.form}>
        <input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={addBook} style={styles.addBtn}>
          Add Book
        </button>
      </div>

      {/* List */}
      <div style={{ marginTop: "20px" }}>
        {books.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            No books available
          </p>
        ) : (
          books.map((book) => (
            <div key={book.id} style={styles.bookItem}>
  
              {/* LEFT: Title + Author */}
              <div style={{ flex: 2 }}>
                <strong>{book.title}</strong><br />
                <small style={{ color: "gray" }}>{book.author}</small>
              </div>

              {/* CENTER: Price */}
              <div style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
                ₹{book.price}
              </div>

              {/* RIGHT: Delete */}
              <div style={{ flex: 1, textAlign: "right" }}>
                <button
                  onClick={() => deleteBook(book.id)}
                  style={styles.deleteBtn}
                  onMouseOver={(e) => (e.target.style.background = "#c0392b")}
                  onMouseOut={(e) => (e.target.style.background = "#e74c3c")}
                >
              Delete
                </button>
              </div>
            
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: "500px",
    padding: "20px",
    borderRadius: "10px",
    background: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  input: {
    flex: "1",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "8px 12px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.2s",
  },
  bookItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
},
  deleteBtn: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default App;