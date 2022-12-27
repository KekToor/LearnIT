import Head from "next/head";
import Nav from './Nav';
import { UserProvider } from "../lib/authContext";

const Layout = ({ user, loading = false, children }) => (
    <UserProvider value={{user,loading}}>
        <Head>
            <meta charSet="UTF-8"/>
            <meta name="description" content="Coding tutorials"/>
            <meta name="keywords" content="HTML,CSS,XML,JavaScript,Python"/>
            <meta name="author" content="Tomáš Fryčka"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <title>LearnIT</title>
            <link rel="icon" type="image/x-icon" href="/yes.jpg"/>
        </Head>

        <Nav />
        <main className='px-2 text-black dark:text-gray-200'>
            <div className='bg-white dark:bg-slate-800 mx-auto rounded-lg w-3/4 p-12 my-16'>
                <div className='font-medium'> {children} </div>
            </div>
        </main>
    </UserProvider>
);

export default Layout;