import { NavLink } from "react-router";
import { FaBars } from "react-icons/fa";
const Sidebar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-800 font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-green-800 font-bold" : ""
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/properties"
          className={({ isActive }) =>
            isActive ? "text-green-800 font-bold" : ""
          }
        >
          Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            isActive ? "text-green-800 font-bold" : ""
          }
        >
          FAQ
        </NavLink>
      </li>
      <li>
        <NavLink>Login</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button btn ">
            <FaBars className="text-2xl" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
