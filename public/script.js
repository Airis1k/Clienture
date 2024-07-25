function main() {
   addDateInHTML();
   validateForm();
}

function addDateInHTML() {
   var now = new Date();
   var datetime = now.getFullYear();

   document.getElementById(
      "datetime"
   ).innerHTML = `Copyright &copy; ${datetime}. All rights reserved.`;
}

function validateForm() {
   const form = document.querySelector("form");
   const name = document.getElementById("name");
   const email = document.getElementById("email");
   const phone = document.getElementById("phone");
   const web = document.getElementById("web");
   const country = document.getElementById("country");
   const project = document.getElementById("project");

   const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

   form.addEventListener("submit", (event) => {
      event.preventDefault();
      let validForm = true;

      const nameError = "name-error";
      if (name.value.length === 0) {
         showError(nameError, name, "Invalid name");
         validForm = false;
      } else {
         clearError(nameError, name, form);
      }

      const emailError = "email-error";
      const isValidEmail =
         email.value.length !== 0 && emailRegExp.test(email.value);
      if (!isValidEmail) {
         showError(emailError, email, "Invalid email");
         validForm = false;
      } else {
         clearError(emailError, email, form);
      }

      const phoneError = "phone-error";
      if (phone.value.length === 0) {
         showError(phoneError, phone, "Invalid phone number");
         validForm = false;
      } else {
         clearError(phoneError, phone, form);
      }

      const webError = "web-error";
      if (web.value.length === 0) {
         showError(webError, web, "Invalid web");
         validForm = false;
      } else {
         clearError(webError, web, form);
      }

      const countryError = "country-error";
      if (country.value.length === 0) {
         showError(countryError, country, "Invalid country");
         validForm = false;
      } else {
         clearError(countryError, country, form);
      }

      const projectError = "project-error";
      if (project.value.length === 0) {
         showError(projectError, project, "Invalid project text");
         validForm = false;
      } else {
         clearError(projectError, project, form);
      }

      if (validForm) {
         sendData({
            name: name.value,
            email: email.value,
            phone: phone.value,
            web: web.value,
            country: country.value,
            project: project.value,
         });
         form.reset();
      }
   });
}

function showError(idName, element, text) {
   if (!document.getElementById(idName)) {
      const error = document.createElement("p");
      error.id = idName;
      error.textContent = text;
      element.after(error);
   }
   element.style.border = "2px solid #ff0000";
}

function clearError(idName, element, form) {
   element.style.border = "none";
   const errorElement = document.getElementById(idName);
   if (errorElement) {
      form.removeChild(errorElement);
   }
}

async function sendData(formData) {
   try {
      const response = await fetch("/", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
      });

      const message = await response.json();
      displayFormSubmitMessage(message.message);
   } catch (error) {
      console.error("Error sending data:", error);
   }
}

function displayFormSubmitMessage(message) {
   if (!document.getElementById("form-submit-error")) {
      const error = document.createElement("p");
      error.id = "form-submit-error";
      error.textContent = message;
      const form = document.querySelector("form");
      form.append(error);

      setTimeout(() => {
         error.remove();
      }, 5000);
   }
}

main();
