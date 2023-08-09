import { IBook, IBookFormData } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

const useBooks = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [creationError, setCreationError] = useState<Error | null>(null);

  const url = `${process.env.BACKEND_URL}/books/`;

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.error) {
          setBooks(data);
        } else {
          setError(new Error(data.error));
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [url]);

  const createBook = async (formData: IBookFormData) => {
    setCreating(true);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/books`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!data.error) {
        setBooks([data, ...books]);
        return true;
      } else {
        setCreationError(new Error(data.error));
        return false;
      }
    } catch (error) {
      setCreationError(error as Error);
      return false;
    } finally {
      setCreating(false);
    }
  };

  const updateBook = (id: string) => {
    try {
      fetch(url + id, { method: "put" })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(new Error(data.error));
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  const deleteBook = (id: string) => {
    try {
      fetch(url + id, { method: "delete" })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            const filteredBooks = books.filter((book) => book._id !== id);
            setBooks(filteredBooks);
          } else {
            setError(new Error(data.error));
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  return {
    books,
    isLoading,
    isCreating,
    error,
    creationError,
    createBook,
    updateBook,
    deleteBook,
  };
};

export default useBooks;
