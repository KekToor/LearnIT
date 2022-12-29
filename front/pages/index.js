import Layout from "../components/Layout";
import {useFetchUser} from "../lib/authContext";

export default function Home() {
    const { user, loading } = useFetchUser();
    return (
        <Layout user={user}>
            <h1 className='text-3xl md:text-5xl font-bold leading-tight mb-3 text-center md:text-left'>Vítejte na výukovém portálu LearnIT!</h1>
        </Layout>
    );
}
