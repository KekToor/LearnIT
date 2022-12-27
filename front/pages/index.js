import Layout from "../components/Layout";
import {useFetchUser} from "../lib/authContext";

export default function Home() {
    const { user, loading } = useFetchUser();
    return (
        <Layout user={user}>
            <h1 className="font-bold text-4xl">Co je to kvadrant</h1>
        </Layout>
    );
}
