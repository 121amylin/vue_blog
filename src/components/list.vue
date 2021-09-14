<template>
  <div class="list" v-if="list">
    <h1>文章列表</h1>
    <ul>
      <li v-for="item in list" :key="item.id">
        <a href="javascript:;" @click.prevent="linktomore(item.id)">
          {{ item.title }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'list',
  data () {
    return {
      list: null,
      text: ''
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
    },
    linktomore (id) {
      this.$router.push(`/show/${id}`)
    }
  },

  mounted () {
    axios('http://localhost:3000/posts').then(res => {
      this.list = res.data
    })
  }
}
</script>
