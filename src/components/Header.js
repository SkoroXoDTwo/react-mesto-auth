import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation().pathname;
  console.log(location);
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo"></div>
        {
          location === "/sign-in" &&
          <Link to="/sign-up">
            <button className="header__auth-btn">Регистрация</button>
          </Link>
        }
        {
          location === "/sign-up" &&
          <Link to="/sign-in">
            <button className="header__auth-btn">Войти</button>
          </Link>
        }

        {
          location === "/" &&
          <nav className="header__menu">
            <p className="header__email">8888888@mail.router</p>
            <button className="header__exit-btn">Выйти</button>
          </nav>
        }
      </div>
    </header>
  );
}

export default Header;
