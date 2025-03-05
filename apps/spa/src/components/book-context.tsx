"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  publishedYear: number
  genre: string
  description: string
  coverUrl?: string
  status: "available" | "borrowed" | "lost"
}

interface BookContextType {
  books: Book[]
  addBook: (book: Omit<Book, "id">) => void
  updateBook: (id: string, book: Omit<Book, "id">) => void
  deleteBook: (id: string) => void
  getBook: (id: string) => Book | undefined
}

const BookContext = createContext<BookContextType | undefined>(undefined)

// Sample data
const initialBooks: Book[] = [
  {
    id: "1",
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    publishedYear: 1949,
    genre: "Dystopian",
    description: "A dystopian social science fiction novel that examines the consequences of totalitarianism.",
    coverUrl: "/placeholder.svg?height=200&width=150",
    status: "available",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    publishedYear: 1960,
    genre: "Fiction",
    description: "A novel about racial inequality and moral growth in the American South.",
    coverUrl: "/placeholder.svg?height=200&width=150",
    status: "borrowed",
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    publishedYear: 1925,
    genre: "Classic",
    description: "A novel that examines the American Dream and the Jazz Age.",
    coverUrl: "/placeholder.svg?height=200&width=150",
    status: "available",
  },
]

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(initialBooks)

  const addBook = (book: Omit<Book, "id">) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
    }
    setBooks((prevBooks) => [...prevBooks, newBook])
  }

  const updateBook = (id: string, book: Omit<Book, "id">) => {
    setBooks((prevBooks) => prevBooks.map((prevBook) => (prevBook.id === id ? { ...book, id } : prevBook)))
  }

  const deleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
  }

  const getBook = (id: string) => {
    return books.find((book) => book.id === id)
  }

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook, getBook }}>{children}</BookContext.Provider>
  )
}

export function useBooks() {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}

