import {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import { getAuth, onAuthStateChanged} from 'firebase/auth';



export const useAuth = () => {
    const [user, setUser] = useState(null); 
    const auth = getAuth();
    

    useEffect(() => {
        const unsubrscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                setUser(authUser);
            
            } else {
                setUser(null);
            }
        });

        return unsubrscribe;
    }, []);

    return user;
}