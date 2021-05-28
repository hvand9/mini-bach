import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFetchOneSub = (collection, id, subCollection, subId) => {
	const [ data, setData ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ errorOne, setErrorOne ] = useState(null);

	useEffect(
		() => {
			const abortCont = new AbortController();

			projectFirestore
				.collection(collection, { signal: abortCont.signal })
				.doc(id)
				.collection(subCollection)
				.doc(subId)
				.get()
				.then(
					(doc) => {
						const document = doc.data();
						setData(document);
						setErrorOne(null);
						setIsLoading(false);
					},
					(err) => {
						if (err.name === 'AbortError') {
							console.log('fetch aborted');
						} else {
							setData(null);
							setErrorOne(err.message);
							setIsLoading(false);
							console.log(err.message);
						}
					}
				);

			return () => abortCont.abort();
		},
		[ collection, id, subId, subCollection ]
	);

	return { dataOneSub: data, isLoadingOneSub: isLoading, errorOneSub: errorOne };
};

export default useFetchOneSub;
