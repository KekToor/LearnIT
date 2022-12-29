import Layout from "../components/Layout";
import {useFetchUser} from "../lib/authContext";
import {getIdFromLocalCookie, getTokenFromServerCookie} from "../lib/auth";
import {fetcher} from "../lib/api";
import {headers} from "next/headers";
import {useState} from "react";
import Image from "next/image";


const Profile = ({ avatar }) => {
    const {user, loading} = useFetchUser();
    const {image, setImage} = useState(null);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]){
            const tempImage = event.target.files[0];
            setImage(tempImage);
        }
    };

    const uploadToServer = async () => {
        const formData = new FormData();
        const file = image;
        formData.append('inputFile', file);
        formData.append('user_id', await getIdFromLocalCookie())
        try {

        } catch (error){
            console.error(JSON.stringify(error));
        }

    };

    return(
        <Layout user={user}>
            <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-3'>Profil</h1>
            <hr className={'my-2'}/>
            <h2>Vítej zpátky, uživateli <strong>{user}</strong>!</h2>
            <h2 className={"text-3xl md:text-4xl font-bold leading-tight my-3"}>Úprava profilu</h2>
            <hr className={'my-2'}/>
            {avatar === 'default_avatar' && (
                <div>
                    <h3>Nahrej vlastní profilový obrázek:</h3>
                    <input type={"file"} onChange={uploadToClient}/>
                    <button className={`p-2 rounded rounded-md text-white ` +
                        "bg-gradient-to-r from-sky-700 to-sky-500 bg-size-200" +
                        " hover:bg-gradient-to-l hover:from-purple-600 hover:to-purple-600"}
                            type={"submit"} onClick={uploadToServer}>
                        Nastavit obrázek
                    </button>
                </div>
            )}
            {avatar && (
                <>
                    <Image src={`${avatar !== 'default_avatar' ? (process.env.NEXT_PUBLIC_MEDIA_URL + avatar.url) : '/default_avatar.png'}`} alt={'Profilový obrázek'} width={100} height={100}/>
                    <div>Upload</div>
                </>
            )}
        </Layout>
    );
}

export async function getServerSideProps({req}){
    const jwt = getTokenFromServerCookie(req);
    if(!jwt) {
        return {
            redirect: {
                destination: '/'
            }
        }
    } else {
        const res = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate=avatar_img`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            });
        const avatar = res.avatar_img ? res.avatar_img : 'default_avatar';
        return {
            props: {
                avatar,
            },
        }
    }
}

export default Profile;