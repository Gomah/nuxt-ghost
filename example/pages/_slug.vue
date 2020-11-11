<template>
  <section class="section">
    <article class="post">
      <div class="container">
        <div class="columns is-multiline is-centered">
          <div class="column is-12">
            <h1 class="title has-text-centered is-1 is-spaced">
              {{ post.title }}
            </h1>
          </div>
          <div class="column is-6">
            <div class="post__content" v-html="post.html" />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';

export default {
  data() {
    return {
      post: {},
    };
  },

  async asyncData({ app, params }: Context) {
    const post = await app.$ghost.posts.read(
      {
        slug: params.slug,
      },
      { include: 'tags' }
    );

    return {
      post,
    };
  },
};
</script>
