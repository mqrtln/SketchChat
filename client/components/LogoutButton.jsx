import { getAuth } from "firebase/auth";
import { signOut } from "@firebase/auth";


export function LogoutButton(){
    const auth = getAuth();

    const handleSignOut = async () =>{
        try{
            await signOut(auth);
            console.log("Sign out successful");
            window.location.href = "/"; 

        } catch (error){
            console.log("Sign out failed");
        }
    }
}