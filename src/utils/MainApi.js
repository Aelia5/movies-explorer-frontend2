function MainApi() {
  const BASE_URL = "https://api.aelia.diploma.nomoredomainsmonster.ru";

  function register(data) {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 201) {
        return res.json();
      } else {
        if (res.status === 409) {
          return Promise.reject("Пользователь с таким email уже существует.");
        } else {
          return Promise.reject(
            "При регистрации пользователя произошла ошибка"
          );
        }
      }
    });
  }

  function login(data) {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        return Promise.reject("Вы ввели неправильный логин или пароль");
      } else {
        return Promise.reject(
          "При авторизации произошла ошибка. Токен не передан или передан не в том формате"
        );
      }
    });
  }

  function getUser(token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        return Promise.reject(
          "При авторизации произошла ошибка. Переданный токен некорректен."
        );
      } else {
        return Promise.reject(
          "При авторизации произошла ошибка. Токен не передан или передан не в том формате"
        );
      }
    });
  }

  function editProfileData(newData) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',},
      body: JSON.stringify({
        name: newData.name,
        email: newData.email,
      }),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 409) {
        return Promise.reject(
          "Пользователь с таким email уже существует."
        );
      } else {
        return Promise.reject(
          "При обновлении профиля произошла ошибка."
        );
      }
    });
  }

  return { register, login, getUser, editProfileData };
}



export default MainApi;
