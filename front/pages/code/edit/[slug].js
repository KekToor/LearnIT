import {useFetchUser} from "../../../lib/authContext";
import Layout from "../../../components/Layout";
import {getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie} from "../../../lib/auth";
import {fetcher} from "../../../lib/api";
import markdownToHtml from "../../../lib/markdownToHTML";
import 'highlight.js/styles/monokai.css'
import 'react-quill/dist/quill.snow.css'
import hljs from "highlight.js";
import TurndownService from "turndown";
import {useEffect, useMemo, useState} from "react";
import dynamic from "next/dynamic";
import Router from "next/router";


const Edit = ({code, jwt, guidetext, slug, error}) => {
    const {user, loading} = useFetchUser();
    console.log(code);
    console.log(guidetext);
    console.log(jwt);

    const td = new TurndownService();
    td.addRule('pre', {
        filter: 'pre',
        replacement: function (content) {
            return '```\n' + content + '```';
        }
    });

    const [codeData, setCodeData] = useState({
        title: code.attributes.title,
        desc: code.attributes.desc,
        language: code.attributes.language,
        difficulty: code.attributes.difficulty,
        author: code.attributes.author,
    });
    const [text, setText] = useState(guidetext);
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), {ssr: false}),[]);
    const Select = useMemo(() => dynamic(() => import('react-select'), {ssr: false}),[]);

    const options = [
        {value: 'Javascript', label: 'Javascript'},
        {value: 'Python',label: 'Python'},
        {value: 'Go',label: 'Go'},
        {value: 'Java',label: 'Java'},
        {value: 'Kotlin',label: 'Kotlin'},
        {value: 'PHP',label: 'PHP'},
        {value: 'C#',label: 'C#'},
        {value: 'Swift',label: 'Swift'},
        {value: 'R',label: 'R'},
        {value: 'C/C++',label: 'C/C++'},
        {value: 'Matlab',label: 'Matlab'},
        {value: 'Scala',label: 'Scala'},
        {value: 'TypeScript',label: 'TypeScript'},
        {value: 'SQL',label: 'SQL'},
        {value: 'HTML',label: 'HTML'},
        {value: 'CSS',label: 'CSS'},
        {value: 'NoSQL',label: 'NoSQL'},
        {value: 'Rust',label: 'Rust'},
        {value: 'Perl',label: 'Perl'},
        {value: 'TěškoviC', label: 'TěškoviC'}
    ];

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            ['code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'code-block',
        'list', 'bullet', 'indent',
        'link'
    ]

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCodeData({ ...codeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwt = getTokenFromLocalCookie();
        try {
            await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/codes/${code.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        data: {
                            title: codeData.title,
                            desc: codeData.desc,
                            language: codeData.language,
                            difficulty: codeData.difficulty,
                            author: await getUserFromLocalCookie(),
                            guidetext: td.turndown(text)
                        }
                    }
                )
            }).then(Router.push(`/code/${slug}`));
        } catch (error) {
            console.error('error', error);
        }

    }

    const logData = () => {
        console.log(codeData);
        console.log(text);
    }

    useEffect(() => {
        hljs.highlightAll();
    })

    return(
        <Layout user={user}>
            {!loading && (
                user && (
                    <>
                        <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-3' onClick={logData}>
                            Upravit tutoriál
                        </h1>
                        <hr className={"py-2"}/>
                        <form onSubmit={handleSubmit}>
                            <div className={'flex mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                                <label className={'text-lg my-2 pr-3 font-bold leading-tight grid-cols-1'} htmlFor={'title'}>
                                    Název tutoriálu
                                </label>
                                <input className={'border rounded text-black py-2 px-3'} type={"text"} name={'title'} value={codeData.title}
                                       onChange={(e) => handleChange(e)} placeholder={"Název Vašeho tutoriálu"} required/>
                            </div>
                            <div className={'flex mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                                <label className={'text-lg my-2 pr-3 font-bold leading-tight grid-cols-1'} htmlFor={'language'}>
                                    Programovací jazyk
                                </label>
                                <Select className={'text-black'} value={{value: codeData.language, label: codeData.language}} name={'language'} options={options} onChange={(val) => setCodeData({...codeData, language: val.value})}/>
                            </div>
                            <div className={'flex mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                                <label className={'text-lg my-2 pr-3 font-bold leading-tight grid-cols-1'} htmlFor={'desc'}>
                                    Krátký popis
                                </label>
                                <textarea className={'border rounded text-black py-2 px-3 resize-none'} value={codeData.desc} name={'desc'} rows={3}
                                          onChange={(e) => handleChange(e)} placeholder={"Název Vašeho tutoriálu"} required/>
                            </div>
                            <div className={'flex mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                                <label className={'text-lg my-3 pr-3 font-bold leading-tight grid-cols-1'} htmlFor={'difficulty'}>
                                    Obtížnost
                                </label>
                                <input className={'rounded-lg cursor-pointer'} type={"range"} name={'difficulty'}
                                       onChange={(e) => handleChange(e)} min={1} max={10} value={codeData.difficulty} required/>
                                <div className={`text-md md:text-lg text-white mr-auto ml-2 mb-2 p-2 rounded-md ${codeData.difficulty < 6 ?
                                    (codeData.difficulty < 4 ? "bg-green-400" : "bg-yellow-500") :
                                    (codeData.difficulty < 9 ? "bg-orange-500" : "bg-red-500")}`}>{codeData.difficulty}</div>
                            </div>
                            <div className={'flex mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                                <label className={'text-xl mt-3 mb-1 pr-3 font-bold leading-tight grid-cols-1'} htmlFor={'guidetext'}>
                                    Text tutoriálu
                                </label>
                            </div>
                            <ReactQuill className={"bg-white text-black"} theme="snow" modules={modules} formats={formats} name={'guidetext'} value={text} onChange={setText}/>
                            <button
                                className={`mt-10 p-2 px-6 rounded rounded-md text-white ` +
                                    "bg-gradient-to-r from-sky-700 to-sky-500 bg-size-200" +
                                    " hover:bg-gradient-to-l hover:from-purple-600 hover:to-purple-600"}
                                type="submit">
                                Upravit tutoriál
                            </button>
                        </form>
                    </>
                )
            )}
        </Layout>
    )
}

export async function getServerSideProps({ req, params }) {
    const { slug } = params;
    const jwt = getTokenFromServerCookie(req);
    if(!jwt){
        return {
            redirect: {
                destination: '/codes'
            }
        }
    } else {
        const codeRes =  await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/code/${slug}`,
            jwt ?
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                } : ''
        );
        if(codeRes.data) {
            const guidetext = await markdownToHtml(codeRes.data.attributes.guidetext);
            return {
                props: {
                    code: codeRes.data,
                    guidetext,
                    jwt: jwt ? jwt : '',
                    slug: slug
                }
            }
        } else {
            return {
                props: {
                    error: codeRes.error.message
                }
            }
        }
    }

}

export default Edit;