<template>
  <div class="layout">
    <hx-navbar :back="true" title="用户协议" color="rgba(40,40,40,1)" barPlaceholder="hidden" transparent="auto"
     :background-color="[255, 255, 255]">
    	<view slot="left">
    		<image @click="onClickBack" src="../../static/images/header-back.png" style="width: 40upx; height: 40upx; margin: 30upx 32upx 0;"></image>
    	</view>
    </hx-navbar>
    <!-- 内容 -->
    <div class="content">用户协议</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight(index) {
      if (index == 1) {
        console.log(1);
      } else if (index == 2) {
        console.log(2);
      }
    }
  }
};
</script>

<style scoped="scoped">
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  position: relative;
  width: 100%;
  height: calc(100% - 0.92rem);
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0.2rem;
}
.content_seed {
  position: relative;
  width: 100%;
  height: 6.25rem;
  background: linear-gradient(
    180deg,
    rgba(125, 184, 254, 1) 0%,
    rgba(208, 248, 254, 1) 100%
  );
}
</style>