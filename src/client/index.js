//import functions
import { handleClick, updateUI } from "./js/onClick";

//import styling
import "./styles/style.scss";

//event listener
document.getElementById("btn").addEventListener("click", handleClick);

//service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
 
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
 
        console.log('SW registered: ', registration);
 
      }).catch(registrationError => {
 
        console.log('SW registration failed: ', registrationError);
 
      });
 
    });
  }

//export functions
export { handleClick, updateUI }
