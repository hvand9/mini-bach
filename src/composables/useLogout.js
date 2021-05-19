import { projectAuth } from '../firebase/config';
import { useState } from 'react';

const useLogout = () => {
	const [ error, setError ] = useState(null);

	const logout = async () => {
		setError(null);

		try {
			await projectAuth.signOut();
		} catch (err) {
			// console.log(err.message);
			setError(err.message);
		}
	};

	return { logout, error };
};

export default useLogout;
