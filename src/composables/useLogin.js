import { projectAuth } from '../firebase/config';
import { useState } from 'react';

const useLogin = () => {
	const [ error, setError ] = useState(null);

	const login = async (email, password) => {
		error.value = null;

		try {
			const res = await projectAuth.signInWithEmailAndPassword(email, password);
			setError(null);
			// console.log(res);
			return res;
		} catch (err) {
			// console.log(err.value);
			setError('Incorrect login credentials');
		}
	};

	return { error, login };
};

export default useLogin;
