const registrationForm = document.getElementById("registration-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const countrySelect = document.getElementById("country");
const userTableBody = document.querySelector("#user-table tbody");

const registeredUsers = [];

// Fetch countries from API and populate the dropdown

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(country => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Country API error:", error);
  });

 