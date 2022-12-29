import {useFetchUser} from "../lib/authContext";
import Layout from "../components/Layout";
import { default as RegisterComponent } from  '../components/Register';
import {getTokenFromServerCookie} from "../lib/auth";

const Register = () => {
    const { user, loading } = useFetchUser();
    return (
        <Layout user={user}>
            <RegisterComponent/>
        </Layout>
    )
}

export async function getServerSideProps({req}) {
    const jwt = getTokenFromServerCookie(req);
    if (jwt) {
        return {
            redirect: {
                destination: '/profile'
            }
        }
    } return {
        props: {}
    }
}

export default Register;