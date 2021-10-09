<template>
  <div>
      <div class="responsive-wrap comment">
        <div class="comment-header">
          <span v-if="userInfo"> {{ userInfo.username }}， </span>
          欢迎您的评论
        </div>
        <div v-if="!isLoginStatus" class="login-tips">
          当前是匿名评论，登录后让代码改变世界！
          <span class="sign-in" @click="onShowLoginInner(true)">登录/注册</span>
        </div>

        <From @on-preview="onShowPreviewContent"></From>
        <CommentList ref="commentList" @on-preview="onShowPreviewContent"/>

      </div>

      <el-drawer
        :size="size"
        :direction="direction"
        :with-header="false"
        :visible.sync="showPreviewContent"
      >
        <div class="comment">
          <div class="comment-header">预览：</div>
          <div v-html="previewContent"></div>
        </div>
      </el-drawer>

      <el-drawer
        :size="size"
        :direction="direction"
        :with-header="false"
        :visible.sync="showLoginInner"
      >
        <Login @on-success="onShowLoginInner"></Login>
      </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getToken } from '@/lib/auth'
import { isMobile } from '@/lib/utils'
import Login from "./Login";
import From from "./From";
import CommentList from "./CommentList";

export default {
  name: 'Comment',
  components: {
    From,
    Login,
    CommentList
  },
  data() {
    return {
      direction: 'rtl',
      size: '38.2%',
      previewContent: '',
      showPreviewContent: false,
      showLoginInner: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
    }),
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 获取数据-用户数据，评论列表数据
    async initData() {
      if (!this.isLoginStatus && getToken()) {
        await this.$store.dispatch('user/userInfo')
      }
    },
    // 弹框登录
    onShowLoginInner(isShow) {
      this.direction = isMobile() ? 'btt' : 'rtl'
      this.size = isMobile() ? '72%' : '38.2%'
      this.showLoginInner = isShow
    },
    // 预览内容
    onShowPreviewContent(content) {
      if (!content) {
        this.$message.warning('请输入内容!')
        return false
      }

      this.previewContent = this.mdRender(content)
      this.showPreviewContent = !this.showPreviewContent
    },
    // 渲染markdown内容
    mdRender(content) {
      return content ? this.$md && this.$md.render(content) : content
    },
  },
}
</script>

<style scoped lang="scss">
ul,
li,
p {
  padding: 0;
  margin: 0;
}
.comment {
  box-sizing: border-box;
  padding-top: 32px;
  padding-bottom: 32px;
  margin: 32px auto;
  border-top: 1px solid #eee;

  &-header {
    padding-bottom: 10px;
    font-size: 24px;
    color: #404040;
    font-weight: 600;
  }

  .login-tips {
    font-size: 14px;
    color: #404040;
    padding-bottom: 20px;

    span {
      cursor: pointer;
      color: #2d8cf0;
      text-decoration: underline;
    }
  }
}
</style>
