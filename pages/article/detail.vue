<template>
  <div>
    <Header />

    <div class="responsive-wrap article">
      <h1 class="title">
        {{ article.title }}
      </h1>
      <div class="description">
        {{ article.description }}
      </div>
      <div class="info">
        <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
        <span v-if="article.category_info" class="category">
          {{ article.category_info.name }}
        </span>
        <span class="created-at">{{ article.created_at }}</span>
        <span class="comment-count" @click="onShowComment">
          <i class="el-icon-chat-round">评论 {{ article.comment_count }}</i>
        </span>
      </div>
      <div v-html="article.content"></div>
    </div>

    <div class="fixed-sidebar">
      <div class="fixed-comment">
        <i class="el-icon-chat-round" @click="onShowComment"></i>
      </div>
      <div class="fixed-scroll-top">
        <i class="el-icon-top" @click="scrollTop"></i>
      </div>
    </div>

    <div class="comment-container">
      <Comment ref="comment" />
    </div>

    <Footer />

  </div>
</template>
<script>
import { getArticleDetail } from '@/request/api/article'

import Comment from '@/components/Comment'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'ArticleDetail',
  components: {
    Comment,
    Header,
    Footer,
  },
  async asyncData(context) {
    const { id } = context.query
    const params = {
      id,
      is_markdown: true,
    }
    const [err, res] = await getArticleDetail(params)
    if (!err) {
      return {
        article: res.data.data
      }
    }
  },
  async fetch({ store }) {
    await store.dispatch('category/getCategoryData')
  },
  head() {
    const article = this.article || {}
    return {
      title: article.title,
      meta: [
        { name: 'keywords', content: article.seo_keyword },
        { name: 'description', content: article.description },
      ],
    }
  },
  methods: {
    // 回到顶部
    scrollTop() {
      this.$scrollTo(0)
    },
    // 点击展开评论
    onShowComment() {
      const comment = document.querySelector('.comment-container')
      if(comment) {
        const commentTop = comment.getBoundingClientRect().top
        this.$scrollTo(commentTop)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.title {
  font-weight: 600;
  font-size: 46px;
  margin: 28px 0;
  line-height: 56px;
}
.description {
  color: #757575;
  margin: 20px 0;
  font-size: 22px;
}
.info {
  display: flex;
  align-items: center;
  margin: 32px 0;
}

.info span {
  color: #757575;
  font-size: 14px;
  display: inline-block;
  margin-right: 10px;
}

.comment-count {
  cursor: pointer;
  &:hover {
    color: #2d8cf0;
  }
}

.fixed-sidebar {
  cursor: pointer;
  position: fixed;
  bottom: 32px;
  right: 32px;
}
</style>

