import { useState } from "react";

function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
    handleRegister(formValue.password, formValue.email);
  };

  return (
    <main>
      <section className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Регистрация</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            <input
              className="auth__input"
              name="email"
              value={formValue.email}
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              className="auth__input"
              name="password"
              value={formValue.password}
              placeholder="Пароль"
              onChange={handleChange}
            />
            <button className="auth__btn-submit">Зарегистрироваться</button>
          </form>
          <button className="auth__btn-footer">
            Уже зарегистрированы? Войти
          </button>
        </div>
      </section>
    </main>
  );
}

export default Register;
