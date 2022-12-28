import Link from "next/link";
import {useEffect, useState} from "react";
import {fetcher} from "../lib/api";
import {setToken, unsetToken} from "../lib/auth";
import {useUser} from "../lib/authContext";

const Nav = () => {
    const [data, setData] = useState({
        identifier: '',
        password: ''
    });

    const [logo, setLogo] = useState('');

    const { user, loading } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    identifier: data.identifier,
                    password: data.password
            }),
        });
        setToken(resData);
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value});
    };

    const logout = () => {
        unsetToken();
    };

    useEffect(() => {
        const logo = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        console.log(logo);
        setLogo(logo);
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const logo = event.matches ? 'dark' : 'light';
            setLogo(logo);
        })
        }, []);

    return (
          <nav className='flex flex-wrap items-center justify-between w-full p-4 md:py-0 bg-white dark:bg-slate-800 text-lg text-black dark:text-gray-200'>
              <div>
                  <Link href="/" passHref>
                      <img className="m-3" src={`${logo === 'dark' ? '/learnit-light.png' : '/learnit.png'}`} width={159} height={50} alt="LearnIT Logo" />
                  </Link>
              </div>

              <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
                  <ul className="pt-2 text-base text-black dark:text-gray-200 md:flex md:justify-between md: pt-0 space-x-2">
                    <li>
                        <Link className="py-2 px-1 block hover:text-gray-300" href="/">
                            Domů
                        </Link>
                    </li>
                    <li>
                        <Link href="/codes" className="py-2 px-1 block hover:text-gray-300">
                            List Kódů
                        </Link>
                    </li>
                      {!loading &&
                          (user ? (
                              <li>
                                  <Link href="/profile" className="py-2 px-1 block hover:text-gray-300">
                                        Profil
                                  </Link>
                              </li>
                          ) : ('')
                          )
                      }
                      {!loading &&
                          (user ? (
                                  <li>
                                      <button className="p-2 ml-2 hover:text-gray-300 bg-pink-400 hover:bg-purple-500 rounded rounded-md text-white"
                                              onClick={logout}>
                                          Odhlásit se
                                      </button>
                                  </li>
                              ) : ('')
                          )
                      }
                      {!loading &&
                          (!user ? (
                              <>
                                  <li>
                                      <form onSubmit={handleSubmit} className="form-inline">
                                            <input type="text" name="identifier" onChange={handleChange}
                                               placeholder="Uživatelské jméno" className="p-2 form-input rounded mx-2 border dark:border-0 text-black"
                                               required
                                            />
                                            <input type="password" name="password" onChange={handleChange}
                                                   placeholder="Heslo" className="p-2 form-input rounded mx-2 border dark:border-0 text-black"
                                                   required
                                            />
                                          <button className="p-2 bg-blue-500 hover:bg-purple-500 rounded rounded-md text-white"
                                                  type="submit">
                                              Přihlásit se
                                          </button>
                                      </form>
                                  </li>
                                  <li>
                                      <button className="p-2 bg-pink-400 hover:bg-purple-500 rounded rounded-md text-white">
                                          <Link href="/register">
                                              Zaregistrovat se
                                          </Link>
                                      </button>
                                  </li>
                              </>
                              ) : ('')
                          )
                      }
                  </ul>
              </div>
          </nav>
    );
};

export default Nav;