import Vue from 'vue';

export const state = () => ({
  tags: [],
});

export const mutations = {
  SET_TAGS(state, tags) {
    Vue.set(state, 'tags', tags);
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    const tags = await this.$ghost.tags.browse({ order: 'slug ASC', include: 'count.posts' });
    commit('SET_TAGS', tags);
  },
};
