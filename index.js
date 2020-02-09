/*

git remote set-url origin https://goldenstateofmind@github.com/goldenstateofmind/abv.git

git config user.name "goldenstateofmind"; git config user.email "stateofgoldenmind@gmail.com"; git config github.user "goldenstateofmind"

*/

appendReductionToObjTreeLeaves([A.treeData2], 6)

var i = 0,
  duration = 750,
  // duration = 0,
  root,
  nodes,
  node,
  links,
  link

var nodeEnter, linkUpdate, linkEnter, linkExit

// set the dimensions and margins of the diagram
var margin = { top: 20, right: 90, bottom: 90, left: 20 },
  width = 2000 - margin.left - margin.right,
  height = 2000 - margin.top - margin.bottom

// declares a tree layout and assigns the size
// var d3tree = d3.tree().size([width, height])
var d3tree = d3.tree().size([height, width])

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svgG = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

treeLink = d3
  .linkVertical()
  .x(d => d.x)
  .y(d => d.y)

//  assigns the data to a hierarchy using parent-child relationships
var rootIsD3hierarchy = d3.hierarchy(A.treeData2, d => d.children)
rootIsD3hierarchy.x0 = height / 2
rootIsD3hierarchy.y0 = 0

// rootIsD3hierarchy.children.forEach(collapse)

// Collapse after the second level
// rootIsD3hierarchy.children.forEach(collapse)

update(rootIsD3hierarchy)

var rootNode
function update(sourceHierarchy) {
  rootNode = d3tree(rootIsD3hierarchy)

  var nodes = rootNode.descendants()
  var links = rootNode.descendants().slice(1)

  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * 180
  })

  // ****************** Nodes section ***************************

  // Update the nodes...
  // var node = g.selectAll('g.node').data(rootNode.descendants(), function(d) {
  node = svgG.selectAll('g.node').data(nodes, function(d) {
    return d.id || (d.id = ++i)
  })

  // Enter any new modes at the parent's previous position.
  nodeEnter = node
    .enter()
    .append('g')
    .attr('id', (d, di) => 'g-' + di)
    .attr('class', 'node')
    .attr('class', d => {
      var classes = ['node']
      if (d.data.class) {
        classes.push(d.data.class)
      }
      if (d.data.name) {
        classes.push(d.data.name)
      }
      return classes.join(' ')
    })
    .attr('transform', function(d) {
      return 'translate(' + sourceHierarchy.y0 + ',' + sourceHierarchy.x0 + ')'
    })
    .on('click', click)

  // Add Circle for the nodes
  nodeEnter
    .append('circle')
    .attr('class', 'node')
    .attr('class', d => {
      var classes = ['node']
      if (d._children) {
        classes.push('has-children')
      } else {
        classes.push('hasnt')
      }
      if (d.data.class) {
        classes.push(d.data.class)
      } else {
        classes.push('unmatched')
      }
      return classes.join(' ')
    })
    .attr('r', 1e-6)

  nodeEnter
    .append('foreignObject')
    .attr('class', d => {
      var classes = ['svg-fo-label']
      if (d.data.class) {
        classes.push(d.data.class)
      }
      return classes.join(' ')
    })
    .attr('x', d => {
      if (d.children) {
        // return -50
        return 10
      }
      return 10
    })
    .attr('y', d => (d.children ? -22 : -10))
    .attr('width', 120)
    .attr('height', 20)
    .append('xhtml:div')
    .attr('class', 'node-text')
    .html(d => {
      if (d.data.name != '|') {
        if (PROD) {
          return A.lut[d.data.name] || d.data.name || ''
        }
        return d.data.name || ''
      }
      return ''
    })

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node)

  // Transition to the proper position for the node
  nodeUpdate
    .transition()
    .duration(duration)
    .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')

  // Update the node attributes and style
  nodeUpdate
    .select('circle.node')
    .attr('r', 5)
    .attr('cursor', 'pointer')
    .attr('class', d => {
      var classes = ['node']
      if (d._children) {
        classes.push('has-children')
      } else {
        classes.push('hasnt')
      }
      if (d.data.class) {
        classes.push(d.data.class)
      } else {
        classes.push('unmatched')
      }
      if (d.data.name === '') {
        classes.push('no-name')
      }
      return classes.join(' ')
    })

  // Remove any exiting nodes
  var nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr('transform', function(d) {
      return 'translate(' + sourceHierarchy.y + ',' + sourceHierarchy.x + ')'
    })
    .remove()

  // On exit reduce the node circles size to 0
  nodeExit.select('circle').attr('r', 1e-6)

  // On exit reduce the opacity of text labels
  nodeExit.select('text').style('fill-opacity', 1e-6)

  // ****************** links section ***************************

  // Update the links...
  link = svgG.selectAll('path.link').data(links, d => d.id)

  // Enter any new links at the parent's previous position.
  linkEnter = link
    .enter()
    .insert('path', 'g')
    .attr('class', 'link')
    .attr('d', function(d) {
      var o = { x: sourceHierarchy.x0, y: sourceHierarchy.y0 }
      return diagonal(o, o)
    })

  // UPDATE
  linkUpdate = linkEnter.merge(link)

  // Transition back to the parent element position
  linkUpdate
    .transition()
    .duration(duration)
    .attr('d', d => diagonal(d, d.parent))
    .end()
    .then(() => {
      clonePaths()
      processTextlessNodes()
      offsetAndNarrowPaths()
      drawCrossBranches()
    })

  // Remove any exiting links
  linkExit = link
    .exit()
    .transition()
    .on('end', offsetAndNarrowPaths)
    .duration(duration)
    // .attr('d', treeLink)
    .attr('d', function(d) {
      var o = { x: sourceHierarchy.x, y: sourceHierarchy.y }
      return diagonal(o, o)
    })
    .remove()

  // Store the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  var nodesSelection = d3.selectAll('node')
  var circles = d3.selectAll('circle.match')
  // nodeUpdate
  // nodeEnter
  circles.classed('highlight', function(d) {
    var filtered = nodesSelection.filter(e => d.ancestors().indexOf(e) > -1)
    filtered.selectAll('g.node, .node-text, circle').classed('highlight', true)

    // d3.selectAll('path').classed('highlight', function(link_d) {
    d3.selectAll('g.node, path').classed('highlight', function(link_d) {
      if (d3.select(this).classed('highlight')) {
        return true
      }
      var srcIdx = d.ancestors().indexOf(link_d.parent)
      var tarIdx = d.ancestors().indexOf(link_d)

      if (srcIdx > -1 && tarIdx > -1) {
        return true
      }
    })
    return true
  })

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {
    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // not here offsetAndNarrowPaths()
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children
    d.children = null
  } else {
    d.children = d._children
    d._children = null
  }
  update(d)
}

