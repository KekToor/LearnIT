import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import Codes from "../components/Codes";
import useSWR from 'swr';
import {useState} from "react";
import {useFetchUser} from "../lib/authContext";

const CodesList = ({ codes }) => {
    const { user, loading } = useFetchUser();
    const [pageIndex, setPageIndex] = useState(1);
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/codes?pagination[page]=${pageIndex}&pagination[pageSize]=9&populate=reviews`, fetcher, {fallbackData: codes});
    return (
        <Layout user={user}>
            <h1 className="flex justify-center text-4xl md:text-5xl font-bold mb-6">
                <span className="text-black dark:text-gray-200">
                    List kódů
                </span>

            </h1>
            <div className="text-left">
                <Codes codes={data}/>
                <div className='space-x-2 space-y-2'>
                    <div className='flex content-center justify-center gap-2'>
                        <button className={`md:p-2 rounded py-2 text-black dark:text-white p-2 ${pageIndex === 1 ? 'bg-gray-500' : 'bg-blue-400'}`}
                                disabled={pageIndex === 1}
                                onClick={() => setPageIndex(pageIndex - 1)}
                        >
                            {' '}
                            Předchozí
                        </button>
                        <button className={`md:p-2 rounded py-2 text-black dark:text-white p-2
                                        ${pageIndex === (data && data.meta.pagination.pageCount)
                            ? 'bg-gray-500' : 'bg-blue-400'}`}
                                disabled={pageIndex === (data && data.meta.pagination.pageCount)}
                                onClick={() => setPageIndex(pageIndex + 1)}
                        >
                            {' '}
                            Další
                        </button>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4'>
                        <div>
                            {`Zobrazuje se záznam ${(pageIndex - 1) * (data && data.meta.pagination.pageSize) + 1}
                            ${ ((pageIndex - 1) * (data && data.meta.pagination.pageSize) + 1) === (data && data.meta.pagination.total) ?
                                '' : `- ${((pageIndex * (data && data.meta.pagination.pageSize)) > (data && data.meta.pagination.total)) ?
                                (data && data.meta.pagination.total)
                                : pageIndex * (data && data.meta.pagination.pageSize)}`
                            
                            } ${(data && data.meta.pagination.total) > 4 ? 'z' : 'ze'}
                             ${data && data.meta.pagination.total} záznamů`}
                        </div>
                        <div className='text-right'>
                            {`Stránka ${pageIndex} ${(data && data.meta.pagination.pageCount) > 4 ? 'z':'ze'} ${
                            data && data.meta.pagination.pageCount
                        }`}
                        </div>
                    </div>

                </div>

            </div>
        </Layout>
    );
};

export default CodesList;

export async function getStaticProps() {
    const codesRes = await fetcher( `${process.env.NEXT_PUBLIC_STRAPI_URL}/codes?pagination[page]=1&pagination[pageSize]=9&populate=reviews`);
    return{
        props: {
            codes: codesRes
        }
    }
}