import { GhostAPI } from '@tryghost/content-api';
import Vue from 'vue';
import './vuex';

declare module '@nuxt/vue-app' {
  interface Context {
    $ghost: GhostAPI;
  }

  interface NuxtAppOptions {
    $ghost: GhostAPI;
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $ghost: GhostAPI;
  }

  interface NuxtAppOptions {
    $ghost: GhostAPI;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $ghost: GhostAPI;
  }
}

declare module 'vuex' {
  interface Store<S> {
    $ghost: GhostAPI;
  }
}
