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

   const fields = [
      { element: name, errorId: "name-error", validationFn: validateName },
      { element: email, errorId: "email-error", validationFn: validateEmail },
      { element: phone, errorId: "phone-error", validationFn: validatePhone },
      { element: web, errorId: "web-error", validationFn: validateWeb },
      { element: country, errorId: "country-error", validationFn: validateCountry },
      { element: project, errorId: "project-error", validationFn: validateProject },
   ];

   fields.forEach((field) => {
      field.element.addEventListener("input", () => {
         field.validationFn(field.errorId, field.element, form);
      });
   });

   form.addEventListener("submit", (event) => {
      event.preventDefault();
      let validForm = true;

      fields.forEach((field) => {
         const isValid = field.validationFn(field.errorId, field.element, form);
         if (!isValid) validForm = false;
      });

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

function validateName(idName, element, form) {
   if (element.value.length <= 3) {
      showError(idName, element, "Invalid name");
      return false;
   } else {
      clearError(idName, element, form);
      return true;
   }
}

function validateEmail(idName, element, form) {
   const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   const isValidEmail = element.value.length !== 0 && emailRegExp.test(element.value);
   if (!isValidEmail) {
      showError(idName, element, "Invalid email");
      return false;
   } else {
      clearError(idName, element, form);
      return true;
   }
}

function validatePhone(idName, element, form) {
   if (element.value.length <= 6) {
      showError(idName, element, "Invalid phone number");
      return false;
   } else {
      clearError(idName, element, form);
      return true;
   }
}

function validateWeb(idName, element, form) {
   if (element.value.length <= 4) {
      showError(idName, element, "Invalid web");
      return false;
   } else {
      clearError(idName, element, form);
      return true;
   }
}

function validateCountry(idName, element, form) {
   if (element.value.length <= 1) {
      showError(idName, element, "Invalid country");
      return false;
   } else {
      clearError(idName, element, form);
      return true;
   }
}

function validateProject(idName, element, form) {
   if (element.value.length <= 4) {
      showError(idName, element, "Invalid project text");
      return false;
   } else {
      clearError(idName, element, form);
      return true;
   }
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
