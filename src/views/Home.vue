<template>
  <div class="home">
    <banner-base></banner-base>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import BannerBase from '@/components/Banner/base'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    BannerBase
  },
  created () {
    this.getTopics()
  },
  methods: {
    ...mapActions([
      'getTopics',
    ])
  },
  computed: {
    ...mapGetters([
      'topicsData'
    ])
  }
}
</script>
