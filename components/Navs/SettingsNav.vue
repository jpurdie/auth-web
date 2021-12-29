<template>
  <v-navigation-drawer permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Settings </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  middleware: 'authz',
  data() {
    return {
      items: [
        {
          title: 'My Info',
          icon: 'mdi-account',
          link: '/settings/myinformation',
        },
        {
          title: 'Security',
          icon: 'mdi-account-key',
          link: '/settings/security',
        },
        { title: 'Email', icon: 'mdi-email', link: '/settings/email' },

        { title: 'About', icon: 'mdi-help-box', link: '/settings/about' },
      ],
    }
  },

  methods: {},
}
</script>
