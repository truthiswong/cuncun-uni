<template>
  <div class="layout">
    <van-nav-bar v-show="$store.state.headerShow" title="地址管理" class="header">
      <template slot="left">
        <van-icon @click="onClickLeft" name="arrow-left" />
      </template>
      <template slot="right">
        <span class="header_right" @click="onClickRight">添加新地址</span>
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <div class="content">
      <div class="address_list">
        <van-cell>
          <template slot="title">
            <span class="van-cell-text">王女士</span>
            <span style="margin-left: 0.2rem;">13928863927</span>
            <van-tag style="margin-left: 0.2rem;" color="#BD676C" v-show="false" plain>公司</van-tag>
            <van-tag style="margin-left: 0.2rem;" color="#BD676C" v-show="false" plain>学校</van-tag>
            <van-tag style="margin-left: 0.2rem;" color="#BD676C" v-show="true" plain>家</van-tag>
          </template>
          <template slot="label">
            <p class="van-cell-text">上海市静安区西藏南路666号大型创意园C666</p>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div class="change_address">
              <van-checkbox :value="checked" @click="onDefaultAddress" checked-color="#3CC3BA">默认地址</van-checkbox>
              <div>
                <van-button hairline size="mini" icon="delete">删除</van-button>
                <van-button hairline size="mini" icon="edit">编辑</van-button>
              </div>
            </div>
          </template>
        </van-cell>
      </div>
      <div class="address_list">
        <van-cell>
          <template slot="title">
            <span class="van-cell-text">王女士</span>
            <span style="margin-left: 0.2rem;">13928863927</span>
            <van-tag style="margin-left: 0.2rem;" color="#BD676C" plain>学校</van-tag>
          </template>
          <template slot="label">
            <p class="van-cell-text">上海市静安区西藏南路666号大型创意园C666</p>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div class="change_address">
              <van-checkbox :value="!checked" checked-color="#3CC3BA">默认地址</van-checkbox>
              <div>
                <van-button hairline size="mini" icon="delete">删除</van-button>
                <van-button hairline size="mini" icon="edit">编辑</van-button>
              </div>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      checked: true
    };
  },
  watch: {},
  computed: {},
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      // this.$router.push({
      //   path: "/qrCode"
      // });
    },
    onDefaultAddress() {
      this.checked = !this.checked
    }
  }
};
</script>

<style scoped="scoped">
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(249, 249, 249, 1);
}
.header_right {
  font-size: 0.28rem;
  color: rgba(3, 166, 166, 1);
}
.content {
  position: relative;
  width: 100%;
  height: calc(100% - 0.92rem);
  overflow-x: hidden;
  overflow-y: scroll;
}
.address_list {
  margin-top: 0.2rem;
}
.change_address {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
</style>