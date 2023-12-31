//Время отправки показано позднее, так как исправляла ошибку в валидаторе, вы просили написать этот комментарий, чтоб не подумать, что задание просрочено
/*global $*/
let popupBg = document.querySelector(".popup__bg");
let popup = document.querySelector(".popup");
let openPopupButtons = document.querySelectorAll(".open-popup");
let closePopupButton = document.querySelector(".close-popup");

openPopupButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        popupBg.classList.add("active");
        popup.classList.add("active");
        window.history.pushState(null, null, "page1.html");
        window.history.forward();
    });
});

$(function(){
  $(".popup").submit(function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "https://formcarry.com/s/mCmKrYvKIw",
        data: new FormData(this),
        dataType: "json",
        processData: false,
        contentType: false,
        success: function(response){
          if(response.status == "success"){
              window.alert("Данные отправлены, спасибо!");
          }
          else if(response.code === 422){
            window.alert("Ошибка при отправке данных :с");
            $.each(response.errors, function(key) {
              $('[name="' + key + '"]').addClass('formcarry-field-error');
            });
          }
          else{
            window.alert("An error occured: " + response.message);
          }
        },
        error: function(jqXHR, textStatus){
          const errorObject = jqXHR.responseJSON;
          window.alert("Request failed,"+errorObject.title+":"+errorObject.message);
        },
        complete: function(){
          document.getElementById("myForm").reset();
        }
    });
  });
});

closePopupButton.addEventListener("click",() => {
    popupBg.classList.remove("active");
    popup.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if(e.target === popupBg) {
        popupBg.classList.remove("active");
        popup.classList.remove("active");
    }
});

document.querySelector(".popup").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = $("#name").val();
  const email = $("#email").val();
  const telephon = $("#telephon").val();
  const organization = $("#organization").val();
  const message = $("#message");
  localStorage.setItem("name", JSON.stringify(name));
  localStorage.setItem("email", JSON.stringify(email));
  localStorage.setItem("telephon", JSON.stringify(telephon));
  localStorage.setItem("organization", JSON.stringify(organization));
  localStorage.setItem("message", JSON.stringify(message));
  const savedName = JSON.parse(localStorage.getItem("name"));
  const savedEmail = JSON.parse(localStorage.getItem("email"));
  const savedTelephon = JSON.parse(localStorage.getItem("telephon"));
  const savedOrganization = JSON.parse(localStorage.getItem("organization"));
  const savedMessage = JSON.parse(localStorage.getItem("message"));
  window.console.log(savedName);
  window.console.log(savedEmail);
  window.console.log(savedTelephon);
  window.console.log(savedOrganization);
  window.console.log(savedMessage);
});

$(window).on("popstate",()=>{
  window.history.back();
});
$(window).on("popstate", function(){
  window.closePopup();
});
