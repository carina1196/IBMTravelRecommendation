const submitBtn = document.getElementById("formSubmit");

function submit() {
  document.getElementById("nameInput").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";

  alert(
    "Thank you for contacting us. The form has beenm submitted successfully. We will get back to you as soon as possible."
  );
}

submitBtn.addEventListener("click", submit);
