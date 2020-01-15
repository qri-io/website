import React, { useState } from 'react'
import config from '../../../config'
import TreeNode from './treeNode'

const capitalize = (input) => {
  return input.replace(/-/g, ' ').toUpperCase()
}

/**
 * Sort array of objects based on another array
 */

const sortGroups = (tree, order) => {
  const { items } = tree.items[0]
  items.sort((a, b) => {
    const aLabel = a.label
    const bLabel = b.label
    const aIndex = order.indexOf(aLabel)
    const bIndex = order.indexOf(bLabel)

    // if not comparing two values not in the ordering array, sort alphabetically
    if (aIndex === -1 && bIndex === -1) return (aLabel > bLabel) ? 1 : -1
    // if one is not in the array, push it to the end
    if (aIndex === -1 || bIndex === -1) return (aIndex === -1) ? 1 : -1
    // otherwise, sort by key location
    return (aIndex > bIndex) ? 1 : -1
  })

  return tree
}

const sortEntries = (tree) => {
  tree.items[0].items.forEach(({ items }) => {
    items.sort((a, b) => {
      const aLabel = a.label
      const bLabel = b.label
      const aWeight = a.weight
      const bWeight = b.weight

      // if neither item has weight, sort alphabetically
      if (!aWeight && !bWeight) return (aLabel > bLabel) ? 1 : -1
      // if only one has weight, push it to the beginning
      if (!aWeight || !bWeight) return (bWeight) ? 1 : -1
      // sort by weight
      return (aWeight > bWeight) ? 1 : -1
    })
  })
  return tree
}

const calculateTreeData = edges => {
  const originalData = config.sidebar.ignoreIndex ? edges.filter(({ node: { fields: { slug } } }) => slug !== '/') : edges
  let tree = originalData.reduce((accu, { node: { fields: { slug, title, weight } } }) => {
    const parts = slug.split('/')
    let { items: prevItems } = accu
    for (const part of parts.slice(1, -1)) {
      let tmp = prevItems.find(({ label }) => label === part)
      if (tmp) {
        if (!tmp.items) {
          tmp.items = []
        }
      } else {
        // here we create title for top-level categories
        tmp = { label: part, items: [], title: capitalize(part) }
        prevItems.push(tmp)
      }
      prevItems = tmp.items
    }
    const existingItem = prevItems.find(({ label }) => label === parts[parts.length - 1])
    if (existingItem) {
      existingItem.url = slug
      existingItem.title = title
    } else {
      prevItems.push({
        label: parts[parts.length - 1],
        url: slug,
        items: [],
        weight,
        title
      })
    }
    return accu
  }, { items: [] })

  const { sidebar: { forcedNavOrder = [] } } = config

  // sort groups by order specified in config.sidebar.forcedNavOrder
  tree = sortGroups(tree, forcedNavOrder, 'label')
  // sort the entries within group based on weight frontmatter
  tree = sortEntries(tree)

  return tree
}

const Tree = ({ edges }) => {
  const [treeData] = useState(() => {
    return calculateTreeData(edges)
  })

  const defaultCollapsed = {}
  treeData.items.forEach(item => {
    if (config.sidebar.collapsedNav && config.sidebar.collapsedNav.includes(item.url)) {
      defaultCollapsed[item.url] = true
    } else {
      defaultCollapsed[item.url] = false
    }
  })
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const toggle = (url) => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url]
    })
  }
  return (
    <>
      {treeData.items[0].items.map((item, i) => (
        <TreeNode
          key={i}
          className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
          setCollapsed={toggle}
          collapsed={false}
          {...item}
        />
      ))}

    </>
  )
}

export default Tree
