<template>
  <div class="list" v-if="list">
    <h1>{{ showdata.title }}</h1>
    <div v-html="showdata.authorHTML"></div>

    <!-- $route.params.id -->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'show',
  data () {
    return {
      list: null,
      text: ''
    }
  },
  computed: {
    showdata () {
      const num = this.$route.params.id - 1
      return this.list[num]
    }
  },
  methods: {
    add () {
      axios
        .post('http://localhost:3000/posts', {
          content: this.text
        })
        .then(res => {
          this.text = ''
          this.content.push(res.data)
        })
    }
  },
  mounted () {
    axios('http://localhost:3000/posts').then(res => {
      this.list = res.data
    })
  }
}
</script>
