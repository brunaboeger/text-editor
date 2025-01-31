"use client";

import { useState, useEffect } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "@/utils/storage";
import BookList from "@/ui/BookList";
import ChapterTabs from "@/ui/ChapterTabs";
import TextEditor from "@/ui/TextEditor";

interface Chapter {
  id: number;
  title: string;
  content: string;
}

interface Book {
  id: number;
  title: string;
  chapters: Chapter[];
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  // Load books from localStorage on page load
  useEffect(() => {
    const savedBooks = loadFromLocalStorage("books");
    if (savedBooks) {
      setBooks(savedBooks);
      setCurrentBook(savedBooks[0] || null);
      setActiveChapter(savedBooks[0]?.chapters[0] || null);
    }
  }, []);

  // Save books to localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage("books", books);
  }, [books]);

  const handleAddBook = () => {
    const newBook: Book = { id: Date.now(), title: `Novo Livro`, chapters: [] };
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setCurrentBook(newBook);
    setActiveChapter(null);
  };

  const handleAddChapter = () => {
    if (!currentBook) return;

    const newChapter: Chapter = {
      id: Date.now(),
      title: `Novo Capítulo`,
      content: "",
    };
    setCurrentBook((prevBook: any) => {
      const updatedBook = {
        ...prevBook,
        chapters: [...prevBook.chapters, newChapter],
      };
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        )
      );
      return updatedBook;
    });
    setActiveChapter(newChapter);
  };

  const handleRenameBook = (bookId: number, newTitle: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, title: newTitle } : book
      )
    );
  };

  const handleRenameChapter = (chapterId: number, newTitle: string) => {
    setCurrentBook((prevBook: any) => {
      const updatedChapters = prevBook.chapters.map((chapter: any) =>
        chapter.id === chapterId ? { ...chapter, title: newTitle } : chapter
      );
      const updatedBook = { ...prevBook, chapters: updatedChapters };
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        )
      );
      return updatedBook;
    });
  };

  const handleTextChange = (newContent: string) => {
    setActiveChapter((prevChapter: any) => {
      const updatedChapter = { ...prevChapter, content: newContent };
      setCurrentBook((prevBook: any) => {
        const updatedChapters = prevBook.chapters.map((chapter: any) =>
          chapter.id === updatedChapter.id ? updatedChapter : chapter
        );
        const updatedBook = { ...prevBook, chapters: updatedChapters };
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          )
        );
        return updatedBook;
      });
      return updatedChapter;
    });
  };

  return (
    <div className="flex w-screen h-screen">
      <BookList
        books={books}
        onSelectBook={(book: Book) => {
          setCurrentBook(book);
          setActiveChapter(book.chapters[0] || null);
        }}
        onAddBook={handleAddBook}
        onRenameBook={handleRenameBook}
      />

      <div className="w-full flex flex-col p-4">
        {currentBook && (
          <>
            <ChapterTabs
              chapters={currentBook.chapters}
              activeChapter={activeChapter}
              onSelectChapter={setActiveChapter}
              onAddChapter={handleAddChapter}
              onRenameChapter={handleRenameChapter}
            />
            {activeChapter ? (
              <TextEditor
                initialText={activeChapter.content}
                onTextChange={handleTextChange}
              />
            ) : (
              <div className="p-4">
                Selecione ou adicione um capítulo para começar a escrever.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
