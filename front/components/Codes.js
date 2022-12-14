import Link from "next/link";

const Codes = ({ codes }) => {

    let total = 0;
    let count = 0;

    return (
        <>
            <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 list-none text-md mb-2">
                {!codes && (
                    <h2 className={"text-3xl md:text-4xl font-bold leading-tight text-center my-3"}>Vašemu vyhledávání nevyhovuje žádný záznam.</h2>
                )}
                {codes && (
                    <>
                        <div className={'col-span-1 lg:col-span-2 xl:col-span-3 ml-auto'}>
                            <Link href={'/code/create'}>
                                <button className={`p-2 rounded rounded-md text-white my-3 ` +
                                    "bg-gradient-to-r from-purple-500 to-pink-500 bg-size-200" +
                                    " hover:bg-gradient-to-l hover:from-purple-600 hover:to-purple-600"}>

                                        + Vytvořit záznam
                                </button>
                            </Link>
                        </div>
                    </>

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
                                <hr/>
                                <p className="font-normal text-justify">{code.attributes.desc}</p>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
};

export default Codes;