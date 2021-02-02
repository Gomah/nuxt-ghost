---
title: Setup
description: 'Easy Ghost content API integration with Nuxt.js'
position: 2
category: 'Guide'
---

Check the [Nuxt.js documentation](https://nuxtjs.org/api/configuration-modules#the-modules-property) for more information about installing and using modules in Nuxt.js.

## Setup

Add `nuxt-ghost` as a dependency to your project:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add nuxt-ghost
```

  </code-block>
  <code-block label="NPM">

```bash
npm install nuxt-ghost
```

  </code-block>
</code-group>

## nuxt.config.js

```ts
module.exports = {
  modules: ['nuxt-ghost'],

  ghost: {
    /**
     * Your Ghost url
     */
    url: 'https://demo.ghost.io/ghost',

    /**
     * Your content api key
     */
    key: '22444f78447824223cefc48062',

    /**
     * Version
     * default: v3
     */
    version: 'v3',
  },
};
```

## TypeScript

`nuxt-ghost` offers type definitions. Just add an entry in `tsconfig.json`.

<code-group>
  <code-block label="Nuxt 2.9+" active>

```json{}[tsconfig.json]
{
  "compilerOptions": {
    "types": ["@nuxt/types", "nuxt-ghost"]
  }
}
```

  </code-block>
  <code-block label="Nuxt < 2.9">

```json{}[tsconfig.json]
{
  "compilerOptions": {
    "types": ["@nuxt/vue-app", "nuxt-ghost"]
  }
}
```

  </code-block>

</code-group>
