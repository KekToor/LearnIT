import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.core.css'

const Create = () => {
    const [codeData, setCodeData] = useState({
        title: '',
        desc: '',
        language: '',
        difficulty: 1,
        user: '',
        author: '',
        files: ''
    });
    const [text, setText] = useState('');
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), {ssr: false}),[]);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            ['code'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'code',
        'list', 'bullet', 'indent',
        'link'
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData;
    }

    return (
        <ReactQuill className={"bg-white text-black h-2/5"} theme="snow" modules={modules} formats={formats} value={text} onChange={setText}/>


    )

}

export default Create;