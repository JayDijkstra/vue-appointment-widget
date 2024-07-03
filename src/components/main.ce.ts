import { defineCustomElement } from "vue";
import Appointment from "./Appointment.vue";

const AppointmentElement = defineCustomElement(Appointment);

customElements.define('appointment-widget', AppointmentElement);
