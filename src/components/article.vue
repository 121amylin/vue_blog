<template>
  <div class="list_page" v-if="list">
    <div class="container">
      <div class="row">
        <ul class="list">
          <li v-for="item in list" :key="item.id" class="radius_box">
            <a href="javascript:;" @click.prevent="linktomore(item.id)">
              {{ item.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'article',
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
      this.$router.push(`article/show/${id}`)
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
.list_page {
  margin: 30px 0;
}
.list {
  display: flex;
  list-style: none;
  justify-content: space-between;
  flex-wrap: wrap;

  li {
    width: calc(50% - 15px);
    transition: box-shadow 0.3s;
    border: 1px solid #ccc;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
      width: 100%;
      margin: 10px;
    }
    &:hover {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      a {
        color: $sec_color;
      }
    }
    a {
      padding: 15px 10px;
      display: block;
    }
  }
}
</style>
