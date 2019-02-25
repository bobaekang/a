// Return filtered array of items using a filter object
export function applyFilterBox(items, filters, fObj) {
  const fObjKeys = Object.keys(fObj)

  let keys = []
  for (let key of filters.map(key => key.title)) {
    for (let objKey of fObjKeys) {
      if (key.toUpperCase() === objKey) keys.push(key)
    }
  }

  let itemsToShow = []
  for (let item of items) {
    if (_isItemToShow(item, keys, fObj)) itemsToShow.push(item)
  }

  return itemsToShow
}

// Return select properties of an object only
export function pick(obj, keys) {
  return keys
    .map(k => (k in obj ? { [k]: obj[k] } : {}))
    .reduce((res, o) => Object.assign(res, o), {})
}

// Unwrap an object's properties into an array of objects
export function unwrapObj(obj) {
  const keys = Object.keys(obj)
  const vals = Object.values(obj)
  let arr = []
  for (let i = 0; i < keys.length; i++) {
    arr.push({
      title: keys[i],
      options: vals[i]
    })
  }
  return arr
}

// Create a single object from an array of objects
export function reduceObjArr(props, arr) {
  let obj = {}
  for (let prop of props) {
    obj[prop] = [
      ...new Set(_toUpperCaseAll(_flatten(arr.map(el => el[prop]))))
    ].sort()
  }
  return obj
}

// Generate a route object for 'router.js'
export function makeRoute(name, children = null, dirpath = './views') {
  const path = _getPath(name, false)
  const compPath = _getCompPath(name, dirpath)

  let route = {
    // name,
    path,
    component: () => import(`${compPath}`)
  }

  if (children != null) {
    route.children = children
  }

  return route
}

// Generate a child route object for 'router.js'
export function makeRouteChild(
  name,
  compname,
  path = null,
  dirpath = './views'
) {
  if (path === null) {
    path = _getPath(name, true)
  }
  const compPath = _getCompPath(compname, dirpath)

  return {
    name,
    path,
    props: true,
    component: () => import(`${compPath}`)
  }
}

const _isItemToShow = function(item, keys, fObj) {
  let test = keys.every(key => _hasKeyMatch(item, key, fObj))
  return test
}

const _hasKeyMatch = function(item, key, fObj) {
  const fVals = fObj[key.toUpperCase()]
  const vals = item[key]

  let test = false
  for (let fVal of fVals) {
    if (Array.isArray(vals)) {
      test = vals.some(val => fVal === val.toUpperCase())
      if (test) break
    } else {
      test = fVal === vals.toUpperCase()
      if (test) break
    }
  }
  return test
}

const _flatten = function(arr, result = []) {
  return result.concat.apply([], arr)
}

const _toUpperCaseAll = function(arr) {
  return arr.map(el => el.toUpperCase())
}

const _getPath = (name, child) => {
  if (name == 'home') {
    return '/'
  } else {
    return child ? name : `/${name}`
  }
}

const _getCompPath = (name, dirpath) => {
  return `${dirpath}/${name.charAt(0).toUpperCase() + name.slice(1)}.vue`
}
