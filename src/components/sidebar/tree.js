import React, { useState, useEffect } from 'react'
import config from '../../../config'
import TreeNode from './treeNode'

export const calculateTreeData = (items, edges) => {
  const treeDataFromItem = (d) => {
    if (typeof d === 'string') {
      // if the items is a string, we need to find the corresponding edge
      const match = edges.find((edge) => edge.node.fields.slug === d)

      if (!match) throw new Error(`no matching markdown file found for tree entry ${d}`)
      return {
        url: d,
        title: match?.node.fields.title,
        description: match?.node.fields.description
      }
    }
    return {
      url: d.path,
      title: d.title,
      items: d.items?.map(treeDataFromItem)
    }
  }

  return items.map(treeDataFromItem)
}

const Tree = ({ items, edges }) => {
  const [treeData, setTreeData] = useState(calculateTreeData(items, edges))

  useEffect(() => {
    setTreeData(calculateTreeData(items, edges))
  }, [edges])

  const [collapsed, setCollapsed] = useState({})
  const toggle = (url) => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url]
    })
  }

  return (
    <>
      {treeData.map((item, i) => (
        <TreeNode
          key={i}
          className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
          collapsed={collapsed}
          setCollapsed={toggle}
          level={0}
          {...item}
        />
      ))}

    </>
  )
}
export default Tree
