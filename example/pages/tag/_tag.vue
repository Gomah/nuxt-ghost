<template>
  <section class="blog-tag section">
    <div class="container is-fluid">
      <div class="columns is-multiline">
        <div v-for="(post, index) in posts" :key="index" class="column is-4">
          <card
            :title="post.title"
            :link="post.slug"
            :image="post.feature_image"
            :excerpt="post.excerpt"
          />
        </div>
      </div>

      <b-pagination
        v-if="meta.pagination.total > perPage"
        :total="meta.pagination.total"
        :current.sync="currentPage"
        order="is-centered"
        :rounded="true"
        :per-page="perPage"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        @change="handlePagination"
      >
      </b-pagination>
    </div>
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import Card from '../../components/card.vue';

export default {
  components: {
    Card,
  },

  data() {
    return {
      tag: {},
      posts: [],
      meta: null,
      currentPage: 1,
      perPage: 3,
    };
  },

  async asyncData({ app, params }) {
    const page = params.page ? parseInt(params.page, 10) : 1;

    const [posts, tag] = await Promise.all([
      app.$ghost.posts.browse({
        limit: 3,
        page,
        filter: `tag: ${params.tag}`,
      }),
      app.$ghost.tags.read({ slug: params.tag }),
    ]);

    return {
      tag,
      currentPage: page,
      posts: posts || [],
      meta: posts.meta,
    };
  },

  methods: {
    handlePagination(value) {
      const path =
        value === 1
          ? `/tag/${this.$route.params.tag}`
          : `/tag/${this.$route.params.tag}/page/${value}`;
      this.$router.push(path);
    },
  },
};
</script>
