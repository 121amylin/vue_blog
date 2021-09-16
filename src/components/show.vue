<template>
  <div class="show_page" v-if="list">
    <div class="container">
      <div class="row">
        <h3 class="title">{{ showdata.title }}</h3>

        <div class="show radius_box">
          <div class="edit_show" v-html="showdata.authorHTML"></div>
        </div>
        <br />
        <div class="show radius_box">
          <p>文章類別：{{ showdata.class }}</p>
          <p>文章標籤：{{ showdata.tabClass | arrStr }}</p>
          <p>建立時間：{{ showdata.date }}</p>
        </div>
      </div>
      <button class="btn" @click="back">back</button>
    </div>

    <!-- $route.params.id -->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.filter('arrStr', value => {
  return value.join('、')
})
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
    },
    back () {
      this.$router.go(-1)
    },
    resive (id) {
      this.findID(id)
      this.now_chooseClass = this.list[this.now_ID].class
      this.choose_radioArr = this.list[this.now_ID].tabClass
      this.is_revise = true
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

.show {
  padding: 30px;
  text-align: left;
}
.edit_show {
  ol,
  ul {
    list-style-position: inside;
  }
  li {
    padding: 4px 0;
  }
  a,
  li,
  p {
    line-height: 1.5;
    font-size: 16px;
  }
  a {
    color: $sec_light_color;
    font-weight: 700;
    transition: color 0.3s;
    &:hover {
      color: $sec_color;
    }
  }
}
.ql-syntax {
  padding: 15px 20px;
  background-color: $dark_g_color;
  color: #fff;
  border-radius: 6px;
}
</style>
