<template>
  <div class="add_page" v-if="list">
    <div class="container">
      <div class="add_box radius_box">
        <label class="title" for="title">文章標題</label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>
      <div class="add_box radius_box">
        <label class="title" for="content">文章內容</label>
        <vue-editor v-model="content" />
      </div>
      <button class="btn" @click="add">新增文章</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue2Editor from 'vue2-editor'

Vue.use(VueAxios, axios)
Vue.use(Vue2Editor)

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

<style lang="scss">
@import '../scss/common.scss';

.add_page {
  padding: 30px 0;
}
.add_box {
  margin: 20px 0;
  padding: 28px 30px 28px;
}
input {
  font-size: 18px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 12px;
}
.title {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 4px;
  line-height: 2;
  background-color: #ccc;
  font-weight: 700;
  color: #fff;
  border-radius: 6px;
}
.ql-toolbar {
  border-radius: 6px;
  margin-bottom: 10px;
}
#quill-container {
  border: none;
}
.ql-editor {
  border: 1px solid #ccc;
  border-radius: 6px;
}
.btn {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  color: #fff;
  background-color: $sec_light_color;
  border: none;
  border-radius: 6px;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background-color: $sec_color;
  }
}
</style>
