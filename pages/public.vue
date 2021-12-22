<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="6" lg="4">This is a public page</v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  middleware: 'guest',
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
