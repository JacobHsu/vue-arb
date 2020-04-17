<template>
    <ul v-if="list" :class="ulClass">
        <li v-for="item in list" :key="item.name" :class="liClass">
            <a class="nav-cursor" :class="[aClass(item.disabled), aActive(item)]" @click="clickAction(item.key)">
                {{ getName(item) }}
            </a>
        </li>
    </ul>
</template>

<script>
const styles = {
  ul: {
    default: 'navbar-nav',
    mainMenu: 'navbar-nav mr-auto',
    welcomeUser: '',
    topicTypes: 'nav nav-pills nav-fill'
  },
  li: {
    default: 'nav-item',
    welcomeUser: 'nav-item welecome',
    topicTypes: 'nav-item bg-white topicTypes'
  },
  a: {
    default: 'nav-link'
  }
}

export default {
  name: 'Navs',
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    type: String,
    list: {
      type: Array,
      default: () => []
    },
    cb: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    ulClass () {
      return styles.ul[this.type] ? styles.ul[this.type] : styles.ul.default
    },
    liClass () {
      return styles.li[this.type] ? styles.li[this.type] : styles.li.default
    }
  },
  methods: {
    clickAction: function (key) {
      this.cb(key)
    },
    aClass: function (disabled) {
      return disabled ? `${styles.a.default} disabled` : `${styles.a.default}`
    },
    aActive: function (item) {
      return this.id === item.key ? 'active' : ''
    },
    getName (item) {
      if (item.name === 'header_t_welcome_user') {
        return this.$t(item.name, [item.remark])
      }
      return this.$t(item.name)
    }
  }
}

</script>

<style lang="scss" scoped>
// .nav-cursor {
//   cursor: pointer;
// }
</style>
