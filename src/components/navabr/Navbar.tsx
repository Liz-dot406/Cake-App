import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export const Navbar = () => {
  

    return (
        <div className="navbar bg-pink-50 shadow-md px-6 py-3 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-pink-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li><Link to="/" className="text-pink-800 hover:text-pink-600">Home</Link></li>
                        <li><Link to="/about" className="text-pink-800 hover:text-pink-600">About</Link></li>
                        <li><Link to="/cakes" className="text-pink-800 hover:text-pink-600">Cakes</Link></li>
                        <li><Link to="/contact" className="text-pink-800 hover:text-pink-600">Contact</Link></li>
                        <li><Link to="/login" className="text-pink-800 hover:text-pink-600">login</Link></li>
                        <li><Link to="/Register" className="text-pink-800 hover:text-pink-600">Register</Link></li>
                        <li><Link to="/admin/dashboard/users" className="text-pink-800 hover:text-pink-600">Dashboard</Link></li>

                      
                        
                    </ul>
                </div>

                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Bakers House Logo" className="w-10 h-10 rounded-full" />
                    <span className="text-xl font-semibold text-pink-800 tracking-wide">Bakers House</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" className="text-pink-800 hover:text-pink-600 font-medium">Home</Link></li>
                    <li><Link to="/about" className="text-pink-800 hover:text-pink-600 font-medium">About</Link></li>
                    <li><Link to="/cakes" className="text-pink-800 hover:text-pink-600 font-medium">Cakes</Link></li>
                    <li><Link to="/contact" className="text-pink-800 hover:text-pink-600 font-medium">contact</Link></li>
                    <li><Link to="/login" className="text-pink-800 hover:text-pink-600 font-medium">login</Link></li>
                    <li><Link to="/Register" className="text-pink-800 hover:text-pink-600 font-medium">Register</Link></li>
                    <li><Link to="/admin/dashboard/users" className="text-pink-800 hover:text-pink-600 font-medium">Dashboard</Link></li>

               
                </ul>
            </div>

            <div className="navbar-end gap-2">
                <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9M10 21h4" />
                        </svg>
                        <span className="badge badge-xs badge-pink-600 indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
    );
};
