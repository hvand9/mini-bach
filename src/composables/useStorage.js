import { projectStorage } from '../firebase/config';
import { useState } from 'react';

const useStorage = (path) => {
	const [ url, setUrl ] = useState(null);
	const [ errorS, setErrorS ] = useState(null);
	const [ loading, setLoading ] = useState(true);

	const uploadImage = async (file) => {
		const storageRef = projectStorage.ref(path).child(file.name);

		try {
			const res = await storageRef.put(file);
			setUrl(await res.ref.getDownloadURL());
			setLoading(false);
		} catch (err) {
			console.log(err.message);
			setErrorS(err.message);
		}
	};

	return { url, errorS, uploadImage, loading };
};

export default useStorage;
