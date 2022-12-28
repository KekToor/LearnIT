import {Html, Head, Main, NextScript} from "next/document";

export default function Document () {
    return (
        <Html>
            <Head />
            <body className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'>
            {/* <body className={'bg-gradient-to-r from-teal-700 to-orange-600 text-white'}>*/}
                <Main />
                <NextScript />
            </body>
        </Html>
    );

}