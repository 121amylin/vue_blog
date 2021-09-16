<template>
  <div class="list_page" v-if="list">
    <div class="container">
      <div class="row">
        <div class="bg_box radius_box">
          <select name="searchclass" id="searchclass" v-model="now_chooseClass">
            <option :value="item" v-for="item in classArr" :key="item">{{
              item
            }}</option>
          </select>
          <div class="tab_box">
            <label :for="item" v-for="item in radioArr" :key="item"
              ><input
                :value="item"
                type="checkbox"
                :id="item"
                v-model="choose_radioArr"
              />{{ item }}</label
            >
          </div>
          <button class="btn" @click="search">搜尋文章</button>
        </div>
      </div>

      <div class="row" v-if="show_list">
        <ul class="list">
          <li v-for="item in filterList" :key="item.id" class="radius_box">
            <a
              class="atitle"
              href="javascript:;"
              @click.prevent="linktomore(item.id)"
            >
              {{ item.title }}</a
            >
            <a href="javascript:;" @click="deleteItem(item.id)">X</a>
          </li>
        </ul>
      </div>
      <div v-else class="row">
        <p>搜尋不到資料</p>
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
  name: 'articlelist',
  data () {
    return {
      list: null,
      text: '',
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
      now_chooseClass: '線上工具',
      is_revise: false,
      now_ID: null,
      filterList: []
    }
  },
  computed: {
    show_list () {
      return this.filterList.length > 0
    }
  },
  methods: {
    findID (id) {
      let point = 1
      this.list.forEach(item => {
        if (item.id === id) {
          this.now_ID = point
        } else {
          point++
        }
      })
    },
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
      this.$router.push(`articlelist/show/${id}`)
    },
    search () {
      if (this.now_chooseClass && this.choose_radioArr.length > 0) {
        let temp = []
        const temp2 = []
        temp = this.list.filter(item => {
          return item.class === this.now_chooseClass
        })

        temp.forEach(item => {
          item.tabClass.forEach(item2 => {
            if (this.choose_radioArr.indexOf(item2) > -1) {
              temp2.push(item)
            }
          })
        })
        this.filterList = temp2
        this.now_chooseClass = '線上工具'
        this.choose_radioArr = []
      }
    },
    deleteItem (id) {
      this.findID(id)
      axios.delete(`http://localhost:3000/posts/${id}`)
      this.filterList.splice(this.now_ID, 1)
    }
  },

  mounted () {
    axios('http://localhost:3000/posts').then(res => {
      this.list = res.data
      this.filterList = res.data
    })
  }
}
</script>
<style lang="scss" scope>
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
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    a.atitle {
      width: calc(100% - 20px);
      text-align: left;
    }
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

.tab_box {
  padding-top: 10px;
}
#searchclass {
  margin-bottom: 10px;
}
</style>
