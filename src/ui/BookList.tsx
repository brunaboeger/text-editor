import React, { useState } from "react";

const BookList = ({ books, onSelectBook, onAddBook, onRenameBook }: any) => {
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [newBookTitle, setNewBookTitle] = useState("");

  const handleRename = (book: any) => {
    onRenameBook(book.id, newBookTitle);
    setEditingBookId(null);
    setNewBookTitle("");
  };

  return (
    <div className="w-1/4 p-4 border-r" style={{ minWidth: 230 }}>
      <h2 className="text-xl font-bold mb-4">Livros</h2>
      <ul>
        {books.map((book: any) => (
          <li key={book.id} className="mb-2">
            {editingBookId === book.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  className="border px-2 py-1 flex-1"
                />
                <button
                  onClick={() => handleRename(book)}
                  className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => onSelectBook(book)}
              >
                <span
                  onDoubleClick={() => {
                    setEditingBookId(book.id);
                    setNewBookTitle(book.title);
                  }}
                  className="flex-1 hover:text-blue-500"
                >
                  {book.title}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={onAddBook}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Adicionar Livro
      </button>
    </div>
  );
};

export default BookList;
