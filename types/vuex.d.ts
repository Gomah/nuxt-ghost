import { GhostAPI } from '.';

declare module 'vuex/types/index' {
  interface Store<S> {
    $ghost: GhostAPI;
  }
}