// ****************** jmk section ***************************

// First set the parent object in each data object:
function collapse(d) {
  if (d.children) {
    d._children = d.children
    //set the parent object in all the children
    d._children.forEach(function(d1) {
      d1.parent = d
      collapse(d1)
    })
    d.children = null
  }
}

// yes
var textParents = d3
  .selectAll('text')
  .nodes()
  .filter(x => d3.select(x).text() === 'mali')
  .forEach(dp => {
    console.log(dp)
    console.log(d3.select(dp).datum().data)
    d3.select(dp).attr('stroke', 'red')
  })

function clonePaths() {
  var labelParents = d3
    .selectAll('foreignObject.svg-fo-label:not(.leaf)')
    .nodes()

  var uniqueLabelValues = labelParents.map(
    x => x.querySelector('div.node-text').innerText
  )
  uniqueLabelValues = uniqueLabelValues.filter(x => {
    if (x != '|' && x != '') return true
    return false
  })
  uniqueLabelValues = [...new Set(uniqueLabelValues)]

  uniqueLabelValues.forEach(x => {
    classifyPathsBelowX(x)
  })
}

function processTextlessNodes() {
  var allGNodes = d3.selectAll('g.node').nodes()

  var matchingGNodes = allGNodes.filter(y => {
    // return those which don't have node-text
    return y.querySelector('div.node-text').innerText === ''
  })

  matchingGNodes.forEach(g => {
    d3.select(g)
      .selectAll('circle')
      .classed('textless', true)
  })
}

function classifyPathsBelowX(x) {
  // Select all the elements which match
  var matchingTextNodes = d3
    .selectAll('foreignObject.svg-fo-label:not(.leaf)')
    .nodes()

  matchingTextNodes = matchingTextNodes.filter(y => {
    var innerText = y.querySelector('div.node-text').innerText
    // console.log(y, innerText)
    return x === innerText
  })

  var nodesSelection = d3.selectAll('.node') // 146

  d3.selectAll(matchingTextNodes).attr('test', function(d) {
    // select _all_ paths, class them based on their link
    d3.selectAll('path').classed('ing-link', function(link_d) {
      if (
        d.descendants().includes(link_d) &&
        d.descendants().includes(link_d.parent)
      ) {
        // add a clone stroke
        // var clone = this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling)
        // console.log('CLONING this', this)
        var clone = this.parentNode.insertBefore(this.cloneNode(true), this)
        // ":first-child")
        // PROD ? A.lut[d.data.name] : d.data.name
        clone.classList.add(A.revlut[x])
        // clone.setAttribute('data-ingred', A.revlut[x])
        clone.dataset['ingred'] = A.revlut[x] || 'none'
        this.classList.add('was-cloned')
        return true
      }
      return false
    })
  })
}

function createControls() {
  d3.select('body')
    .append('div')
    .attr('id', 'text-opacity-slider-container')
    .append('input')
    .attr('id', 'text-opacity-slider')
    .attr('type', 'range')
    .attr('min', 0.0)
    .attr('max', 1.0)
    .attr('step', 0.1)
    .on('input', function() {
      document.querySelectorAll('.node-text').forEach(x => {
        x.style.opacity = +this.value
      })
    })
}
createControls()

