import {fetcher} from "../../lib/api";
import Layout from "../../components/Layout";

const Code = ({ code }) => {
    return (
        <Layout>
            <h1 className='text-4xl md:text-5xl font-extrabold leading-tight mb-3'>
                {code.attributes.title}
            </h1>
        </Layout>
    );
};

export async function getServerSideProps({ params }) {
    const { slug } = params;
    // const codeRes = await fetcher( `${process.env.NEXT_PUBLIC_STRAPI_URL}/codes/${slug}`);
    const codeRes = await fetcher( `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/code/${slug}`);
    return{
        props: {
            code: codeRes.data
        }
    }
}

export default Code;