<template>
  <div class="add" v-if="list">
    <h2>新增文章</h2>
    <div class="row">
      <label for="title">文章標題：</label>
      <input type="text" name="title" id="title" v-model="title" />
    </div>
    <div class="row">
      <label for="content">文章內容：</label>
      <textarea type="text" name="content" id="content" v-model="content" />
    </div>

    <button @click="add">新增文章</button>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'add',
  data () {
    return {
      list: null,
      title: '',
      content: ''
    }
  },
  methods: {
    add () {
      axios
        .post('http://localhost:3000/posts', {
          title: this.title,
          authorHTML: this.content
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
