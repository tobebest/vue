<template>
  <div class="setting_view cantainer">
    <div class="filiter">
      <p>
        账户设置
      </p>
    </div>
    <p class="time">最后更新：{{time | time}}<i class="iconfont icon-shuaxin1" @click="update()"></i></p>
    <div class="list">
      <h5>
        账户组设置
      </h5>
      <a class="add">
        <img src="../../assets/images/03add.png">
      </a>
      <table>
        <thead>
          <tr>
            <td v-bind:style="{width:'25%'}">账户组ID</td>
            <td v-bind:style="{width:'50%'}" class="text-center">账户组名称</td>
            <td v-bind:style="{width:'25%'}"><p>操作</p></td>
          </tr>
        </thead>
        <tbody v-if="json.length > 0">
          <tr v-for="item in json">
            <td v-bind:style="{width:'25%'}"><p>{{item.groupId}}</p></td>
            <td v-bind:style="{width:'50%'}">
              <p class="text-center">{{item.name}}</p>
            </td>
            <td v-bind:style="{width:'25%'}">
              <p>
                <ul class="clearfix pull-right">
                  <li>
                    <a class="edit">
                      <i class="iconfont icon-edit"></i>
                    </a>
                  </li>
                  <li>
                    <a class="del">
                      <i class="iconfont icon-del"></i>
                    </a>
                  </li>
                </ul>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pages clearfix" v-if="json.length > 0">
        <el-pagination layout="prev, pager, next" :total="1000" class="pull-right"></el-pagination>
      </div>
      <div class="no_result" v-if="json.length == 0">
        <img v-bind:src="loading_error.img">
        <p>{{loading_error.tip}}</p>
      </div>
    </div>
  </div>  
</template>
<script>
  let $self = ''
  export default {
    name: 'saccount',
    data () {
      return {
        loading_error: {
          img: require('../../assets/images/no_result.png'),
          tip: '暂无数据'
        },
        json: [],
        time: 'Tue Oct 10 2017 09:16:04 GMT+0800 (中国标准时间)'
      }
    },
    created () {
      $self = this
      $self.init()
    },
    methods: {
      init () {
        for (let i = 0; i < 10; i++) {
          let data = {
            i: i,
            groupId: '011' + i,
            name: '标准账户组'
          }
          $self.json.push(data)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/sass/system.scss'
</style>
