const registrationForm = document.getElementById("registration-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const countrySelect = document.getElementById("country");
const userTableBody = document.querySelector("#user-table");

const registeredUsers = [];

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// Fetch countries from API and populate the dropdown

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Country API error:", error);
  });

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newUsername = usernameInput.value;
  const newEmail = emailInput.value;
  const newPassword = passwordInput.value;
  const confirmedPassword = confirmPasswordInput.value;
  const newCountry = countrySelect.value;
  const selectedGender = document.querySelector('input[name="gender"]:checked');

  // Check if passwords match
  if (newPassword !== confirmedPassword) {
    alert("Passwords do not match. Please enter them again.");
    passwordInput.value = "";
    confirmPasswordInput = "";
    return;
  }
  // Check if email is valid
  if (!emailPattern.test(newEmail)) {
    alert("Please enter a valid email address.");
    return;
  }
  // Check if username is valid
  if (!usernamePattern.test(newUsername)) {
    alert(
      "Username must be 3 to 20 characters and can only contain letters, numbers, and underscores."
    );
    return;
  }
  // Check if password is valid
  if (!passwordPattern.test(newPassword)) {
    alert(
      "Password must be 6 to 20 characters and include at least one uppercase letter, one lowercase letter, and one digit."
    );
    return;
  }
  // Check if username or email already exists
  const userExist = registeredUsers.some(
    (user) => user.username === newUsername || user.email === newEmail
  );

  if (userExist) {
    alert("Username or email already exists. Please choose a different one.");
    return;
  }

  // Add the new user to the registeredUsers array
  registeredUsers.push({
    username: newUsername,
    email: newEmail,
    gender: selectedGender ? selectedGender.value : "N/A",
    country: newCountry,
  });
  // Clear form inputs
  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  // Update user table
  updateUserTable();
});

function updateUserTable() {
  userTableBody.innerHTML = "";

  // Populate user table with registered users
  registeredUsers.forEach((user) => {
    const row = document.createElement("tr");
    const usernameCell = document.createElement("td");
    usernameCell.textContent = user.username;
    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    const countryCell = document.createElement("td");
    countryCell.textContent = user.country;

    row.appendChild(usernameCell);
    row.appendChild(emailCell);
    row.appendChild(countryCell);
    userTableBody.appendChild(row);
  });
}
