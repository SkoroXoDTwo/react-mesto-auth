import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
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
          <Link to="/sign-up">
            <button className="header__auth-btn">Регистрация</button>
          </Link>
        )}
        {location === "/sign-up" && (
          <Link to="/sign-in">
            <button className="header__auth-btn">Войти</button>
          </Link>
        )}

        {location === "/" && (
          <>
            <nav
              className={`header__menu ${
                isOpenMenu ? "header__menu_open" : null
              }`}
            >
              <p className="header__email">8888888@mail.ru</p>
              <button className="header__exit-btn">Выйти</button>
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
