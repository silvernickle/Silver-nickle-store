//this function gets/creates users by pulling their info from google and stores it on sanity
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const createOrGetUser = async (response, setUser) => {

    const decoded = jwt_decode(response.credential);
    const { name, picture, sub } = decoded; //sub reps the unique identifier used by google
    //console.log(decoded);
    const user = {
        _id: sub,
        _type: 'user',
        id: sub, //reps the id used as a field name for sanity
        userName: name,
        image: picture
    }

    setUser(user);
    //addUser(user);

    await axios.post(`http://localhost:3000/api/auth/0auth`, user);
}