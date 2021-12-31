<script>
export default defineComponent({
  setup() {
    return {
      myHistory: [
        {
          input_content: 'https://media.springernature.com/full/springer-cms/rest/v1/img/18893370/v1/height/320',
          input_type: 'input_type',
          config_precision: '100',
          post_config_commands: 'post_config_commands',
          post_config_points: 'post_config_points',
          pre_config_commands: 'pre_config_commands',
          pre_config_points: 'pre_config_points',
          date: "03-08-2021"
        },
        {
          input_content: '',
          input_type: 'input_type4',
          config_precision: '1023',
          post_config_commands: 'post_config_commands2',
          post_config_points: 'post_config_points2',
          pre_config_commands: 'pre_config_commands2',
          pre_config_points: 'pre_config_points2',
          date: "10-09-2021"
        },
        {
          input_content: 'https://media.cntraveller.com/photos/611bf0b8f6bd8f17556db5e4/1:1/w_2000,h_2000,c_limit/gettyimages-1146431497.jpg',
          input_type: 'input_type2',
          config_precision: '1324',
          post_config_commands: 'post_config_commands2',
          post_config_points: 'post_config_points2',
          pre_config_commands: 'pre_config_commands2',
          pre_config_points: 'pre_config_points2',
          date: "03-10-2021"
        },
        {
          input_content: 'https://media.cntraveller.com/photos/611bf0b8f6bd8f17556db5e4/1:1/w_2000,h_2000,c_limit/gettyimages-1146431497.jpg',
          input_type: 'input_type3',
          config_precision: '1012',
          post_config_commands: 'post_config_commands2',
          post_config_points: 'post_config_points2',
          pre_config_commands: 'pre_config_commands2',
          pre_config_points: 'pre_config_points2',
          date: "10-09-2021"
        }
     ]
    }
  }   
})
</script>

<template>
  <ul>
    <li v-for="item in myHistory" v-bind:key="item.date" class="bg-white-700 text-white transform translate-y-1">
      <div class="bg-gray-700 text-white transform translate-y-1 px-3 py-2" style="border: 4px solid white;">
        <p>Date: {{ item.date }}</p>
        <p>Input type: {{ item.input_type }}</p>
        <p>Config precision: {{ item.config_precision }}</p>
        <p>Post config commands: {{ item.post_config_commands }}</p>
        <p>Post config points: {{ item.post_config_points }}</p>
        <p>Pre config commands: {{ item.pre_config_commands }}</p>
        <p>Pre config commands: {{ item.pre_config_points }}</p> 
        <p>Preview image</p>
        <img v-bind:src="item.input_content" alt="picture text" height="300" width="300" />
        <PrimaryButton
        class="mt-1"
        :isTiny="false"
        >
          Use this entry
        </PrimaryButton>
      </div>
    </li>
  </ul>
</template>