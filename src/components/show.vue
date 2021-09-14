<template>
  <div class="list" v-if="list">
    <h1>{{ showdata[0].title }}</h1>
    <div v-html="showdata[0].authorHTML"></div>

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
      return this.list.filter(item => {
        return (item.id = this.$route.params.id)
      })
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
