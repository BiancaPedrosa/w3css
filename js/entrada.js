document.addEventListener("DOMContentLoaded", function() {
   inicializa();
   carregaConvenios();
 });
 const cardContainer = document.getElementById('card-container');
 cardContainer.addEventListener('click', removeCard);

 function removeCard(event) {
  if (event.target.classList.contains('remove-button')) {
    const card = event.target.closest('.w3-quarter');
    card.remove();
  }
}
 
 function createCard(placa, modelo, entrada, saida, permanencia, valor, desconto) {
   const content = `
     <div class="w3-quarter w3-padding-16">
       <div class="w3-card-4">
         <header class="w3-container w3-light-grey">
           <h3>${placa} ${modelo}</h3>
         </header>
         <div class="w3-container">
           <p>${entrada}-${saida} = ${permanencia}h</p>
           <p>${valor} - ${desconto} = ${valor - desconto}</p>
         </div>
         <button class="w3-button w3-block w3-dark-grey remove-button">
           <i class="fa fa-trash"></i>
         </button>
       </div>
     </div>
   `;
 
   // Use the existing cardContainer reference
   const newCard = cardContainer.insertAdjacentHTML('beforeend', content);
   
   if (newCard) { // Optional check for successful creation
     newCard.querySelector('.remove-button').addEventListener('click', removeCard);
   }
 
   return newCard; // Return the created card element (optional)
 }
 
 // Register button click handler
 btRegistrar.addEventListener('click', function(event) {
   event.preventDefault();
 
   ///getting inputs
  const cards=document.getElementById("card-container");
  const entrada=document.getElementById("inputEntrada").value;
  const saida=document.getElementById("inputSaida").value;
  const placa = document.getElementById("placa").value;
  const modelo = document.getElementById("modelo").value;
  const desconto=document.getElementById("lojaSelect").value;
  const permanencia=calculaPermanencia(entrada, saida);
  const valor=calculaTotal(permanencia);

   const newCard = createCard(placa, modelo, entrada, saida, permanencia, valor, desconto);
   return newCard; // Return the created card element (optional)
});

//Admin altera valor da tarifa 
function atualizarTarifa(){
   let senha = prompt("Digite a senha do ADMIN");
  
   if (senha=="123"){
      let novaTarifa = prompt("Digite a nova Tarifa");
      document.getElementById("tarifa").value=novaTarifa;
      alert("vc atualizou a tarifa...");
   }
   else alert("sua senha está incorreta, tente outra vez");
}
//preenche valores iniciais dos campos
function inicializa(){
  const now = moment();
   document.getElementById("datatual").value=now.format('yyyy-MM-DD');
   document.getElementById("tarifa").value=10;
   document.getElementById("inputEntrada").value="08:00";
   document.getElementById("inputSaida").value="09:00";
}
//Calcula tempo de permanência no estacionamento
function calculaPermanencia(startTime, endTime) {
  startTime=moment(startTime, "h:mm");
  endTime = moment(endTime, "h:mm");
  const duration = moment.duration(endTime.diff(startTime));
  //concede 10 min de tolerânica
  return (duration.minutes()<=10?duration.hours():duration.hours()+1);
}
//Calcula valor a pagar 
function calculaTotal(tempo){
  tempo = parseInt(tempo);
  const tarifa=document.getElementById("tarifa").value;
  let adicional = 0.00;
  if (tempo>1){
      adicional = (tempo-1) *(tarifa/2);
  }
  return parseInt(tarifa)+adicional;
}
 // Função para buscar o arquivo JSON e popular o combobox
 function carregaConvenios() {
   fetch('./data/lojas.json')
   .then(response => response.json())
   .then(data => {
     const select = document.getElementById('lojaSelect');
 
     data.forEach(loja => {
       const option = document.createElement('option');
       option.value = loja.desconto;
       option.textContent = loja.nomeLoja;
       select.appendChild(option);
     });
   })
   .catch(error => {
     console.error('Erro ao carregar o JSON:', error);
   });
 }