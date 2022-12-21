import Head from "next/head";
import Nav from './Nav';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>LearnIT</title>
            <link rel="icon" type="image/x-icon" href="/yes.jpg"/>F
        </Head>

        <Nav />
        <main className='px-2 text-black dark:text-gray-200'>
            <div className='bg-white dark:bg-slate-800 mx-auto rounded-lg w-3/4 p-12 my-16'>
                <div className='font-medium'> {children} </div>
            </div>
        </main>
    </>
);

export default Layout;