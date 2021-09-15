<template>
  <div class="show_page" v-if="list">
    <div class="container">
      <div class="row">
        <div class="show radius_box">
          <div class="edit_show" v-html="showdata.authorHTML"></div>
        </div>
      </div>
    </div>

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

<style lang="scss">
@import '../scss/common.scss';

.show {
  padding: 30px;
  text-align: left;
}
.edit_show {
  ul {
    list-style-position: inside;
  }
  li{
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
