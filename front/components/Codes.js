import Link from "next/link";

const Codes = ({ codes }) => {
    return (
        <>
            <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 list-none text-md mb-2">
                {codes &&
                    codes.data.map((code) => {
                        return (
                            <li className="border rounded-md p-2" key={code.id}>
                                <Link className="flex justify-center font-extrabold py-2 text-lg" href={'code/' + code.attributes.slug}>{code.attributes.title}</Link>
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