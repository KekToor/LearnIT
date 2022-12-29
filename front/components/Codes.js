import Link from "next/link";

const Codes = ({ codes }) => {

    let total = 0;
    let count = 0;

    return (
        <>
            <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 list-none text-md mb-2">
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
                        total!==0 ? total = (total / parseFloat(count)).toFixed(1) + " &#11088;" : total = "Žádné hodnocení";

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
                                <div className={"flex flex-wrap items-center w-full mb-2 font-normal"}>
                                    <div className={"mr-auto"}>
                                        Programovací jazyk: <strong>{code.attributes.language}</strong>
                                    </div>
                                    <div className={"ml-auto text-xl font-medium"} dangerouslySetInnerHTML={{__html: total}}></div>
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