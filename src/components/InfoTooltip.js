function InfoTooltip() {
  return (
    <div
      className={`popup ${true ? "popup_opened" : ""}`}
      id={`popup_info_tool`}
    >
      <div className="popup__container">
        {
          <button
            className="popup__close-btn"
            type="button" /* onClick={onClose}*/
          />
        }
        <div className="popup__info-icon" />
        <h2 className="popup__title popup__title_type_info-tool">Вы успешно зарегистрировались!</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
