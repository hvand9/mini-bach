import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFetch = (collection) => {
	const [ data, setData ] = useState(null);
	const [ isPending, setIsPending ] = useState(true);
	const [ error, setError ] = useState(null);

	useEffect(
		() => {
			const abortCont = new AbortController();

			projectFirestore.collection(collection, { signal: abortCont.signal }).onSnapshot(
				(snap) => {
					let results = [];
					snap.docs.forEach((doc) => {
						results.push({ ...doc.data(), id: doc.id });
					});
					setData(results);
					setError(null);
					setIsPending(false);
				},
				(err) => {
					if (err.name === 'AbortError') {
						console.log('fetch aborted');
					} else {
						setData(null);
						setError(err.message);
						setIsPending(false);
						console.log(err.message);
					}
				}
			);

			return () => abortCont.abort();
		},
		[ collection ]
	);

	return { data, isPending, error };
};

export default useFetch;
