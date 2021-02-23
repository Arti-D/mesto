function buttonLoaderText(isLoading, button) {
    if (isLoading) {
      button.textContent = "Сохраняем...";
    } else {
      if (button.classList.value ==='popup__btn popup-sure__btn') {
        button.textContent = "Да";
      } else {
        button.textContent = "Сохранить";
      }
    }
  }
  
  export { buttonLoaderText }