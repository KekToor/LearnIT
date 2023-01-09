import Layout from "../../components/Layout";
import {useFetchUser} from "../../lib/authContext";
import {getTokenFromServerCookie} from "../../lib/auth";
import Create from "../../components/Create";

const CreateCode = () => {
    const { user, loading } = useFetchUser();

    return (
        <Layout user={user}>
            <Create/>
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const jwt = getTokenFromServerCookie(req);
    if (!jwt) {
        return {
            redirect: {
                destination: '/'
            }
        }
    } return {
        props: {}
    }
}

export default CreateCode;