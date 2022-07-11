var dfltBox = document.getElementById("useDfltOption");
var defaultOptionsContainer = document.getElementById("defaultOptions");
var xkcdBox = document.getElementById("useXKCDOption");
var xkcdOptionsContainer = document.getElementById("xkcdOptions");


export function checkDFLTbox() {
    if (dfltBox.checked) {
      defaultOptionsContainer.style.display = "block";
      xkcdOptionsContainer.style.display = "none";
      xkcdBox.checked = false;
    }
    if (dfltBox.checked == false) {
      defaultOptionsContainer.style.display = "none";
    }
  }
  
export function checkXKCDbox() {
    if (xkcdBox.checked) {
      xkcdOptionsContainer.style.display = "block";
      defaultOptionsContainer.style.display = "none";
      dfltBox.checked = false;
    }
    if (xkcdBox.checked == false) {
      xkcdOptionsContainer.style.display = "none";
    }
  }