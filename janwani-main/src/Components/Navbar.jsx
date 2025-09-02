import React, { useState, useEffect } from "react";
import { House, Tickets, UserRoundPen, MapPin, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // ✅ function to set active tab based on current path
  const getInitialActive = (path) => {
    if (path === "/") return "home";
    if (path === "/mytickets") return "tickets";
    if (path === "/profile") return "profile";
    if (path === "/map") return "map";
    if (path === "/notifications") return "notifications";
    return "home";
  };

  const [active, setActive] = useState(getInitialActive(location.pathname));

  // ✅ update active when location changes
  useEffect(() => {
    setActive(getInitialActive(location.pathname));
  }, [location.pathname]);

  // text color for each button
  const linkClasses = (name) =>
    `flex flex-col items-center text-[10px] ${
      active === name ? "text-[#FFA21F]" : "text-[#A6A6A6]"
    }`;

  // button order for slider calculation
  const buttonOrder = ["map", "notifications", "home", "tickets", "profile"];
  const activeIndex = buttonOrder.indexOf(active);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2
                    bg-[#E8E8E8] w-full h-14 flex items-center justify-around
                    shadow-lg overflow-hidden">

      <Link to="/map">
        <button onClick={() => setActive("map")} className={linkClasses("map")}>
          <MapPin size={20} />
          <span>Map</span>
        </button>
      </Link>

      <Link to="/notifications">
        <button
          onClick={() => setActive("notifications")}
          className={linkClasses("notifications")}
        >
          <Bell size={20} />
          <span>Notifications</span>
        </button>
      </Link>

      <Link to="/">
        <button
          onClick={() => setActive("home")}
          className={linkClasses("home")}
        >
          <House size={20} />
          <span>Home</span>
        </button>
      </Link>

      <Link to="/mytickets">
        <button
          onClick={() => setActive("tickets")}
          className={linkClasses("tickets")}
        >
          <Tickets size={20} />
          <span>My Tickets</span>
        </button>
      </Link>

      <Link to="/profile">
        <button
          onClick={() => setActive("profile")}
          className={linkClasses("profile")}
        >
          <UserRoundPen size={20} />
          <span>Profile</span>
        </button>
      </Link>

      {/* ✅ Slider */}
      <div
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
        className="absolute bottom-0 left-0 w-[20%] h-[3px] bg-black rounded-full transition-transform duration-300"
      />
    </div>
  );
}

export default Navbar;
