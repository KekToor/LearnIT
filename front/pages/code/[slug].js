import {fetcher} from "../../lib/api";
import Layout from "../../components/Layout";
import {useFetchUser} from "../../lib/authContext";
import {getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie} from "../../lib/auth";
import {useRouter} from "next/router";
import {useState} from "react";
import {Rating} from "react-simple-star-rating";


const Code = ({ code }) => {
    const { user, loading } = useFetchUser();
    const router = useRouter();
    const [review, setReview] = useState({
        value: '',
    });

    const [rating, setRating] = useState({
        rating: 0
    })

    const handleChange = (e) => {
        setReview({ value: e.target.value });
    }

    const handleRating = (e) => {
        setRating({ rating: e});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const jwt = getTokenFromLocalCookie();
        try {
            const resData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    data: {
                        review: review.value,
                        rating: rating.rating,
                        reviewer: getUserFromLocalCookie(),
                        code: code.id
                    }
                })
            });
            router.reload();
        } catch (error) {
            console.error('error', error);
        }
    }

    return (
        <Layout user={user}>
            <div className={"flex flex-wrap items-center"}>
                <h1 className='text-4xl md:text-5xl font-extrabold leading-tight mb-3'>
                    {code.attributes.title}
                </h1>
                <div className={`text-4xl md:text-5xl text-white ml-auto mb-3 p-3 rounded-md ${code.attributes.difficulty < 6 ?
                    (code.attributes.difficulty < 4 ? "bg-green-400" : "bg-yellow-500") : (code.attributes.difficulty < 9 ? "bg-orange-500" : "bg-red-500")
                }`}>{code.attributes.difficulty}</div>
            </div>

            { user && (
                <>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                        Recenze
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <span>Hodnocení: </span>
                        <Rating onClick={handleRating} SVGclassName="inline-block" className={"scale-75 pb-1"}/>
                        <textarea className="flex w-2/5 text-sm px-3 py-2 text-black border rounded-lg focus:outline-none"
                        rows="4" value={review.value} onChange={handleChange} placeholder="Přidejde Vaši recenzi">
                        </textarea>
                        <button className="p-2 my-2 hover:text-gray-300 bg-pink-400 hover:bg-purple-500 rounded rounded-md text-white"
                                type="submit">
                            Přidat recenzi
                        </button>
                    </form>
                    <ul>
                        {code.attributes.reviews.data.length === 0 &&
                            (
                            <span>Žádné recenze. Buďte první kdo tuto ukázku zhodnotí!</span>
                        )}
                        {code.attributes.reviews &&
                            code.attributes.reviews.data.map((review) => {
                                return (
                                    <li key={review.id} className="w-4/5 border rounded-lg pt-2 my-3">
                                        <div className={"flex flex-wrap items-center"}>
                                            <span className={"font-bold pl-7 pb-1 text-lg"}>{review.attributes.reviewer}</span>
                                            <Rating initialValue={review.attributes.rating} readonly={true} className={"scale-75 pb-2"} SVGclassName={"inline-block"}/>
                                            <span className={"ml-auto pb-2 pr-5 align-middle"}>Vytvořeno {(review.attributes.createdAt).replace("T"," ").slice(0,-5)}</span>
                                        </div>

                                        <hr/>
                                        <p className="p-3 font-light">{review.attributes.review}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </>
            )}
        </Layout>
    );
};

export async function getServerSideProps({ req, params }) {
    const { slug } = params;
    const jwt =
        typeof window !== 'undefined' ? getTokenFromLocalCookie : getTokenFromServerCookie(req);
    // const codeRes = await fetcher( `${process.env.NEXT_PUBLIC_STRAPI_URL}/codes/${slug}`);
    const codeRes = await fetcher( `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/code/${slug}?populate=*`,
        jwt ?
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            } : ''
        );
    if(codeRes.data) {
        return{
            props: {
                code: codeRes.data,
                jwt: jwt ? jwt : ''
            }
        }
    } else {
        return {
            props: {
                error: codeRes.error.message,
            }
        }
    }

}

export default Code;