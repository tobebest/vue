<template>
  <center class="pag_nav clearfix">
    <!-- <nav aria-label="..." class="clearfix text-center">
      <ul class="pagination pull-left" v-if="pages.totalnum>5">
        <li v-if="prev" @click="prevpage()">
          <a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
        </li>
        <li v-for="item in pagesize" :class="{'active':pages.current == item}" :key="item">
          <a @click="pagechoose(item)">{{item}}</a>
        </li>
        <li v-if="next" @click="nextpage()">
          <a aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
        </li>
      </ul>
      <p class="pull-right pagesize">
        <span>跳至</span>
        <input style="margin: 0 5px;" type="number" name="" v-model="topage" class="topage" @keyup.enter="gotopage()" min="1" v-bind:max="pages.totalpage">页
        <span style="margin-left:5px;">共{{pages.totalnum}}条记录</span>
      </p>
    </nav> -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-size="pages.size"
      layout="total, prev, pager, next, jumper"
      :total="pages.totalnum">
    </el-pagination>
  </center>
</template>
<script>
  let $self = ''
  export default {
    props: {
      pages: {
        type: Object
      }
    },
    data () {
      return {
        pagesize: [],
        next: false,
        prev: false,
        topage: '',
        currentPage4: this.pages.current
      }
    },
    created () {
      $self = this
      $self.resize()
    },
    methods: {
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        $self.$parent.nowpage = val
      },
      resize (current) {
        $self.pagesize = []
        let size = Number($self.pages.totalpage)
        if (current === undefined) {
          current = Number($self.pages.current)
        } else {
          $self.pages.current = current
        }
        for (let i = 0; i < size; i++) {
          let j = i + 1
          $self.pagesize.push(j)
        }
        if (current === 1) {
          $self.prev = false
        } else {
          $self.prev = true
        }
        if (current === size) {
          $self.next = false
        } else {
          $self.next = true
        }
      },
      pagechoose (page) {
        $self.pages.current = page
        $self.$parent.pages.current = page
        let start = page * $self.pages.size - $self.pages.size
        $self.$parent.start = start
        $self.resize()
      },
      prevpage () {
        let current = Number($self.pages.current)
        let prevpage = current - 1
        let start = prevpage * $self.pages.size - $self.pages.size
        $self.$parent.start = start
        $self.$parent.pages.current = prevpage
        $self.resize(prevpage)
      },
      nextpage () {
        let current = Number($self.pages.current)
        let nextpage = current + 1
        let start = nextpage * $self.pages.size - $self.pages.size
        $self.$parent.start = start
        $self.$parent.pages.current = nextpage
        $self.resize(nextpage)
      },
      gotopage () {
        let total = Number($self.pages.totalpage)
        $self.pages.current = $self.topage
        let current = Number($self.pages.current)
        if (current > total) {
          $self.topage = $self.pages.totalpage
          $self.pages.current = $self.pages.totalpage
        }
        $self.$parent.pages.current = $self.topage
        let start = $self.topage * $self.pages.size - $self.pages.size
        $self.$parent.start = start
        $self.resize()
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/page.css";
</style>
