import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import Codes from "../components/Codes";

const CodesList = ({ codes }) => {
    return (
        <Layout>
            <h1 className="flex justify-center text-4xl font-extrabold mb-3">
                <span className="text-black dark:text-gray-200">
                    List kódů
                </span>

            </h1>
            <div className="text-left">
                <Codes codes={codes}/>
            </div>
        </Layout>
    );
};

export default CodesList;

export async function getServerSideProps() {
    const codesRes = await fetcher( `${process.env.NEXT_PUBLIC_STRAPI_URL}/codes`);
    console.log(codesRes);
    return{
        props: {
            codes: codesRes
        }
    }
}