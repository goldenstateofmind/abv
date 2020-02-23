var A = {}

function cj(o) {
  return JSON.parse(JSON.stringify(o))
}

var PROD = true

A.lut = {
  gn: 'gin',
  rw: 'rye whiskey',
  bw: 'bourbon whiskey',
  bit: 'bitters',
  amar: 'amaro',
  aperol: 'aperol',
  peych: "Peychaud's bitters",
  cog: 'cognac',
  abs: 'absinthe',
  soda: 'soda water',
  lemj: 'lemon juice',
  limj: 'lime juice',
  cherry: 'cherry',
  lem: 'lemon',
  lim: 'lime',
  orange: 'orange',
  olive: 'olive',
  tripsc: 'triple sec',
  mali: 'maraschino liqueur',
  bene: 'Bénédictine',
  gc: 'Green Chartreuse',
  sv: 'sweet vermouth',
  dv: 'dry vermouth',
  ss: 'simple syrup',
  cocchi: 'cocchi',
  Ng: 'Negroni',
  Mtz: 'Martinez',
  OF: 'Old Fashioned',
  Mnhtn: 'Manhattan',
  Blvdr: 'Boulevardier',
  Prkns: 'Preakness',
  jsmn: 'Jasmine',
  avtn: 'Aviation',
  gg: 'Gin Gimlet',
  tlw: 'The Last Word',
  ws: 'Whiskey Sour',
  wl: 'White Lady',
  gf: 'Gin Fizz / John Collins',
  cpn2: 'Corpse Reviver №2',
  merican: 'Americano',
  vc: 'Vieux Carré',
  teq: 'tequila',
  dv: 'dry vermouth',
  oj: 'orange juice',
  gj: 'grapefruit juice',
  pros: 'prosecco',
  gngrbr: 'ginger beer',
  rum: 'rum',
  vod: 'vodka',
  ton: 'tonic',
}

// And the one sugar cube = 1 tsp sugar = ~ 1/4 oz simple syrup (1:1) is about right.Dec 20, 2009

A.ingrds = {
  // spirit
  rw: { color: '#dc7a13', type: 'spirit' },
  gn: { color: '#7fc0da', type: 'spirit' },
  abs: { color: '#aec390', type: 'spirit' },
  cog: { color: '#8c3226', type: 'spirit' },
  // red
  sv: { color: '#840e11', type: 'sweet' },
  amar: { color: '#b30022', type: 'bitter' },
  bit: { color: '#b62d05', type: 'bitter' },
  cocchi: { color: '#ecdda2', type: 'bitter' },
  // hl
  gc: { color: '#39d623', type: 'herbal liqueur' },
  bene: { color: '#ecd10e', type: 'herbal liqueur' },
  // fl
  mali: { color: '#de001f', type: 'fruit liqueur' },
  tripsc: { color: '#ff9a34', type: 'fruit liqueur' },
  peych: { color: '#d45d9e', type: 'bitter' },
  //
  lemj: { color: '#ffff00', type: 'cordial' },
  limj: { color: '#93d53d', type: 'cordial' },
  soda: { color: '#eeeeff', type: 'cordial' },
  ss: { color: '#aaaaaa', type: 'sweet' },
}

A.revlut = {}
Object.entries(A.lut).forEach(e => {
  A.revlut[e[1]] = e[0]
})

