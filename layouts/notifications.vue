<script lang="ts">
import { convertToObject } from 'typescript';
import {
  notificationsArray,
  NotificationsBack,
} from '~~/composables/Popup/notifications';
export default defineComponent({
  setup() {
    var dataNotification = {
      showNotification: false,
      color: '',
      titleText: '',
      contentText: '',
    };
    const show = (showparam) => {
      if (showparam == notificationsArray[0]) {
        dataNotification = {
          showNotification: false,
          color: '',
          titleText: '',
          contentText: '',
        };
      } else if (showparam == notificationsArray[1]) {
        dataNotification = {
          showNotification: true,
          color: 'green',
          titleText: 'Success',
          contentText: '',
        };
      } else if (showparam == notificationsArray[2]) {
        dataNotification = {
          showNotification: true,
          color: 'red',
          titleText: 'Failed',
          contentText: 'Invalid credentials!',
        };
      } else if (showparam == notificationsArray[3]) {
        dataNotification = {
          showNotification: true,
          color: 'red',
          titleText: 'Failed',
          contentText: 'Something went wrong!',
        };
      }
    };
    show(NotificationsBack.getNotification());
    return { dataNotification, show };
  },
});
</script>
<template>
  <div
    v-if="dataNotification.showNotification === true"
    :class="
      'fixed border-4 border-' + dataNotification.color + '-300 rounded-sm'
    "
  >
    <div :class="'px-4 py-2 bg-' + dataNotification.color + '-300'">
      <span class="text-sm font-bold text-white">{{
        dataNotification.titleText
      }}</span>
    </div>

    <div class="p-4">
      <span
        :class="'text-lg font-bold text-' + dataNotification.color + '-300'"
        >{{ dataNotification.contentText }}</span
      >
    </div>
  </div>
</template>
