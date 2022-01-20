<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2">
        <NavsSettingsNav />
      </v-col>
      <v-col cols="12" md="6">
        <FormsMyInfo />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  layout: 'settings',
  data() {
    return {
      alerts: [],
      user: {
        displayName: '',
      },
    }
  },
  mounted() {},
  methods: {
    async fetchme() {},
    async resetFormErrors() {},
    async onSubmit() {},
  },
}
</script>