A.drnkNmIngr = [
  {
    name: 'Long Island Iced Tea',
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'vod-|-ss-|-tripsc-lemj-|' },
    ingredientList: ['vod', 'ss', 'tripsc', 'lemj'],
    // 1.5 cl Tequila
    // 1.5 cl Vodka
    // 1.5 cl White rum
    // 1.5 cl Gin
    // 1.5 cl Triple sec
    // 2.5 cl Lemon juice
    // 3.0 cl Gomme Syrup
    // 1 dash of Coke
    /* 
    "Tattoo": "Ship."
    "Tattoo": "Done Is Better."
    */
  },
  {
    name: 'Blvdr',
    ingredientList: [{ spirit: 'rw' }, { bit: 'amar' }, { sweet: 'sv' }],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'rw-amar-sv' },
    ingredientAmounts: [
      { ingred: 'rw', amt: 1, units: 'oz' },
      { ingred: 'amar', amt: 1, units: 'oz' },
      { ingred: 'sv', amt: 1, units: 'oz' },
    ],
    directions: [
      { a: 'Stir with', b: 'ice' },
      { a: 'Strain to', b: 'chilled', c: 'coupe or rocks glass' },
      { note: 'Garnish with', garnish: 'orange', amt: '', units: 'twist' },
    ],
  },
  {
    name: 'Paper Plane',
    ingredientList: ['rw', 'amaro', 'lemj'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'rw-amar-|-|-|-lemj' },
    ingredientAmounts: [
      { ingred: 'bw', amt: 0.75, units: 'oz' },
      { ingred: 'amar', amt: 0.75, units: 'oz' },
      { ingred: 'aperol', amt: 0.75, units: 'oz' },
      { ingred: 'lemj', amt: 0.5, units: 'oz' },
    ],
    directions: [
      { a: 'Shake with', b: 'ice' },
      { a: 'Strain to', b: 'chilled', c: 'coupe' },
      { note: 'Garnish with', garnish: 'lemon', amt: '', units: 'twist' },
    ],
  },
  {
    name: 'Death in the Afternoon',
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'abs-pros' },
    ingredientList: ['abs', 'pros'],
  },
  {
    name: 'Sazerac',
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'cog-abs-ss-peych' },
    ingredientList: ['cog', 'abs', 'ss', 'peych'],
    ingredientAmounts: [
      { ingred: 'cog', amt: 2, units: 'oz' }, // or rw!
      { ingred: 'abs', amt: 1, units: 'coat' },
      { ingred: 'ss', amt: 0.25, units: 'oz' },
      { ingred: 'peych', amt: 4, units: 'dashes' },
    ],
    directions: [
      { a: 'Coat', b: 'chilled', vessel: 'rocks glass', d: 'with absinthe' },
      { a: 'Stir and strain' },
      { note: 'Express oils of', garnish: 'lemon', amt: '', units: 'twist' },
    ],
  },
  {
    name: 'Gin & Tonic',
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'gn-ton' },
    ingredientList: ['gn', 'ton'],
  },
  {
    name: 'Whiskey Soda',
    // ingStrs: {'sprt-bit-swe-hl-fl-cord-misc': 'rw-soda'}
    ingStrs: {
      'sprt-bit-swe-hl-fl-cord-misc': ['rw', '|', '|', '|', '|', 'soda'].join(
        '-'
      ),
    },
    ingredientList: ['rw', 'soda'],
  },
  {
    name: 'Ng',
    ingredientList: [{ spirit: 'gn' }, { bit: 'amar' }, { sweet: 'sv' }],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'gn-amar-sv' },
    ingredientAmounts: [
      { ingred: 'gn', amt: 1, units: 'oz' },
      { ingred: 'amar', amt: 1, units: 'oz' },
      { ingred: 'sv', amt: 1, units: 'oz' },
    ],
    directions: [
      { a: 'Stir with', b: 'ice' },
      { a: 'Strain to', c: 'coupe or rocks glass' },
      { note: 'Garnish with', garnish: 'orange', amt: '', units: 'twist' },
    ],
  },
  {
    name: 'Mtz',
    ingredientList: [{ spirit: 'gn' }, { bit: 'bit' }, { sweet: 'sv' }],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'gn-bit-sv' },
    ingredientAmounts: [
      { ingred: 'gn', amt: 2, units: 'oz' },
      { ingred: 'sv', amt: 1, units: 'oz' },
      { ingred: 'tripsc', amt: 0.25, units: 'oz' },
      { ingred: 'bit', amt: 2, units: 'dashes' },
    ],
    directions: [
      { a: 'Stir with', b: 'ice' },
      { a: 'Strain to', b: 'chilled', c: 'coupe' },
      { note: 'Garnish with', garnish: 'orange', amt: '', units: 'twist' },
    ],
  },
  {
    name: 'OF',
    ingredientList: [{ spirit: 'rw' }, { bit: 'bit' }, { sweet: 'ss' }],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'rw-bit-ss' },
    ingredientAmounts: [
      { ingred: 'rw', amt: 2, units: 'oz' },
      { ingred: 'ss', amt: 0.25, units: 'oz' },
      { ingred: 'bit', amt: 2, units: 'dashes' },
    ],
    directions: [
      { a: 'Stir with', b: 'ice' },
      { a: 'Strain to', b: 'chilled', c: 'rocks glass' },
      { note: 'Garnish with', garnish: 'orange', amt: '', units: 'twist' },
    ],
  },
  {
    name: 'Prkns',
    ingredientList: ['rw', 'sv', 'bene', 'bit'],
    ingredientList: [
      { spirit: 'rw' },
      { bit: 'bit' },
      { sweet: 'sv' },
      { hl: 'bene' },
    ],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'rw-bit-sv-bene-|-|' },
  },
  {
    name: 'Mnhtn',
    ingredientList: [{ spirit: 'rw' }, { bit: 'bit' }, { sweet: 'sv' }],
    ingStrs: {
      'sprt-bit-swe-hl-fl-cord-misc': 'rw-bit-sv',
    },
    ingredientAmounts: [
      { ingred: 'rw', amt: 2, units: 'oz' },
      { ingred: 'sv', amt: 1, units: 'oz' },
      { ingred: 'bit', amt: 2, units: 'dashes' },
      { ingred: 'bit', amt: 1, units: 'dash' },
    ],
    directions: [
      { a: 'Stir with', b: 'ice' },
      { a: 'Strain to', b: 'chilled', c: 'coupe' },
      {
        note: 'Garnish with',
        garnish: 'brandied cherry or lemon',
        amt: '',
        units: 'twist',
      },
    ],
  },
  {
    name: 'Americano',
    IBA: 'Unforgettable',
    // ingredientList: ['soda water', 'sweet vermouth', 'amaro'],
    ingredientList: ['sweet vermouth', 'amaro'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': '|-amar-sv-|-|-|-soda' },
    ingredientAmounts: [
      { ingred: 'amar', amt: 1.5, units: 'oz' },
      { ingred: 'sv', amt: 1.5, units: 'oz' },
      { ingred: 'soda', amt: 2.5, units: 'oz' },
    ],
    directions: [
      { a: 'Stir with', b: 'ice' },
      {
        note: 'Garnish with',
        garnish: 'orange',
        units: 'twist',
      },
    ],
  },
  {
    name: 'Aviation',
    IBA: 'Unforgettable',
    ingredientList: ['gin', 'maraschino liqueur', 'lemon juice'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'gn-|-|-|-mali-lemj' },
  },
  {
    name: 'Corpse Reviver №2',
    ingredientList: [
      'gin',
      'triple sec',
      'Cocchi Americano',
      'absinthe',
      'lemon juice',
    ],
    ingStrs: {
      'sprt-bit-swe-hl-fl-cord-misc': 'gn-cocchi-|-|-tripsc-lemj-abs',
    },
    ingredientAmounts: [
      { ingred: 'gn', amt: 0.75, units: 'oz' },
      { ingred: 'tripsc', amt: 0.75, units: 'oz' },
      { ingred: 'cocchi', amt: 0.75, units: 'oz' },
      { ingred: 'lemj', amt: 0.75, units: 'oz' },
      { ingred: 'ss', amt: 3, units: 'dashes' },
      { ingred: 'abs', amt: 2, units: 'dashes' },
    ],
    directions: [
      { a: 'Shake with', b: 'ice' },
      { a: 'Strain to', b: 'chilled', c: 'coupe' },
      {
        note: 'Garnish with',
        garnish: 'lemon',
        amt: '',
        units: 'twist',
      },
    ],
  },
  {
    name: 'White Lady',
    IBA: 'Unforgettable',
    ingredientList: ['gin', 'triple sec', 'lemon juice'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'gn-|-|-|-tripsc-lemj-|' },
  },
  {
    name: 'Gin Fizz / John Collins',
    IBA: 'Unforgettable',
    ingredientList: ['gin', 'lemon juice', 'simple syrup', 'soda water'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'gn-|-ss-|-|-lemj-soda' },
  },
  {
    name: 'Jasmine',
    ingredientList: ['gin', 'triple sec', 'amaro', 'lemon juice'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'gn-amar-|-|-tripsc-lemj' },
  },
  {
    name: 'Gin Gimlet',
    ingredientList: ['gin', 'lime juice', 'simple syrup'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'gn-|-ss-|-tripsc-limj' },
  },
  {
    name: 'Whiskey Sour',
    IBA: 'Unforgettable',
    ingredientList: ['rye whiskey', 'lemon juice', 'simple syrup'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'rw-|-ss-|-|-lemj' },
  },
  {
    name: 'The Last Word',
    ingredientList: [
      'gin',
      'lime juice',
      'maraschino liqueur',
      'green chartreuse',
    ],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'gn-|-|-gc-mali-limj' },
    ingredientAmounts: [
      { ingred: 'gn', amt: 0.75, units: 'oz' },
      { ingred: 'gc', amt: 0.75, units: 'oz' },
      { ingred: 'mali', amt: 0.75, units: 'oz' },
      { ingred: 'limj', amt: 0.5, units: 'oz' },
    ],
    directions: [
      { a: 'Shake with', b: 'ice' },
      { a: 'Strain to', b: 'chilled', c: 'coupe' },
      {
        note: 'Optional garnish with',
        garnish: 'brandied cherry & lime',
        amt: '',
        units: 'twist',
      },
    ],
  },
  {
    name: 'Vieux Carré',
    ingredientList: [
      'rye whiskey',
      'cognac',
      'sweet vermouth',
      'Bénédictine',
      'bitters',
      "Peychaud's Bitters",
    ],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'rw-bit-sv-bene-|-|-cog-peych' },
    ingredientAmounts: [
      { ingred: 'rw', amt: 1, units: 'oz' },
      { ingred: 'cog', amt: 1, units: 'oz' },
      { ingred: 'sv', amt: 1, units: 'oz' },
      { ingred: 'bene', amt: 0.25, units: 'oz' },
      { ingred: 'bit', amt: 1, units: 'dash' },
      { ingred: 'peych', amt: 1, units: 'dash' },
    ],
    directions: [
      { a: 'Stir with', b: 'ice' },
      { a: 'Strain to', b: 'chilled', c: 'rocks glass' },
      {
        note: 'Garnish with',
        garnish: 'lemon',
        amt: '',
        units: 'twist',
      },
    ],
  },
  {
    name: 'Moscow Mule',
    ingredientList: ['vodka', 'ginger beer', 'lime juice'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'vod-|-|-|-|-limj-gngrbr' },
  },
  {
    name: 'Mojito',
    IBA: 'Contemporary Classic',
    ingredientList: ['rum', 'lime juice', 'simple syrup', 'soda water', 'mint'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'rum-|-ss-|-|-limj-soda-mint' },
  },
  {
    name: 'Daiquiri',
    IBA: '?',
    ingredientList: ['rum', 'lime juice', 'simple syrup'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'rum-|-ss-|-|-limj' },
  },
  {
    name: 'Mint Julep',
    IBA: 'Contemporary Classic',
    ingredientList: ['bourbon whiskey', 'simple syrup', 'mint'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'rw-|-ss-|-|-|-mint' },
  },
  {
    name: 'Margarita',
    IBA: 'Contemporary Classic',
    ingredientList: ['tequila', 'triple sec', 'lime juice'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'teq-|-|-|-tripsc-limj' },
  },
  {
    name: 'Paloma',
    ingredientList: ['tequila', 'grapefruit juice', 'soda'],
    ingStrs: { 'sprt-bit-swe-hl-fl-cord-misc': 'teq-|-|-|-|-gj-|-soda' },
  },
]

