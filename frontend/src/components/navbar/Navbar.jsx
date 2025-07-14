import "./navbar.css"
import ThemeToggle from "../theme/ThemeToggle"
const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <h4 className="logo">qodex .</h4>
        <div className="menus">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
