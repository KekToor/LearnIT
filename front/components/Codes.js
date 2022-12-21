const Codes = ({ codes }) => {
    return (
        <>
            <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 list-none text-md mb-2">
                {codes &&
                    codes.data.map((code) => {
                        return (
                            <li className="border rounded-md p-2" key={code.id}>
                                <a className="flex justify-center font-bold py-2" href={'code/' + code.id}>{code.attributes.title}</a>
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