const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

document.getElementById("registration").addEventListener("click", function (e) {
  e.preventDefault();
  let registerForm = document.forms["registerForm"];
  let userName = registerForm.elements["userName"].value;
  let userEmail = registerForm.elements["userEmail"].value;
  let userPassword = registerForm.elements["userPassword"].value;

  let user = JSON.stringify({
    userName: userName,
    userEmail: userEmail,
    userPassword: userPassword,
  });
  let request = new XMLHttpRequest();
  request.open("POST", "/user", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function () {
    let receivedUser = JSON.parse(request.response);
    console.log(receivedUser.message);
  });
  request.send(user);
});

document.getElementById("authorization").addEventListener("click", function (e) {
  e.preventDefault();
  let authForm = document.forms["authForm"];
  let userEmail = authForm.elements["userEmail"].value;
  let userPassword = authForm.elements["userPassword"].value;
  let user = JSON.stringify({
    userEmail: userEmail,
    userPassword: userPassword,
  });
  let request = new XMLHttpRequest();
  request.open("POST", "/login", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function () {
    let response = JSON.parse(request.response);

    if (request.status === 200) {
      window.location.href = "https://yandex.ru/";
    } else {
      console.log(response.message);
    }
  });
  request.send(user);
});
