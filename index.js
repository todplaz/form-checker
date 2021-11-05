const inputs = document.querySelectorAll("input[type='text'], input[type='password']");

let pseudo, email, password, confirmPass;
const progressBar = document.getElementById("progress-bar");
const form = document.querySelector("form");

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  }
  else{
    container.classList.remove("error");
    span.textContent = message;
  }
};

const pseudoChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("pseudo", "Votre pseudo doit contenir au minimum 3 caractères et au maximum 20 caractères");
    pseudo = null;
  }
  else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay("pseudo", "Votre pseudo ne doit pas contenir de caractères spéciaux");
    pseudo = null;
  }
  else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

// const pseudoChecker = (value) => {
//   const pseudoContainer = document.querySelector(".pseudo-container");
//   const errorDisplay = document.querySelector(".pseudo-container > span");
  
//   if (value.length > 0 && (value.length < 3 || value.length > 20)) {
//     pseudoContainer.classList.add("error");
//     errorDisplay.textContent = "Votre pseudo doit contenir au minimum 3 caractères et au maximum 20 caractères";
//   }
//   else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
//     pseudoContainer.classList.add("error");
//     errorDisplay.textContent = "Votre pseudo ne doit pas contenir de caractères spéciaux";
//   }
//   else{
//     pseudoContainer.classList.remove("error");
//     errorDisplay.textContent = "";
//   }
// };
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Votre mail n'est pas valide");
    email = null;
  }
  else{
    errorDisplay("email", "", true);
    email = value;
  }
};


const passwordChecker = (value) => {
  progressBar.classList = "";

  if (!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)){
    errorDisplay("password", "Veuillez rentrer au minimum 8 caractères, une majuscule, un chiffre et un caractère spécial");
    progressBar.classList.add("progressRed");
    password = null;
  }
  else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay('password', "", true);
    password = value;
  }
  else {
    progressBar.classList.add("progressGreen");
    errorDisplay('password', "", true);
    password = value;
  }
  if (confirmPass) confirmChecker(confirmPass);
};


const confirmChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirm", "Les mots de passe ne correspondent pas");
    confirmPass = false;
  }
  else{
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};


inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch(e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});


form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudo && email && password && confirmPass) {
    const data = {
      pseudo: pseudo,
      email: email,
      password: password,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";
    
    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Bravo !!! inscription validée");
  }
  else {
    alert("Veuillez remplir correctement les champs");
  }
})
