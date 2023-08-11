import { IBookList, IBookListFormData } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

const useBookLists = () => {
  const [bookLists, setBookLists] = useState<IBookList[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [creationError, setCreationError] = useState<Error | null>(null);

  const url = `${process.env.BACKEND_URL}/book-lists/`;

  useEffect(() => {
    setLoading(true);
    const fetchBookLists = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.error) {
          setBookLists(data);
        } else {
          setError(new Error(data.error));
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookLists();
  }, [url]);

  const createBookList = async (formData: FormData) => {
    setCreating(true);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/book-lists`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!data.error) {
        setBookLists([data, ...bookLists]);
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

  const updateBookList = (id: string) => {
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

  const deleteBookList = (id: string) => {
    try {
      fetch(url + id, { method: "delete" })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            const filteredBookLists = bookLists.filter(
              (bookList) => bookList._id !== id
            );
            setBookLists(filteredBookLists);
          } else {
            setError(new Error(data.error));
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  return {
    bookLists,
    isLoading,
    isCreating,
    error,
    creationError,
    createBookList,
    updateBookList,
    deleteBookList,
  };
};

export default useBookLists;
