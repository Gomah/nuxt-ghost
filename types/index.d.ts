import Vue from 'vue';
import './vuex';

interface GhostAPI {
  posts: any;
  authors: any;
  tags: any;
  pages: any;
  settings: any;
}

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
