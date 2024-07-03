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

const availableTimes = ref<string[]>([]);

const selectedAppointment = ref<Appointment | null>(null);
const selectedTime = ref<string | null>(null);
const currentStep = ref(1);
const date = ref();
const strippedDate = ref<string>('');

// Form Properties
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phoneNumber = ref('');
const zipCode = ref('');
const apartmentNumber = ref('');
const street = ref('');
const comment = ref('');

onBeforeMount(() => {
  // Set the actual date to now.
  date.value = new Date();
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

const fetchAvailableTimes = () => {
  if (!strippedDate.value) {
    return;
  }

  // Simulate fetching available times from an API
  switch (strippedDate.value) {
    case '2024-05-20':
      availableTimes.value = [
          "08:00", "08:15", "08:30", "08:45",
      ]
      break;
    case '2024-05-21':
      availableTimes.value = [
          "09:00", "09:15", "09:30", "09:45",
      ]
      break;
  }

}

const handleDate = (value: Date) => {
  date.value = value;
  strippedDate.value = date.value.toISOString().split('T')[0];
  fetchAvailableTimes();
}

const handleSelectedTime = (time: string) => {
  selectedTime.value = time;
};

const processForm = () => {
  // Process the form data
  console.log({
    selectedAppointment: selectedAppointment?.value?.name,
    date: strippedDate.value,
    time: selectedTime.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    zipCode: zipCode.value,
    apartmentNumber: apartmentNumber.value,
    street: street.value,
    comment: comment.value,
  });
}

</script>

<template>
  <div class="bg-blue-50 absolute right-0 top-1 w-1/4 flex justify-center h-screen">
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
        <TimePicker :available-times="Object.values(availableTimes)" @selectTime="handleSelectedTime"/>
      </ul>

      <button @click="previousStep" class="bg-blue-500 text-white p-2 rounded-md">Previous</button>
      <button @click="nextStep" class="bg-blue-500 text-white p-2 rounded-md">Next</button>
    </div>
    <div class="flex flex-col" v-else-if="currentStep === 3">
      <div class="header">
        <h2 class="font-semibold text-lg">Reservering op: <br>
          <span class="font-semibold text-blue-600">{{ strippedDate }}</span> om <span class="font-semibold text-blue-600">{{ selectedTime }} uur.</span>
        </h2>
      </div>

      <div class="flex flex-col">
        <div class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg">
          {{ selectedAppointment?.name }}
        </div>

        <div>
          <h2 class="font-semibold">Je gegevens</h2>
          <div class="flex space-x-3">
            <div>
              <label for="firstName">Voornaam</label>
              <input
                  v-model="firstName"
                  class='block rounded-full' type="text" id="firstName" />
            </div>
            <div>
              <label for="lastName">Achternaam</label>
              <input
                  v-model="lastName"
                  class='block rounded-full' type="text" id="lastName" />
            </div>
          </div>
        </div>

        <div>
          <div class="flex space-x-3">
            <div>
              <label for="email">E-mail</label>
              <input
                  v-model="email"
                  class='block rounded-full' type="text" id="email" />
            </div>

            <div>
              <label for="phoneNumber">Telefoonnummer</label>
              <input
                  v-model="phoneNumber"
                  class='block rounded-full' type="text" id="phoneNumber" />
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-semibold">Adres</h2>
          <div class="flex space-x-3">
            <div>
              <label for="zipCode">Postcode</label>
              <input
                  v-model="zipCode"
                  class='block rounded-full' type="text" id="zipCode" />
            </div>
            <div>
              <label for="apartmentNumber">Huisnummer en toevoeging</label>
              <input
                  v-model="apartmentNumber"
                  class='block rounded-full' type="text" id="apartmentNumber" />
            </div>
          </div>

          <div>
            <label for="street">Adres</label>
            <input
                v-model="street"
                class='block rounded-full w-full' type="text" id="street" />
          </div>
        </div>

        <div>
          <h2 class="font-semibold">Extra informatie</h2>
          <div class="flex">
            <div class="w-full">
              <label for="comment">Bericht</label>
              <textarea
                  v-model="comment"
                  class='block rounded-lg w-full h-20' type="text" id="comment"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="flex">
        <button @click="previousStep" class="bg-blue-500 text-white p-2 rounded-md">Previous</button>
        <button v-show="currentStep !== 3" @click="nextStep" class="bg-blue-500 text-white p-2 rounded-md">Next</button>
        <button v-show="currentStep === 3" @click="processForm" class="bg-blue-500 text-white p-2 rounded-md">Ga naar betalen</button>

      </div>
    </div>
  </div>
</template>

<style scoped>
.selected {
  background-color: #9b1717; /* Change this to your preferred color */
}
</style>
