import {useState, useMemo, useRef, useEffect} from "react";
import dynamic from "next/dynamic";
import hljs from "highlight.js";
import 'highlight.js/styles/monokai.css'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.core.css'
import {getTokenFromLocalCookie, getUserFromLocalCookie} from "../lib/auth";
import {fetcher} from "../lib/api";
import TurndownService from "turndown";

const Create = () => {
    const [codeFile, setCodeFile] = useState();
    const td = new TurndownService();
    td.addRule('pre', {
        filter: 'pre',
        replacement: function (content) {
            return '```\n' + content + '```';
        }
    });

    const [codeData, setCodeData] = useState({
        title: '',
        desc: '',
        language: '',
        difficulty: 1,
        author: '',
    });
    const [text, setText] = useState('');
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

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]){
            const tempFile = event.target.files[0];
            setCodeFile(tempFile);
        }
    };

    const handleChange = (e) => {
        console.log(e);
        console.log(e.target);
        const {name, value} = e.target;
        setCodeData({ ...codeData, [name]: value });
        console.log(codeData);
    };

    const logData = () => {
        console.log(codeData);
        console.log(text);
        console.log(codeFile);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData;
        await formData.append('title', codeData.title);
        await formData.append('desc', codeData.desc);
        await formData.append('language', codeData.language);
        await formData.append('difficulty', codeData.difficulty);
        await formData.append('author', await getUserFromLocalCookie());
        await formData.append('guidetext', text);
        const jwt = getTokenFromLocalCookie();
        try {
            await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/codes`, {
                method: 'POST',
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
            })
        } catch (error) {
            console.error('error', error);
        }
    }

    useEffect(() => {
        hljs.highlightAll();
    })

    return (
        <>
            <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-3' onClick={logData}>
                Vytvořit nový tutoriál
            </h1>
            <hr className={"py-2"}/>
            <form onSubmit={handleSubmit}>
                <div className={'flex mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                    <label className={'text-lg my-2 pr-3 font-bold leading-tight grid-cols-1'} htmlFor={'title'}>
                        Název tutoriálu
                    </label>
                    <input className={'border rounded text-black py-2 px-3'} type={"text"} name={'title'}
                           onChange={(e) => handleChange(e)} placeholder={"Název Vašeho tutoriálu"} required/>
                </div>
                <div className={'flex mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                    <label className={'text-lg my-2 pr-3 font-bold leading-tight grid-cols-1'} htmlFor={'language'}>
                        Programovací jazyk
                    </label>
                    <Select className={'text-black'} name={'language'} options={options} onChange={(val) => setCodeData({...codeData, language: val.value})}/>
                </div>
                <div className={'flex mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                    <label className={'text-lg my-2 pr-3 font-bold leading-tight grid-cols-1'} htmlFor={'desc'}>
                        Krátký popis
                    </label>
                    <textarea className={'border rounded text-black py-2 px-3 resize-none'} name={'desc'} rows={3}
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
                    Vytvořit tutoriál
                </button>
            </form>
        </>
    )

}

export default Create;