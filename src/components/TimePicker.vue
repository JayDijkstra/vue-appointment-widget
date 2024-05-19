<script lang="ts">

import {defineComponent, ref, onMounted, PropType} from 'vue';

export default defineComponent({
  props: {
    availableTimes: {
      type: Array as PropType<string[]>,
      required: true,
    }
  },
  setup(props, {emit}) {
    const times = ref<string[]>([]);
    const selectedTime = ref<string | null>(null);

    const generateTimes = () => {
      const startHour = 8;
      const endHour = 16;
      const intervals = ['00', '15', '30', '45'];
      for (let i = startHour; i <= endHour; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        intervals.forEach(interval => {
          times.value.push(`${hour}:${interval}`);
        });
      }
    };

    const selectTime = (time: string) => {
      selectedTime.value = time;
      // Emit an event to the parent component
      emit('selectTime', time);
    };

    onMounted(generateTimes);

    return {
      times,
      selectedTime,
      selectTime,
    };
  },
});
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="grid grid-cols-4 gap-2">
      <div v-for="time in times" :key="time" class="p-2 border rounded cursor-pointer hover:bg-blue-500 hover:text-white"
           @click="() => selectTime(time)"
           :class="[
               { 'bg-blue-500 text-white': selectedTime === time },
           ]"
           v-show="availableTimes.includes(time)"
      >
        {{ time }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>