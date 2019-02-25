import Vue from 'vue'
import Router from 'vue-router'

import { makeRoute, makeRouteChild } from './utils'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    makeRoute('home'),
    makeRoute('about'),
    makeRoute('apps', [
      makeRouteChild('appSearch', 'AppSearch', ''),
      makeRouteChild('appView', 'AppView', ':name')
    ]),
    makeRoute('articles', [
      makeRouteChild('articleSearch', 'ArticleSearch', ''),
      makeRouteChild('articleView', 'ArticleView', ':name')
    ]),
    makeRoute('authors', [
      makeRouteChild('authorList', 'AuthorList', ''),
      makeRouteChild('authorView', 'AuthorView', ':name')
    ]),
    makeRoute('datasets', [
      makeRouteChild('datasetSearch', 'DatasetSearch', ''),
      makeRouteChild('datasetView', 'DatasetView', ':name')
    ])
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})
