import './style.css'
import { urlApiChat, getOptions} from './api';


const chatgptContainer = document.querySelector('.chatgpt-container');
const textQuestion = document.querySelector('textarea')
  textQuestion.className = 'text-question';
const buttonGenerator =  document.querySelector('button')
buttonGenerator.className = 'button-generator'
  buttonGenerator.disabled = true; //disable property: active by default
  

//*BOOTSTRAP'S ICONS CREATION
const createIconContainer = (textResponse) => {
  const iconsContainer = document.createElement('div');
  iconsContainer.className = 'icons-container';

  const icon = document.createElement('i');
    icon.className = "bi bi-terminal i-clear";
  const iconPlus = document.createElement('i');
    iconPlus.className = "bi bi-terminal-plus i-add";
  const iconDash = document.createElement('i');
    iconDash.className = "bi bi-terminal-dash i-delete";

  iconsContainer.appendChild(icon);
  iconsContainer.appendChild(iconPlus);
  iconsContainer.appendChild(iconDash);

  //BOOTSTRAP'S ICONS EVENTS
  icon.addEventListener('click', () => {
    textQuestion.value = '';
    textResponse.value = '';
    buttonGenerator.disabled = true;
  });
  iconPlus.addEventListener('click', () => {
    createResponseElement();
  });
  iconDash.addEventListener('click', () => {
    let lengthResponseContainer = document.querySelectorAll(".response-container").length;
    if(lengthResponseContainer > 1) {
      textResponse.parentElement.remove(); //accesing textarea parent deletes the focusing box
    }
  });

  return iconsContainer; //returs whole container
};


//*RESPONSE ELEMENT CREATION
const createResponseElement = () => {
  const responseContainer = document.createElement('div');
    responseContainer.className = 'response-container';

  chatgptContainer.appendChild(responseContainer);

  const textResponse = document.createElement('textarea'); //response text
    textResponse.className = 'text-response';
    textResponse.setAttribute('placeholder','Response');
    textResponse.setAttribute('rows', 5);

  responseContainer.appendChild(textResponse);

  //BOOTSTRAP'S ICONS EXECUTION
  responseContainer.appendChild(createIconContainer(textResponse)); //exec. function creating icons container and functionalities
};
createResponseElement();


//*BUTTON ACTIVE EVENT
textQuestion.addEventListener('input', () => {
  (textQuestion.value === "" || textQuestion.value.trim().length === 0)
    ? (buttonGenerator.disabled = true)
    : (buttonGenerator.disabled = false);
});

//*API PROMPT DATA EVENT (BUTTON)
buttonGenerator.addEventListener('click', async() => {
  const response = await fetch(urlApiChat, getOptions(textQuestion.value));
  const data = await response.json();
  const dataResult = data.choices[0].message.content;
    console.log(dataResult);
    
  const responseContainerAll = document.querySelectorAll('.response-container textarea');
  const responseContainerAllToArray = [...responseContainerAll]; //le convierto en array el nodeList que recupero antes porque find lee arrays
  const responseContainerFindEmpty = responseContainerAllToArray.find((textarea) => {
    return textarea.value === ""
  });

  if (responseContainerFindEmpty === undefined){
    alert("ALL CONTAINERS ARE BUSY")
  }else{
    //responseContainerFindEmpty.value = dataResult; //*without animation typing effect
    let letters = 0  
    const typing = setInterval(() => {
      responseContainerFindEmpty.value += dataResult[letters];
      letters++;
      if (letters >= dataResult.length) {clearInterval(typing)}
    }, 33); //* with animation typing effect
  }
});








