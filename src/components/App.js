import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/Api";
import apiAuth from "../utils/AuthApi";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import avatarLoaderGif from "../images/avatar-loader.gif";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: "Загрузка...",
    about: "Загрузка...",
    avatar: avatarLoaderGif,
  });

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isErrorAuth, setIsErrorAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const isOpenPopup =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard;

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
        })
        .catch((e) => {
          setIsLoggedIn(false);
          console.log(e);
        });
    }
    api
      .getInitialUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    if (isOpenPopup) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpenPopup]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleRegister = (password, email) => {
    apiAuth
      .postRegister(password, email)
      .then((res) => {
        setIsErrorAuth(false);
        navigate("/sign-in");
      })
      .catch((e) => {
        setIsErrorAuth(true);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = (password, email) => {
    apiAuth.postLogin(password, email).then((data) => {
      console.log(data);
      if (data.token) {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        navigate("/");
      }
    }).catch((e) => {
      console.log(e);
    });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((stateCard) =>
            stateCard._id === card._id ? newCard : stateCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((_) => {
        setCards((state) =>
          state.filter((stateCard) => stateCard._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);

    api
      .pathUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);

    api
      .patchAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);

    api
      .postCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  Component={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <PopupWithForm name="delete_item" title="Вы уверены?" btnName="Да" />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isError={isErrorAuth}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
