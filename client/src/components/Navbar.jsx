//import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
//import SearchIcon from '@mui/icons-material/Search';
//import AddIcon from '@mui/icons-material/Add';
//import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {useSelector} from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const handle = useSelector(state => state.user.handle)
  return (
    <div className="bg-slate-800 w-full top-0 h-16 border-b-2 border-b-gray-200 p-5 flex justify-between items-center">
      <Link to="/" className="text-slate-50 font-bold text-xl">ClubConnect IIITD</Link>
      <div className="text-slate-50 p-4 flex space-x-10 border-solid">

        <NavLink to="/" className={({ isActive }) => isActive ? "px-4 py-2 rounded-lg bg-slate-600" : "px-4 py-2"}>
          Home
        </NavLink>

        <NavLink to="/clubs" className={({ isActive }) => isActive ? "px-4 py-2 rounded-lg bg-slate-600" : "px-4 py-2"}>
          Clubs
        </NavLink>

        <NavLink to={`/users/${handle}`} className={({ isActive }) => isActive ? "px-4 py-2 rounded-lg bg-slate-600" : "px-4 py-2"}>
          Profile
        </NavLink>

      </div>
    </div>
  )
}

export default Navbar
