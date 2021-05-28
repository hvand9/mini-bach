import { projectStorage } from '../firebase/config';
import { useState } from 'react';
import useGetUser from './useGetUser';

const useStorage = (path, type) => {
	const [ url, setUrl ] = useState(null);
	const [ errorS, setErrorS ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const { user } = useGetUser();

	const uploadImage = async (file) => {
		console.log(user);
		let storageRef;
		if (type === 'user') {
			storageRef = projectStorage.ref(path + '/' + user.uid).child(file.name);
		} else {
			storageRef = projectStorage.ref(path).child(file.name);
		}

		try {
			const res = await storageRef.put(file);
			setUrl(await res.ref.getDownloadURL());
			setLoading(false);
			console.log(res);
		} catch (err) {
			console.log(err.message);
			setErrorS(err.message);
		}
	};

	return { url, errorS, uploadImage, loading };
};

export default useStorage;
