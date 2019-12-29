<template>
  <div class="container">
    <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item has-text-weight-bold">
          Blog
        </nuxt-link>
      </div>

      <div class="navbar-menu">
        <slot name="navbar-start">
          <div class="navbar-start" />
        </slot>
        <slot name="navbar-end">
          <div class="navbar-end">
            <nuxt-link
              v-for="tag in tags"
              :key="tag.id"
              :to="{ path: `/tag/${tag.slug}` }"
              class="navbar-item"
            >
              {{ tag.name }}
            </nuxt-link>
          </div>
        </slot>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    tags() {
      return this.$store.state.tags;
    },
  },
};
</script>
