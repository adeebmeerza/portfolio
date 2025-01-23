const form = document.getElementById('form');
const result = document.getElementById('result');

window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    nav.classList.toggle('shrink-nav', window.scrollY > 50)
})

const barsIcon = document.getElementsByClassName('fa-bars');
const xmark = document.getElementsByClassName('fa-xmark');

function toggleMenu() {
    document.querySelector('.menu-button').classList.toggle('active');
    document.querySelector('ul').classList.toggle('active');
    const navClasses = document.querySelector('nav').classList;
    if (!navClasses.contains('shrink-nav'))
        navClasses.toggle('shrink-nav')
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."
  
      fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: json
          })
          .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                  result.innerHTML = "Form submitted successfully";
              } else {
                  console.log(response);
                  result.innerHTML = json.message;
              }
          })
          .catch(error => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
          })
          .then(function() {
              form.reset();
              setTimeout(() => {
                  result.style.display = "none";
              }, 3000);
          });
});