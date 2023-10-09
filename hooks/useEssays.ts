import { Essay } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

const useEssays = () => {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [creationError, setCreationError] = useState<Error | null>(null);
  const [updateError, setUpdateError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const url = `${process.env.BACKEND_URL}/essays/`;

  useEffect(() => {
    setLoading(true);
    const fetchEssays = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.error) {
          setEssays(data);
        } else {
          setError(new Error("An error occurred"));
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchEssays();
  }, [url, refreshTrigger]);

  const createEssay = async (formData: FormData) => {
    setModalLoading(true);
    try {
      const response = await fetch(url, {
        method: "post",
        body: formData,
      });

      const data = await response.json();
      if (!data.error) {
        setEssays([data, ...essays]);
        return true;
      } else {
        setCreationError(new Error("An error occurred"));
        return false;
      }
    } catch (error) {
      setCreationError(error as Error);
      return false;
    } finally {
      setModalLoading(false);
    }
  };

  const updateEssayViewCount = (id: string) => {
    try {
      fetch(url + id + "/update-count", { method: "put" })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(new Error("An error occurred"));
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  const updateEssay = async (id: string, formData: FormData) => {
    setModalLoading(true);
    try {
      const response = await fetch(url + id, {
        method: "put",
        body: formData,
      });

      const data = await response.json();
      if (!data.error) {
        setRefreshTrigger(!refreshTrigger);
        return true;
      } else {
        setUpdateError(new Error("An error occurred"));
        return false;
      }
    } catch (error) {
      setUpdateError(error as Error);
      return false;
    } finally {
      setModalLoading(false);
    }
  };

  const deleteEssay = (id: string) => {
    try {
      fetch(url + id, { method: "delete" })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            const filteredEssays = essays.filter((essay) => essay._id !== id);
            setEssays(filteredEssays);
          } else {
            setError(new Error("An error occurred"));
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  return {
    essays,
    isLoading,
    isModalLoading,
    error,
    creationError,
    updateError,
    createEssay,
    updateEssay,
    updateEssayViewCount,
    deleteEssay,
  };
};

export default useEssays;
