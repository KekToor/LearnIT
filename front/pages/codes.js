import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import Codes from "../components/Codes";
import useSWR from 'swr';
import {useState} from "react";
import {useFetchUser} from "../lib/authContext";
import Link from "next/link";

const CodesList = ({ codes }) => {
    const { user, loading } = useFetchUser();
    const [searchData, setSearchData] = useState({
        result: ''
    });
    console.log(searchData)
    const [pageIndex, setPageIndex] = useState(1);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSearchData({ ...searchData, [name]: value });
    };

    const { data } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/codes?pagination[page]=${pageIndex}&pagination[pageSize]=12&populate=reviews&filters[title][$contains]=${searchData.result}`, fetcher, {fallbackData: codes});
    return (
        <Layout user={user}>
            <h1 className='text-3xl md:text-5xl font-bold leading-tight mb-3 text-center md:text-left'>List kódů</h1>
            <hr className={"pt-2"}/>
            <div className="text-left">
                <div className={'grid grid-cols-1 sm:grid-cols-2 my-3'}>
                    {data && (
                        <>
                            <div className={'mx-auto sm:mr-auto sm:mx-0 col-span-1'}>
                                <input className={'border rounded text-black py-2 px-3 my-1'} type={"text"} name={"result"}
                                       placeholder={'Vyhledat'} onChange={(e) => handleChange(e)} required/>
                            </div>
                        </>
                    )}

                    {user && (
                        <>
                            <div className={'mx-auto sm:ml-auto sm:mx-0 col-span-1 mt-2 sm:mt-0'}>
                                <Link href={'/code/create'}>
                                    <button className={`p-2 rounded rounded-md text-white my-1 ` +
                                        "bg-gradient-to-r from-purple-500 to-pink-500 bg-size-200" +
                                        " hover:bg-gradient-to-l hover:from-purple-600 hover:to-purple-600"}>

                                        + Vytvořit záznam
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
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
    const codesRes = await fetcher( `${process.env.NEXT_PUBLIC_STRAPI_URL}/codes?pagination[page]=1&pagination[pageSize]=12&populate=reviews`);
    return{
        props: {
            codes: codesRes
        }
    }
}