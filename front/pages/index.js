import Layout from "../components/Layout";
import {useFetchUser} from "../lib/authContext";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Home() {
    const { user, loading } = useFetchUser();
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const tm = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        setTheme(tm);
    })

    return (
        <Layout user={user}>
            {!loading && (
                <>
                    <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-3 text-center md:text-left'>Vítejte na výukovém portálu LearnIT!</h1>
                    <hr className={"pt-2"}/>
                    <p className={'text-lg'}>
                        LearnIT je webová aplikace sloužící ke tvorbě návodů k různorodým programovacím příkladům.
                    </p>
                    <h2 className={'text-3xl md:text-4xl font-bold leading-tight my-3 text-center md:text-left'}>Proč LearnIT?</h2>
                    <hr className={"py-2"}/>
                    <div className={'grid grid-cols-1 xl:grid-cols-3 gap-3'}>
                        <div className={'flex flex-col content-center border-gray-500 rounded-md p-3'}>
                            <Image src={`/user-${theme}.png`} alt={'user-image'} className={'mx-auto pt-1'} width={70} height={70}/>
                            <h2 className={'mx-auto text-xl'}>Uživatelská přívětivost</h2>
                            <p className={'pt-2 text-justify'}>
                                Aplikace LearnIT disponuje plnou responzivitou, jednoduchým designem a uživatelskéhým
                                rozhraním, ve kterém se jen tak neztratíte.
                            </p>
                        </div>
                        <div className={'flex flex-col content-center row-span-1 xl:row-span-2 xl:col-span-2 my-auto'}>
                            <Image src={'/ukazka-ui.png'} alt={'Ukázka UI'} className={'border rounded mt-3 mx-auto'} width={1920} height={1080}/>
                        </div>
                        <div className={'flex flex-col content-center p-3 pb-8'}>
                            <Image src={`/review-${theme}.png`} alt={'user-image'} className={'mx-auto pt-2 p-1'} width={70} height={70}/>
                            <h2 className={'mx-auto text-xl'}>Možnost zpětné vazby</h2>
                            <p className={'pt-2 text-justify'}>
                                Líbí se vám nějaký z tutoriálů, případně máte zájem poskytnout jeho autorovi zpětnou vazbu?
                                Systém recenzí je zde pro vás! Každý tutoriál můžete libovolně ohodnotit a poslat autorovi komentář.
                            </p>
                        </div>

                        <div className={'flex flex-col content-center row-span-1 xl:row-span-2 xl:col-span-2 my-auto'}>
                            <Image src={'/ukazka-form.png'} alt={'Ukázka Formulářů'} className={'border rounded mt-3 mx-auto'} width={1920} height={1080}/>
                        </div>
                        <div className={'flex flex-col content-center p-3'}>
                            <Image src={`/add-${theme}.png`} alt={'user-image'} className={'mx-auto pt-1'} width={70} height={70}/>
                            <h2 className={'mx-auto text-xl'}>Jednoduchá tvorba tutoriálů</h2>
                            <p className={'pt-2 text-justify'}>
                                Přihlášeným uživatelům poskytujeme přístup ke <strong><i>tvůrci tutoriálů</i></strong>, s
                                kterým může každý přispět svým vlastním tutoriálem!
                            </p>
                        </div>
                        <div className={'flex flex-col content-center p-3 pb-8'}>
                            <Image src={`/edit-${theme}.png`} alt={'user-image'} className={'mx-auto pt-1'} width={70} height={70}/>
                            <h2 className={'mx-auto text-xl'}>Úprava a mazání tutoriálů</h2>
                            <p className={'pt-2 text-justify'}>
                                Udělali jste při tvorbě vašeho tutoriálu chybu, nebo se Vám vaše tvorba již nelíbí?
                                Zbavte se jí jednodušeji než kdy jindy s využitím <strong><i>editoru kódů</i></strong>,
                                případně jej v libovolnou chvíli smažte!
                            </p>
                        </div>
                    </div>
                    <hr className={"pt-8 mt-3"}/>
                    <h2 className={'text-3xl md:text-4xl font-bold leading-tight my-3 text-center'}>Tak na co ještě čekáte? Vyzkoušejte LearnIT již nyní!</h2>
                </>
            )}

        </Layout>
    );
}