A.root = {}

// Yes (part 1) (part 2 will be conversion to name, children tree)
// var orderKey = 'sprt-bit-swe'
var orderKey = 'sprt-bit-swe-hl-fl-cord-misc'
A.drnkNmIngr.forEach(d => {
  var pathArr = d.ingStrs[orderKey].split('-')
  pathArr.push('drnk')
  var pathStr = pathArr.join('.')
  _.set(A.root, pathStr, d.name)
})

// part 2
var convertObjToNameChildrenTree = function(tree) {
  // testClone = convertObjToNameChildrenTree(testObj)
  var clone = { name: '', children: [] }
  var walk = function(obj, path, clonepath) {
    path = path || ''
    for (var key in obj) {
      // Make an item with a name of this key; will push to clone later
      var child = { name: key, children: [] }

      // Add the key to the path; this will be the next path to walk
      var pathkey = [path, key].filter(x => x).join('.')

      // From the last clonepath, basically append 'children'
      // Accomodate first case via split/filter/push/join
      var clonepathkey = clonepath.split('.')
      clonepathkey = clonepathkey.filter(x => x)
      clonepathkey.push('children')
      clonepathkey = clonepathkey.join('.')

      var cloneChildArr = _.get(clone, clonepathkey)
      cloneChildArr.push(child)

      var childCount = cloneChildArr.length - 1
      clonepathkey += '.' + childCount

      if (typeof obj[key] === 'object') {
        walk(obj[key], pathkey, clonepathkey)
      } else if (key === 'drnk') {
        leafChild = { name: obj[key], children: [], class: 'leaf' }
        _.set(clone, clonepathkey, leafChild)
      } else {
        // leaf (assuming no arrays)
        // Do above once more, but don't walk again
        leafChild = { name: obj[key], children: [] }
        _.set(clone, clonepathkey + '.children', leafChild)
      }
    }
  }
  walk(tree, '', '')
  return clone
}

