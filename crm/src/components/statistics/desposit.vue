<template>
  <div class="history cantainer">
    <div class="filiter">
      <p>
        统计报表
        <el-select v-model="sheet_value" placeholder="请选择" class="chooseItem">
          <el-option v-for="item in sheet" :key="item.value" :label="item.label" :value="item.value">
            <router-link v-bind:to="item.link">{{item.label}}</router-link>
          </el-option>
        </el-select>
      </p>
    </div>
    <p class="time">最后更新：{{time | time}}<i class="iconfont icon-shuaxin1" @click="update()"></i></p>
    <div class="select clearfix">
      <el-select v-model="attach_value" placeholder="请选择" class="level pull-left">
        <el-option v-for="item in attach" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div class="ascription pull-left clearfix">
        <!-- <el-select v-model="timevalue" placeholder="请选择" class="ascription_type pull-left">
          <el-option v-for="item in timeselect" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select> -->
        <label class="pull-left">操作时间：</label>
        <el-date-picker v-model="value7" type="daterange" align="left" placeholder="选择日期范围" :picker-options="pickerOptions2" class="pull-left"></el-date-picker>
      </div>
      <div class="ascription pull-right clearfix">
        <el-select v-model="search_account_value" placeholder="请选择" class="ascription_type pull-left">
          <el-option v-for="item in search_account" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <input type="text" class="keyword">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <div class="list withdrawrecord">
      <div class="operates clearfix">
        <span>账户信息</span>
        <ul class="operate_btns pull-right clearfix">
          <li>
            <a class="download" @click="add()">
              <img src="../../assets/images/04download.png">
            </a>
          </li>
        </ul>
      </div>
      <table>
        <thead>
          <tr>
            <td v-bind:style="{width:'13%'}">账户归属</td>
            <td v-bind:style="{width:'13%'}">账户</td>
            <td v-bind:style="{width:'13%'}">账户名称</td>
            <td v-bind:style="{width:'13%'}">客户名称</td>
            <td v-bind:style="{width:'8%'}">入金</td>
            <td v-bind:style="{width:'8%'}">出金</td>
            <td v-bind:style="{width:'10%'}">信用调整</td>
            <td v-bind:style="{width:'12%'}">操作时间</td>
            <td v-bind:style="{width:'10%'}"><p>备注</p></td>
          </tr>
        </thead>
        <tbody v-if="json.length > 0">
          <tr v-for="(item, index) in json">
            <td v-bind:style="{width:'13%'}"><p>{{item.belong}}</p></td>
            <td v-bind:style="{width:'13%'}"><p>{{item.account}}</p></td>
            <td v-bind:style="{width:'13%'}"><p>{{item.name}}</p></td>
            <td v-bind:style="{width:'13%'}"><p>{{item.accountname}}</p></td>
            <td v-bind:style="{width:'8%'}"><p>{{item.deposit}}</p></td>
            <td v-bind:style="{width:'8%'}"><p>{{item.gold}}</p></td>
            <td v-bind:style="{width:'10%'}"><p>{{item.credit}}</p></td>
            <td v-bind:style="{width:'12%'}"><p>{{item.time | time}}</p></td>
            <td v-bind:style="{width:'10%'}"><p>{{item.notice}}</p></td>
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
  import sheet from '../../assets/js/sheet'
  import attach from '../../assets/js/attach'
  import searchAccount from '../../assets/js/search_account'
  export default {
    name: 'desposit',
    data () {
      return {
        loading_error: {
          img: require('../../assets/images/no_result.png'),
          tip: '暂无数据'
        },
        ids: [],
        checkAll: false,
        json: [],
        time: 'Tue Oct 10 2017 09:16:04 GMT+0800 (中国标准时间)',
        attach: attach,
        attach_value: '1',
        search_account: searchAccount,
        search_account_value: 'a1',
        sheet: sheet,
        sheet_value: 'b4',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value7: ''
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
            id: i,
            belong: '高育良',
            account: '015749' + i + i * 5,
            name: '赵东来',
            accountname: '赚他一个亿公司',
            deposit: '5000.00',
            gold: '100.00',
            credit: '0.00',
            time: 'Tue Oct 10 2017 09:16:04 GMT+0800 (中国标准时间)',
            notice: '由BORKER调整'
          }
          $self.json.push(data)
        }
      },
      select (id, event) {
        if (event.currentTarget.checked) {
          console.log($self.ids)
          if ($self.ids.length === $self.json.length) {
            $self.checkAll = true
          }
        } else {
          $self.checkAll = false
        }
      },
      selectAll (event) {
        if (!event.currentTarget.checked) {
          $self.ids = []
        } else {
          $self.ids = []
          $self.json.forEach(function (item, i) {
            $self.ids.push(item.id)
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/sass/statistics.scss"
</style>
