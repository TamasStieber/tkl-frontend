import { Essay } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

const useEssays = () => {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [creationError, setCreationError] = useState<Error | null>(null);

  const url = `${process.env.BACKEND_URL}/essays/`;

  useEffect(() => {
    setLoading(true);
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setEssays(data);
          } else {
            setError(new Error('An error occurred'));
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // const createEssay = (formData: FormData) => {
  //   setCreating(true);
  //   let success = false;
  //   try {
  //     fetch(`${process.env.BACKEND_URL}/essays`, {
  //       method: 'post',
  //       body: formData,
  //     }).then((response) =>
  //       response.json().then((data) => {
  //         if (!data.error) {
  //           success = true;
  //           setEssays([data, ...essays]);
  //         } else {
  //           setCreationError(new Error('An error occurred'));
  //         }
  //       })
  //     );
  //   } catch (error) {
  //     setCreationError(error as Error);
  //   } finally {
  //     setCreating(false);
  //     return success;
  //   }
  // };

  const createEssay = async (formData: FormData) => {
    setCreating(true);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/essays`, {
        method: 'post',
        body: formData,
      });

      const data = await response.json();
      if (!data.error) {
        setEssays([data, ...essays]);
        return true;
      } else {
        setCreationError(new Error('An error occurred'));
        return false;
      }
    } catch (error) {
      setCreationError(error as Error);
      return false;
    } finally {
      setCreating(false);
    }
  };

  const updateEssay = (id: string) => {
    try {
      fetch(url + id, { method: 'put' })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(new Error('An error occurred'));
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  const deleteEssay = (id: string) => {
    try {
      fetch(url + id, { method: 'delete' })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            const filteredEssays = essays.filter((essay) => essay._id !== id);
            setEssays(filteredEssays);
          } else {
            setError(new Error('An error occurred'));
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  return {
    essays,
    isLoading,
    isCreating,
    error,
    creationError,
    createEssay,
    updateEssay,
    deleteEssay,
  };
};

export default useEssays;
