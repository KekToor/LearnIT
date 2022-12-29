import {useRouter} from "next/router";
import {useState} from "react";
import {setToken} from "../lib/auth";
import {fetcher} from "../lib/api";

const Register = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        password: userData.password,
                        username: userData.username,
                    }),
                    method: 'POST'
                });
            setToken(resData);
            await router.push('/profile');
        } catch (error) {
            console.error(error);
        }
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className={'md:flex md:flex-wrap w-full'}>
            <div className={"border rounded-lg px-8 md:px-16 py-8 md:mx-auto md:max-w-md md:m-4"}>
                <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-5 mr-10'>
                    Registrace
                </h1>
                <form onSubmit={handleSubmit}
                className={'mb-4 md:flex md:flex-col md:flex-wrap'}>
                    <div className={'flex flex-col mb-4'}>
                        <label className={'text-lg mb-2 font-bold leading-tight'} htmlFor={'username'}>
                            Uživatelské jméno
                        </label>
                        <input className={'border rounded text-black py-2 px-3'} type={"text"} name={"username"}
                        onChange={(e) => handleChange(e)} placeholder={"Vytvořte si jméno"} required/>
                    </div>
                    <div className={'flex flex-col mb-4'}>
                        <label className={'text-lg mb-2 font-bold leading-tight'} htmlFor={'email'}>
                            E-mailová adresa
                        </label>
                        <input className={'border rounded text-black py-2 px-3'} type={"email"} name={"email"}
                               onChange={(e) => handleChange(e)} placeholder={"Vaše e-mailová adresa"} required/>
                    </div>
                    <div className={'flex flex-col mb-4'}>
                        <label className={'text-lg mb-2 font-bold leading-tight'} htmlFor={'password'}>
                            Heslo
                        </label>
                        <input className={'border rounded text-black py-2 px-3'} type={"password"} name={"password"}
                               onChange={(e) => handleChange(e)} placeholder={"Zvolte heslo"} required/>
                    </div>
                    <button className={"bg-blue-500 hover:bg-purple-600 font-medium p-3 rounded rounded-md text-white" +
                        " mt-5 mx-auto md:mx-3 transiton-all ease-in-out bg-gradient-to-br from-purple-800 via purple-400 to-pink-400 bg-size-200" +
                        " hover:bg-gradient-to-br hover:from-purple-800 hover:via-purple-600 hover:to-purple-500 hover:-translate-y-1 hover:scale-110 duration-200"}
                            type={"submit"}>
                        Vytvořit účet
                    </button>
                </form>
            </div>
        </div>
    )

}

export default Register;