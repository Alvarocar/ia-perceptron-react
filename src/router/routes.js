import Perceptron4 from "../pages/Perceptron4";
import Perceptron from "../Perceptron";

export const routes = [
  {
    index: true,
    path: "/2-inputs",
    component: Perceptron,
  },
  {
    path: "/",
    component: Perceptron,
  },
  {
    path: '/4-inputs',
    component: Perceptron4,
  }
]