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

    const [navbarOpen, setNavbarOpen] = useState(false);
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
        window.matchMedia("(min-width: 768px)").addEventListener('change', event => {
            event.matches ? setNavbarOpen(false) : '';
        });
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
              <button type="button"
                      className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      aria-controls="navbar-default" aria-expanded="false"
              onClick={() => setNavbarOpen(!navbarOpen)}>
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"></path>
                  </svg>
              </button>
              <div className={`${navbarOpen ? "flex flex-col justify-between mx-2" : "hidden"} w-full md:flex md:items-center md:w-auto`} id="menu">
                  <ul className={`pt-2 text-base text-black dark:text-gray-200 md:flex md:justify-between md: pt-0 ${navbarOpen ? "space-x-0" : "space-x-2"}`}>
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
                                      <button className={"p-2 ml-2 rounded rounded-md text-white" +
                                          " bg-gradient-to-r from-pink-700 to-pink-500 bg-size-200" +
                                          " hover:bg-gradient-to-l hover:from-purple-600 hover:to-purple-600"}
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
                                          <div className={`${navbarOpen ? "flex flex-col space-y-2" : "space-x-4"}`}>
                                            <input type="text" name="identifier" onChange={handleChange}
                                               placeholder="Uživatelské jméno" className={`p-2 form-input rounded border dark:border-0 text-black`}
                                               required
                                            />
                                            <input type="password" name="password" onChange={handleChange}
                                                   placeholder="Heslo" className="p-2 form-input rounded border dark:border-0 text-black"
                                                   required
                                            />
                                          <button className={`p-2 rounded rounded-md text-white ` +
                                              "bg-gradient-to-r from-sky-700 to-sky-500 bg-size-200" +
                                              " hover:bg-gradient-to-l hover:from-purple-600 hover:to-purple-600"}
                                                  type="submit">
                                              Přihlásit se
                                          </button>
                                          </div>
                                      </form>
                                  </li>
                                  <li>
                                      <button className={`p-2 ${navbarOpen ? "w-full mt-2" : ""} rounded rounded-md text-white ` +
                                          "bg-gradient-to-r from-pink-700 to-pink-500 bg-size-200" +
                                          " hover:bg-gradient-to-l hover:from-purple-600 hover:to-purple-600"}>
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