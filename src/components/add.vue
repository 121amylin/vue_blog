<template>
  <div class="add_page" v-if="list">
    <div class="container">
      <div class="bg_box radius_box">
        <label class="title" for="title">文章標題</label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>

      <div class="bg_box radius_box">
        <h3 class="title">文章分類</h3>
        <select name="addclass" id="addclass" v-model="now_chooseClass">
          <option :value="item" v-for="item in classArr" :key="item">{{
            item
          }}</option>
        </select>
      </div>

      <div class="bg_box radius_box">
        <h3 class="title">文章標籤</h3>
        <div class="tab_box">
          <label :for="item" v-for="item in radioArr" :key="item">
            <input
              :value="item"
              type="checkbox"
              id="item"
              v-model="choose_radioArr"
            />{{ item }}
          </label>
        </div>
      </div>

      <div class="bg_box radius_box">
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
      content: '',
      classArr: [
        '線上工具',
        'chrome開發工具',
        'CSS 生產器',
        '付費素材',
        '免費素材',
        'VScode tools',
        'ICON 素材資源',
        '網站檢測工具',
        '設計靈感',
        '工具軟體'
      ],
      radioArr: ['CSS', 'javaScript', 'Vue', 'HTML'],
      choose_radioArr: [],
      now_chooseClass: '線上工具'
    }
  },
  methods: {
    add () {
      axios
        .post('http://localhost:3000/posts', {
          date: new Date().toLocaleString(),
          title: this.title,
          class: this.now_chooseClass,
          tabClass: this.choose_radioArr,
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
h3 {
  font-size: 16px;
}
.add_page {
  padding: 30px 0;
}

select,
input {
  font-size: 18px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 12px;
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
</style>
