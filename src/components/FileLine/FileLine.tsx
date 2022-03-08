/*
 * @Description: **博客归档时间线组件**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import { Timeline, Pagination } from "antd"
import { useEffect, useState } from "react"
import { ArticleItem } from "../Article/Article"
import style from "../FileLine/FileLine.less"

const FileLine = () => {
  const [totalFileData, setTotalFileData] = useState<ArticleItem[]>([])
  const [fileData, setFileData] = useState<ArticleItem[]>([])
  const [total, setTotal] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(8)

  const pageChage = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }

  useEffect(() => {
    //TODO: 每次页面变化的时候切换展示的值
    const setData = totalFileData.slice(
      pageSize * (pageNumber - 1),
      pageSize * (pageNumber - 1) + pageSize
    )
    setFileData(setData)
  }, [pageNumber])

  useEffect(() => {
    const { articleList, total } = require("../../data/article.json")
    const setData = articleList.slice(0, pageSize)
    setTotalFileData(articleList)
    setFileData(setData)
    setTotal(total)
  }, [])

  const TimeList = ({ listData }: { listData: ArticleItem[] }) => {
    const li = listData.map((item) => {
      return (
        <Timeline.Item key={item.title}>
          <div className={style["line-wrap"]}>
            <a href={item.link} target="_blank">
              {item.title}
            </a>
            <span>{item.time}</span>
          </div>
        </Timeline.Item>
      )
    })
    return (
      <Timeline>
        <Timeline.Item>共计{total}篇文章</Timeline.Item>
        {li}
      </Timeline>
    )
  }

  return (
    <div className={style["file-line-wrap"]}>
      <TimeList listData={fileData}></TimeList>
      <Pagination
        size="small"
        current={pageNumber}
        pageSize={pageSize}
        total={total}
        onChange={(pageNumber) => pageChage(pageNumber)}
      />
    </div>
  )
}

export default FileLine
