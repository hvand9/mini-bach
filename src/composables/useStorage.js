import { projectStorage } from '../firebase/config';
import { useState } from 'react';

const useStorage = (path) => {
	const [ filePath, setFilePath ] = useState(null);
	const [ url, setUrl ] = useState(null);
	const [ errorS, setErrorS ] = useState(null);

	const uploadImage = async (file) => {
		const storageRef = projectStorage.ref(path).child(file.name);

		try {
			const res = await storageRef.put(file);
			const link = await res.ref.getDownloadURL();
			setUrl(link);
		} catch (err) {
			console.log(err.message);
			setErrorS(err.message);
		}
	};

	return { url, filePath, errorS, uploadImage };
};

export default useStorage;
