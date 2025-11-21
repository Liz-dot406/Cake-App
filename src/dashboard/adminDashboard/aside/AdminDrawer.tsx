import { Link } from "react-router-dom"
import { adminDrawerData } from "./drawerData"

export const AdminDrawer = () => {
    return (
        <div className="bg-pink-200 h-full">
            <h2 className="text-xl font-bold text-white p-4 bg-pink-700 border-b border-pink-900">
                Dashboard Menu
            </h2>

            <ul>
                {adminDrawerData.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={item.link}
                            className="flex items-center space-x-3 p-4 text-pink-900 
                                       hover:bg-pink-300 hover:text-pink-900 
                                       transition-all duration-200"
                        >
                            <span className="text-lg">{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
