let slideActual = 0;
const totalSlides = 4; 

export function actualizarSlider() {
  const sld = document.getElementById('sld');
  sld.style.transform = `translateX(-${slideActual * 80}vw)`;
    actualizarEstilos();
}

export function siguiente() {
  if (slideActual < totalSlides - 1) {
    slideActual++;
    actualizarSlider();
  }
}

export function anterior() {
  if (slideActual > 0) {
    slideActual--;
    actualizarSlider();
  }
}




export function actualizarEstilos() {
  const body = document.body;

  
  body.classList.remove('modo-op1', 'modo-op2', 'modo-op3', 'modo-op4');

 
  body.classList.add(`modo-op${slideActual + 1}`);
}
