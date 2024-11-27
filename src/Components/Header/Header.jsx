import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import { RiSearchEyeFill } from "react-icons/ri";

const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div>
        <Link to={"/tvshows"}>TV Shows</Link>
        <Link to={"/movies"}>Movies</Link>
        <Link to={"/recent"}>Recently Added</Link>
        <Link to={"/mylist"}>MyList</Link>
      </div>
      <RiSearchEyeFill />
    </nav>
  );
};

export default Header;
