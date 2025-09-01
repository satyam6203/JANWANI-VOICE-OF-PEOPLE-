import React, { useState, useEffect } from "react";
import { House, Tickets, UserRoundPen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";


function Navbar() {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setActive("home");
    } else if (location.pathname === "/mytickets") {
      setActive("tickets");
    } else if (location.pathname === "/profile") {
      setActive("profile");
    }
  }, [location.pathname]);

  // text color for each button
  const linkClasses = (name) =>
    `flex flex-col items-center text-[10px] ${active === name ? "text-[#FFA21F]" : "text-[#A6A6A6]"
    }`;

  // Button order
  const buttonOrder = ["home", "tickets", "profile"];
  const activeIndex = buttonOrder.indexOf(active);
  const sliderStyle = {
    transform: `translateX(${activeIndex*100 }%)`,
  };

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2
                bg-[#E8E8E8] w-[75%] max-w-md h-14  /* <-- increased height */
                rounded-3xl flex items-center justify-around shadow-lg text-white  overflow-hidden">
     <Link to="/">
      <button onClick={() => setActive("home")} className={linkClasses("home")}>
        <House size={20} />
        <span>Home</span>
      </button>
      </Link>

      <Link to="/mytickets">
        <button onClick={() => setActive("tickets")} className={linkClasses("tickets")}>
          <Tickets size={20} />
          <span>My Tickets</span>
        </button>
      </Link>

      <Link to="/profile">
        <button onClick={() => setActive("profile")} className={linkClasses("profile")}>
          <UserRoundPen size={20} />
          <span>Profile</span>
        </button>
      </Link>


      {/* Slider */}
      <div
        style={sliderStyle}
        className="absolute bottom-0 left-0 w-1/3 h-[3px] bg-black rounded-full transition-transform duration-300"
      />
    </div>
  );
}

export default Navbar