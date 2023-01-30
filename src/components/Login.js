function Login() {
  return (
    <main>
      <section className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Вход</h2>
          <form className="auth__form">
            <input className="auth__input" placeholder="Email" />
            <input className="auth__input" placeholder="Пароль" />
            <button className="auth__btn-submit">Войти</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
