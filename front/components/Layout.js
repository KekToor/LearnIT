import Head from "next/head";
import Nav from './Nav';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>LearnIT</title>
        </Head>

        <Nav />
        <main className='px-2'>
            <div className='flex justify-center items-center bg-white mx-auto rounded-lg w-2/4 p-16 my-16'>
                <div className='text-2xl font-medium'> {children} </div>
            </div>
        </main>
    </>
);

export default Layout;