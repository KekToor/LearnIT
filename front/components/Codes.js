import Link from "next/link";
import {useFetchUser} from "../lib/authContext";
import Image from "next/image";
import Swal from "sweetalert2";
import {getTokenFromLocalCookie, getUserFromLocalCookie} from "../lib/auth";
import {fetcher} from "../lib/api";
import Router from "next/router";

const Codes = ({ codes }) => {
    const { user, loading } = useFetchUser();

    const deleteData = async (data) => {
        const jwt = getTokenFromLocalCookie();
        try {
            const resData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/codes/${data}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
        } catch (error) {
            console.error('error', error);
        }
    }

    const handleDeletion = async (e) => {
        await Swal.fire({
            title: 'Opravdu chcete tutoriál smazat?',
            text: "Tuto akci nelze vrátit!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ano, smazat!',
            cancelButtonText: 'Ne, vrátit'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(e.target.alt);
                Swal.fire(
                    'Úspěch!',
                    'Váš tutoriál byl smazán.',
                    'success'
                ).then((result) => {
                    if(result.isConfirmed) {
                        Router.reload();
                    }
                })
            }
        })
    }

    let total = 0;
    let count = 0;

    return (
        <>
            <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 list-none text-md mt-4 mb-2">
                {codes.data.length === 0 && (
                    <h2 className={"text-3xl md:text-4xl font-bold leading-tight text-center my-3"}>Vašemu vyhledávání nevyhovuje žádný záznam.</h2>
                )}
                {codes &&
                    codes.data.map((code) => {
                        total = 0;
                        count = 0;
                        code.attributes.reviews.data ? (
                            code.attributes.reviews.data.map((review) => {
                                total += review.attributes.rating;
                                count++;
                            })
                        ) : total = 0;
                        total!==0 ? total = (total / parseFloat(count)).toFixed(1) + " &#11088;" : total = "Nehodnoceno";

                        return (
                            <li className="border rounded-md p-2" key={code.id}>
                                <div className={"flex flex-wrap items-center"}>
                                    <h1 className='text-2xl md:text-3xl font-bold leading-tight pl-1 hover:text-sky-400'>
                                        <Link href={'code/' + code.attributes.slug}>{code.attributes.title}</Link>
                                    </h1>
                                    <div className={`text-xl md:text-2xl text-white ml-auto mb-2 p-3 rounded-md ${code.attributes.difficulty < 6 ?
                                        (code.attributes.difficulty < 4 ? "bg-green-400" : "bg-yellow-500") : (code.attributes.difficulty < 9 ? "bg-orange-500" : "bg-red-500")
                                    }`}>{code.attributes.difficulty}</div>
                                </div>
                                <hr/>
                                <div className={"flex flex-wrap items-center w-full font-normal"}>
                                    <div className={"mr-auto"}>
                                        Programovací jazyk: <strong>{code.attributes.language}</strong>
                                    </div>
                                    <div className={"ml-auto text-xl font-medium"} dangerouslySetInnerHTML={{__html: total}}></div>
                                </div>
                                <div className={"flex flex-wrap items-center w-full mb-2 font-normal"}>
                                    <div className={"mr-auto"}>
                                        Vytvořeno <i><strong>{(code.attributes.createdAt).replace("T"," ").slice(0,-5)}</strong></i>
                                    </div>
                                    <div className={"ml-auto"}>
                                        Autor: <strong>&nbsp;{code.attributes.author}</strong>
                                    </div>
                                </div>
                                <hr className={'mb-1'}/>
                                <div className={'grid'}>
                                    <p className="font-normal text-justify">{code.attributes.desc}</p>
                                </div>
                                <hr className={'mt-1'}/>
                                {user === code.attributes.author && (
                                    <>
                                        <div className={"flex flex-wrap items-center w-full mb-2 font-normal mt-2 mb-auto"}>
                                            <div className={"mr-auto cursor-pointer"} onClick={handleDeletion}>
                                                    <Image src={'/delete.png'} alt={code.id} className={'bg-white p-1 rounded-md mr-1 hover:bg-red-500'} width={25} height={25}/>
                                            </div>
                                            <div className={"ml-auto"}>
                                                <Link href={'code/edit/' + code.attributes.slug}>
                                                    <Image src={'/edit.png'} alt={'Edit button'} className={'bg-white rounded-md mr-1 hover:bg-sky-400'} width={25} height={25}/>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
};

export default Codes;