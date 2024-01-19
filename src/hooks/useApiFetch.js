import { useState, useEffect } from 'react';

export const useApiFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error };
};








// const apiUrl = 'https://dummyjson.com/products/1';
//   const options = {
//     method: 'PUT', // or 'POST', 'PATCH', etc.
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       title: 'iPhone Galaxy +1'
//     }),
//   };

//   const { data, loading, error } = useApiFetch(apiUrl, options);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }
