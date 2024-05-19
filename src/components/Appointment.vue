<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {onBeforeMount, ref} from "vue";
import TimePicker from "./TimePicker.vue";

interface Appointment {
  uuid: string;
  name: string;
  description: string;
  imageUrl: string;
  duration: number;
  price: number;
}

const appointments : Appointment[] = [
  {
    uuid: '1',
    name: 'Oogkeuring',
    description: 'Een oogkeuring is een onderzoek waarbij de ogen worden getest op sterkte en gezondheid. Dit gebeurt door middel van verschillende testen.',
    imageUrl: 'https://via.placeholder.com/150',
    duration: 30,
    price: 50,
  },
  {
    uuid: '2',
    name: 'Contactlens controle',
    description: 'Tijdens een contactlenscontrole wordt gekeken of de contactlenzen nog goed zitten en of de sterkte nog klopt. Ook wordt de gezondheid van de ogen gecontroleerd.',
    imageUrl: 'https://via.placeholder.com/150',
    duration: 15,
    price: 25,
  },
  {
    uuid: '3',
    name: 'Rijbewijskeuring',
    description: 'Een rijbewijskeuring is een medische keuring die nodig is om een rijbewijs te kunnen aanvragen of verlengen. Tijdens de keuring wordt gekeken of je lichamelijk en geestelijk in staat bent om een voertuig te besturen.',
    imageUrl: 'https://via.placeholder.com/150',
    duration: 15,
    price: 25,
  }
];

const availableTimes = ref<{ [date: string]: string[] }>({});

const selectedAppointment = ref<Appointment | null>(null);
const selectedTime = ref<string | null>(null);
const currentStep = ref(1);
const date = ref();

const strippedDate = ref<string>('');

onBeforeMount(() => {
  // Set the actual date to now.
  date.value = new Date();

  availableTimes.value = {
    '2024-05-20': ['09:00', '09:30', '10:00'],
    '2024-05-21': ['12:00', '12:30', '16:30'],
    '2024-05-22': ['15:00', '15:30', '16:00'],
  }
});

const nextStep = () => {
  currentStep.value += 1;
}

const previousStep = () => {
  currentStep.value -= 1;
}

const selectAppointment = (appointment: Appointment) => {
  selectedAppointment.value = appointment;
};

const selectTime = (time: string) => {
  selectedTime.value = time;
}

const handleDate = (value: Date) => {
  date.value = value;
  strippedDate.value = date.value.toISOString().split('T')[0];

  console.log(strippedDate.value);
}

</script>

<template>
  <div class="bg-blue-50 absolute right-0 top-1 w-1/4 flex justify-center">
    <div v-if="currentStep === 1">
      <ul class="space-y-2 p-4">
        <li v-for="appointment in appointments"
            :key="appointment.uuid"
            @click="selectAppointment(appointment)"
            :class="{ selected: selectedAppointment?.uuid === appointment.uuid }"
            class="bg-white rounded-md p-4 flex flex-col"
        >
          <h2 class="font-semibold text-lg">{{ appointment.name }}- {{ appointment.duration }} minutes</h2>
          <img :src="appointment.imageUrl" alt="appointment.name" />
          <p>{{ appointment.description }}</p>
          <p>{{ appointment.price }}</p>
        </li>
      </ul>
      <button @click="nextStep" class="bg-blue-500 text-white p-2 rounded-md">Next</button>
    </div>
    <div v-else-if="currentStep === 2">
      <h2 class="font-semibold text-lg">{{ selectedAppointment?.name }}</h2>
      <VueDatePicker
          locale="nl"
          inline
          auto-apply
          :hide-navigation="['time']"
          :week-numbers="{ type: 'iso' }"
          v-model="date"
          @update:model-value="handleDate"
          ref="datepicker"
      ></VueDatePicker>

      <!-- show "Er zijn geen tijden beschikbaar" when there are no available times -->
      <ul class="space-y-2 p-4">
        <TimePicker :available-times="Object.values(availableTimes)" />
      </ul>

      <button @click="previousStep" class="bg-blue-500 text-white p-2 rounded-md">Previous</button>
      <button @click="nextStep" class="bg-blue-500 text-white p-2 rounded-md">Next</button>
    </div>
    <div v-else-if="currentStep === 3">
      <h2 class="font-semibold text-lg">Confirmation</h2>
      <p>Appointment: {{ selectedAppointment?.name }}</p>
      <p>Time: {{ strippedDate }} - {{ selectedTime }}</p>
      <button @click="previousStep" class="bg-blue-500 text-white p-2 rounded-md">Previous</button>
      <button @click="nextStep" class="bg-blue-500 text-white p-2 rounded-md">Next</button>
    </div>
  </div>
</template>

<style scoped>
.selected {
  background-color: #9b1717; /* Change this to your preferred color */
}
</style>
