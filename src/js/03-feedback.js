import throttle from 'lodash.throttle';
 

const formRef = document.querySelector('.feedback-form');
const stateForm = 'feedback-form-state';
const feedbackData = {};


// Refs
fillOutFeedback();
formRef.addEventListener('input', throttle(onTextInput, 500));
formRef.addEventListener('submit', onFeedbackSubmit);




function onTextInput(evt) {
  feedbackData[evt.target.name] = evt.target.value;
  onSave(stateForm, feedbackData);
};
  
function onFeedbackSubmit(evt) {
    evt.preventDefault();
    
  if (feedbackData.email && feedbackData.message) {
    console.log(feedbackData);
    evt.target.reset();
      Object.keys(feedbackData)
          .forEach(key => delete feedbackData[key]);
      
    localStorage.removeItem(stateForm);

    return;
  }

  console.error('Validate: all fields must be filled!');
};

function fillOutFeedback() {
  const feedbackLocalstorage = onLoad(stateForm);

  if (feedbackLocalstorage) {
    if (feedbackLocalstorage.email) {
      formRef.email.value = feedbackData[formRef.email.name] =
        feedbackLocalstorage.email;
    }

    if (feedbackLocalstorage.message) {
      formRef.message.value = feedbackData[formRef.message.name] =
        feedbackLocalstorage.message;
    }
  }
};

function onSave  (key, value) {
    try {
        const storageStatus = JSON.stringify(value);
        localStorage.setItem(key, storageStatus);      
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

function onLoad (key) {
  try {
    const storageStatus  = localStorage.getItem(key);
      return storageStatus === null
          ? undefined 
          : JSON.parse(storageStatus);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};



 