A.treeData2 = convertObjToNameChildrenTree(A.root)

var getLeaves = function(tree) {
  var leaves = []
  // var values = []
  var walk = function(obj, path) {
    path = path || ''
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' || obj[key] instanceof Array) {
          var pathkey = [path, key].filter(x => x).join('.')
          walk(obj[key], pathkey)
        } else {
          // leaf
          var pathkey = [path, key].filter(x => x).join('.')
          leaves.push(pathkey)
        }
      }
    }
  }
  walk(tree, '')
  return leaves
}

function compareListsLookup(list, listOfObjects) {
  var firstMatch = ''
  list = list.filter(x => x != '').sort()
  for (var j = 0; j < listOfObjects.length; j++) {
    var list2 = listOfObjects[j].ingredientList.sort()
    if (list.length === list2.length) {
      if (_.isEqual(list.sort(), list2.sort())) {
        firstMatch = listOfObjects[j].name
      }
    }
  }
  return firstMatch
}

function appendReductionToObjTreeLeaves(obj, depth) {
  leafPaths = getLeaves(obj)
  leafPaths = leafPaths.filter(p => p.split('.').length >= 2 * depth)
  for (var i = 0; i < leafPaths.length; i++) {
    // "0.children.0.children.0.children.0.name"
    // just get the numeric child indices, so split on '.children.'
    indices = leafPaths[i].split('.children.')
    var cummIdx = []
    var cummNames = []
    indices.forEach(idx => {
      idx = idx.split('.')[0] // if idx includes .name, just get the number part
      cummIdx.push(idx) // [0], then [0,2], then [0,2,0...]
      path = cummIdx.join('.children.')
      cummNames.push(_.get(obj, path + '.name'))
    })
    cummNames = cummNames.filter(x => x)
    _.set(obj, path + '.mix', cummNames.join(', '))

    var match = compareListsLookup(cummNames, A.drnkNmIngr)
    if (match.length > 1) {
      _.set(obj, path + '.children', [
        { name: match, children: [], class: 'match' },
      ])
      A.matchedNames.push(match)
    }
  }
}

function getIngredAmts(drnkName) {
  if (drnkName) {
    // if (drnkName === 'Paper Plane') debugger
    var arr = Object.values(A.drnkNmIngr).filter(x => x.name === drnkName)
    // console.log(arr)
    if (arr[0] && arr[0].ingredientAmounts) {
      var ingredArr = arr[0].ingredientAmounts.map(x => {
        return `${x.amt} ${x.units} ${A.lut[x.ingred]}`
      })

      var directionsArr = arr[0].directions.map(x => {
        return Object.values(x).join(' ')
      })

      var titleDiv = `<div class="title-light">${
        PROD ? A.lut[drnkName] || drnkName : drnkName
      }</div>`
      var ingredDiv = '<div class="ingredientAmounts">'
      ingredDiv += ingredArr.join('<br />')
      ingredDiv += '</div>'

      var directionsDiv = '<div class="directions">'
      directionsDiv += directionsArr.join('<br />')

      return titleDiv + ingredDiv + directionsDiv
    } else {
      var titleDiv = `<div class="title-light">${
        PROD ? A.lut[drnkName] || drnkName : drnkName
      }</div>`
      return titleDiv
    }
  }
}
