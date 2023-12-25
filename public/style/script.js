
            function disableCustom() {
              document.getElementById("programming").disabled = true;
              document.getElementById("misc").disabled = true;
              document.getElementById("dark").disabled = true;
              document.getElementById("pun").disabled = true;
              document.getElementById("spooky").disabled = true;
              document.getElementById("christmas").disabled = true;
          }

            function enable_text() {
              document.getElementById("programming").disabled = false;
              document.getElementById("misc").disabled = false;
              document.getElementById("dark").disabled = false;
              document.getElementById("pun").disabled = false;
              document.getElementById("spooky").disabled = false;
              document.getElementById("christmas").disabled = false;
            }
            function submitForm() {
              const chooseValue = document.querySelector('input[name="choose"]:checked').value;
              const formData = new FormData(document.getElementById('yourFormId'));
              console.log('chooseValue:', chooseValue);
              console.log('customCategories:', formData.getAll('customCategories[]'));
              fetch('/submit', {
                method: 'POST',
                body: formData
              })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error(error));
            }
          