function createLegend() {
  // get the items, colors, types
  // create the elements and push to container

  var legendItems = d3
    .select('#legend')
    .selectAll('.legend-item')
    .data(Object.entries(A.ingrds))
    .enter()
    .append('div')
    .attr('class', 'legend-item-wrapper')
  // .append('div')
  // .attr('class', 'legend-item flex-center-both')

  legendItems
    .append('div')
    .attr('class', 'legend-swatch')
    .style('background', d => d[1].color)

  legendItems
    .append('div')
    .attr('class', 'legend-text')
    .html(d => {
      var name = d[0]
      return PROD ? A.lut[name] : name
    })
}

createLegend()

function snapPx(commaSpaceString) {
  var a = commaSpaceString.replace(/\s\s+/g, ' ') // replace multiple whitespace with one
  a = a.replace(/,\s/g, ',') // replace comma space with comma
  b = a.split(' ')
  c = b.map(x => x.split(','))
  d = c.map(x => {
    // each element of c is itself an array, sometimes of 1 element ["90"], sometimes more ["90","4"]
    x = x.map(y => (isFinite(y) ? Math.round(y) : y))
    return x
  })

  // re-join back together
  e = d.map(x => x.join(','))
  f = e.join(' ')
  return f
}

function offsetAndNarrowPaths() {
  console.log('offsetAndNarrowPaths')
  var yShift = 8

  var sortOrder = [
    'gn',
    'rum',
    'rw',
    'teq',
    'vod',
    //
    'amar',
    'bit',
    //
    'ss',
    'sv',
    'cocchi',
    //
    'gc',
    'bene',
    //
    'mali',
    'tripsc',
    //
    'lemj',
    'limj',
    //
    'soda',
    'cog',
    'cog/brand',
    'abs',
    'peych',
    'undefined',
  ]

  // For all the paths, create a dict keyed on path coords (beginning & end? Or full path?)
  var dict = {}
  // document.querySelectorAll('path.was-cloned').forEach(x => x.remove())

  document.querySelectorAll('path').forEach(x => {
    var raw = x.getAttribute('d')
    var snapped = snapPx(raw)
    x.setAttribute('d', snapped)
    var idx = snapped.replace(/[\W_]+/g, '_') // replace spaces, commas with _
    if (!dict[idx]) dict[idx] = 0
    dict[idx] += 1
    x.dataset['path_coords'] = idx
  })

  document.querySelectorAll('path').forEach(x => (x.style.strokeWidth = 8))
  // document.querySelectorAll('path').forEach(x => (x.style.opacity = 0.7))

  var computedStyle
  document.querySelectorAll('path').forEach(x => {
    computedStyle = window.getComputedStyle(x)

    if (computedStyle.getPropertyValue('stroke') === 'rgb(0, 255, 0)') {
      x.remove()
    }
    if (computedStyle.getPropertyValue('stroke') === 'rgb(238, 238, 238)') {
      x.remove()
    }
  })

  Object.keys(dict).forEach(x => {
    var elArr = [...document.querySelectorAll(`[data-path_coords="${x}"]`)]
    elArr = elArr.filter(x => x)

    elArr.sort((a, b) => {
      var aIngred = a.dataset.ingred
      var bIngred = b.dataset.ingred
      return sortOrder.indexOf(aIngred) - sortOrder.indexOf(bIngred)
    })

    elArr.forEach((x, xi) => {
      x.style.transform = `translate(0, ${xi * yShift}px)`
    })
  })
}

// Keep below

function diagonalYX(s, d) {
  path = `M ${s.y} ${s.x}
          C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`

  return path
}

function diagonalXY(s, d) {
  path = `M ${s.x} ${s.y}
          C ${(s.x + d.x) / 2} ${s.y},
            ${(s.x + d.x) / 2} ${d.y},
            ${d.x} ${d.y}`

  return path
}

function getCirclePosition(element) {
  var svg = element.ownerSVGElement

  // Get the cx and cy coordinates
  var pt = svg.createSVGPoint()
  pt.x = element.cx.baseVal.value
  pt.y = element.cy.baseVal.value

  while (true) {
    // Get this elements transform
    var transform = element.transform.baseVal.consolidate()
    // If it has a transform, then apply it to our point
    if (transform) {
      var matrix = element.transform.baseVal.consolidate().matrix
      pt = pt.matrixTransform(matrix)
    }
    // If this element's parent is the root SVG element, then stop
    if (element.parentNode == svg) break
    // Otherwise step up to the parent element and repeat the process
    element = element.parentNode
  }
  return pt
}

function drawCrossBranches() {
  var d3parentGroup = d3.select('svg')

  var crossClasses = ['cog', 'abs']
  crossClasses.forEach(crossClass => {
    var classNodes = [
      ...document.querySelectorAll(`.node.${crossClass} circle`),
    ]
    var firstNode = classNodes.shift()
    var pos1 = getCirclePosition(firstNode)

    classNodes.forEach(x => {
      var pos2 = getCirclePosition(x)

      d3parentGroup
        .append('path')
        .attr('class', `link ${crossClass}`)
        .attr('d', diagonalXY(pos1, pos2))
        .lower()
    })
  })
}
