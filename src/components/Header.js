import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ onSignOut, loginUser }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const location = useLocation().pathname;

  const openMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo"></div>
        {location === "/sign-in" && (
          <Link to="/sign-up" className="header__auth-btn">
            Регистрация
          </Link>
        )}
        {location === "/sign-up" && (
          <Link to="/sign-in" className="header__auth-btn">
            Войти
          </Link>
        )}

        {location === "/" && (
          <>
            <nav
              className={`header__menu ${
                isOpenMenu ? "header__menu_open" : null
              }`}
            >
              <p className="header__email">{loginUser}</p>
              <button className="header__exit-btn" onClick={onSignOut}>
                Выйти
              </button>
            </nav>
            <button
              className={`header__burger-btn ${
                isOpenMenu ? " header__burger-btn_open" : null
              }`}
              onClick={openMenu}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
