import { GhostAPI } from '@tryghost/content-api';

declare module 'vuex/types/index' {
  interface Store<S> {
    $ghost: GhostAPI;
  }
}
