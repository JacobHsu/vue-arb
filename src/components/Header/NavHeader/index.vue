<template>
  <nav>
    <div class="container">
      <div class="navbar-brand d-flex align-items-center">
         logo
      </div>
      <div>
        <navs :list="mainMenu" type="mainMenu"></navs>
      </div>
    </div>
  </nav>
</template>

<script>
import Navs from '@/components/Navs'
import { mapGetters } from 'vuex'
export default {
  name: 'NavHeader',
  components: {
    Navs
  },
  computed: {
    ...mapGetters([
      'collapseClass',
      'mainMenu'
    ])
  }
}
</script>
<style lang="scss" scoped>

</style>
