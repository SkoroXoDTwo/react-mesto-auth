function Register() {
  return (
    <main>
      <section className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Регистрация</h2>
          <form className="auth__form">
            <input className="auth__input" placeholder="Email" />
            <input className="auth__input" placeholder="Пароль" />
            <button className="auth__btn-submit">Зарегистрироваться</button>
          </form>
          <button className="auth__btn-footer">Уже зарегистрированы? Войти</button>
        </div>
      </section>
    </main>
  );
}

export default Register;
