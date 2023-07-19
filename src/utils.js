window.utils = {
  createButton: function createButton(textContent, id, listener) {
    const button = document.createElement("BUTTON");
    button.style.width = "100%";
    button.style.borderRadius = "30px";
    button.style.border = "none";
    button.style.height = "40px";
    button.style.marginBottom = "20px";
    button.id = id;
    button.textContent = textContent;
    button.addEventListener("click", listener);
    return button;
  }
};