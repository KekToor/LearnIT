import Link from "next/link";

const Nav = () => {
  return (
      <nav className='flex flex-wrap items-center justify-between w-full p-4 md:py-0 bg-white text-lg text-black'>
          <div>
              <Link href="/" passHref>
                  <img className="m-3" src="/yes.jpg" width={50} height={50} alt="LearnIT Logo" />
              </Link>
          </div>

          <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
              <ul className="pt-2 text-base text-black md:flex md:justify-between md: pt-0 space-x-2">
                <li>
                    <Link className="md:p-1 py-2 block hover:text-gray-300" href="/">
                        Domů
                        {/*<a className="md:p-1 py-2 block hover:text-gray-300">Domů</a>*/}
                    </Link>
                </li>
                <li>
                    <Link href="/" className="md:p-1 py-2 block hover:text-gray-300">
                        List Kódů
                    </Link>
                </li>
              </ul>
          </div>
      </nav>
  );
};

export default Nav;