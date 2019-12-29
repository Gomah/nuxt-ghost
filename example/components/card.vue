<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="image" :alt="title" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <nuxt-link :to="{ path: `/${link}` }" class="title is-4">
            {{ title }}
          </nuxt-link>
        </div>
      </div>

      <div class="content">
        {{ excerpt }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    excerpt: {
      type: String,
      default: '',
    },
  },
};
</script>
