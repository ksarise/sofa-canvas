import AppController from "./controllers/AppController.js";

document.addEventListener("DOMContentLoaded", () => {
  const CANVAS = document.getElementById("sofa-canvas");
  const START_BUTTON = document.getElementById("btn-start");
  const APP_CONTROLLER = new AppController(CANVAS);
  START_BUTTON.addEventListener("click", () => {
    console.log("start drawing");
    APP_CONTROLLER.startDrawing();
  });
});
