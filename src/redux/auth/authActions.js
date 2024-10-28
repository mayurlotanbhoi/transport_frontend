import { useLoginMutation } from '../../services/auth-service';
import { useDispatch } from 'react-redux';

export const useLogin = () => {
    const dispatch = useDispatch();
    const [login, { isLoading, error }] = useLoginMutation();
    const loginUser = async (credentials) => {
        try {
            const data = await login(credentials).unwrap();
            // handle additional login logic if necessary
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return { loginUser, isLoading, error };
};
