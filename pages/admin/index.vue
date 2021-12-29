<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="12" lg="12">Admin</v-col>
    </v-row>
    <v-row align="center" justify="center"> </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'dashboard',

  data() {
    return {
      error: {
        code: '',
        descr: '',
      },
    }
  },
  async mounted() {},
  methods: {},
}
</script>
