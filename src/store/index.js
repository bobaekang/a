import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/config/api'

import * as apps from '@/store/modules/apps.js'
import * as articles from '@/store/modules/articles.js'
import * as authors from '@/store/modules/authors.js'
import * as datasets from '@/store/modules/datasets.js'
import * as docs from '@/store/modules/docs.js'
import * as search from '@/store/modules/search.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    apps,
    articles,
    authors,
    datasets,
    docs,
    search
  },
  state: {
    api_url: api.BASE_URL
  }
})
