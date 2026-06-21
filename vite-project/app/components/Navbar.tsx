import { Link } from "react-router";
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">Resumind</p>
      </Link>
      <Link to="uploads" className="primary-button w-fit">
        Upload Your Resume
      </Link>
    </nav>
  );
};

export default Navbar;
