import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


// 导航栏全局注册
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
Vue.component('uni-nav-bar', uniNavBar)
// 弹窗
import uniPopup from "@/components/uni-popup/uni-popup.vue"
Vue.component('uni-popup', uniPopup)
// 搜索框
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
Vue.component('uni-searchBar', uniSearchBar)
// 列表
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
Vue.component('uni-list', uniList)
Vue.component('uni-list-item', uniListItem)
// 标签
import uniTag from "@/components/uni-tag/uni-tag.vue"
Vue.component('uni-tag', uniTag)
// NumberBox 数字输入框
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
Vue.component('uni-number-box', uniNumberBox)
// 折叠面板
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
Vue.component('uni-collapse', uniCollapse)
Vue.component('uni-collapse-item', uniCollapseItem)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
