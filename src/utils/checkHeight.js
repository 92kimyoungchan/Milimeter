export function resposiveHeight() {
  const systemHeight = window.innerHeight;
  const documentHeight = document.querySelector(".app-wrap").clientHeight;
  console.log("js의 systemHeight", systemHeight);
  console.log("js의 documentHeight", documentHeight);
  if (documentHeight >= systemHeight) {
    return true;
  } else {
    return false;
  }
}