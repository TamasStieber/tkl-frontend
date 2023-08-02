import { Essay } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

const useEssays = () => {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const url = `${process.env.BACKEND_URL}/essays/`;

  useEffect(() => {
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
    }
  }, [url]);

  const createEssay = (formData: FormData) => {
    fetch(`${process.env.BACKEND_URL}/essays`, {
      method: 'post',
      body: formData,
    })
      .then((response) =>
        response.json().then((data) => {
          if (!data.error) {
            setEssays([...essays, data]);
          } else {
            setError(new Error('An error occurred'));
          }
        })
      )
      .catch((error) => console.log(error));
  };

  const deleteEssay = (id: string) => {
    try {
      fetch(url + '/' + id, { method: 'delete' })
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

  return { essays, isLoading, error, createEssay, deleteEssay };
};

export default useEssays;
