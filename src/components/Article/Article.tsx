/*
 * @Description: **文章组件**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import { Tag, Spin } from "antd"
import { useCallback } from "react"
import style from "./Article.less"

export type ArticleType =
  | "js"
  | "css"
  | "http"
  | "react"
  | "vue"
  | "webpack"
  | "life"
  | "music"

export interface ArticleItem {
  // 文章标签
  label: ArticleType[]
  // 文章标题
  title: string
  // 文章更新时间
  time: string
  // 文章链接
  link: string
  // 是否更新文章组件使用useMemo实现
}

interface ArticleProps {
  articleData: ArticleItem[]
  loading: boolean
}

const LoadingEmpatyContainer = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <div className={style["loading-wrap"]}>
      <Spin></Spin>
    </div>
  ) : (
    <div className={style["empty-wrap"]}>我也是有底线的～</div>
  )
}

const ArticleList = (props: ArticleProps) => {
  const goLink = useCallback((link: string) => {
    console.log(link)
  }, [])

  const { articleData, loading } = props
  return (
    <div className={style["article-container"]}>
      {articleData.map((item, index) => {
        return (
          <div
            className={style["article-item"]}
            onClick={() => goLink(item.link)}
            key={index}
          >
            <div className={style["article-title"]}>{item.title}</div>
            <div className={style["article-time"]}>{item.time}</div>
            <div className={style["article-label-content"]}>
              {item.label.map((l, index) => {
                return (
                  <Tag color="magenta" key={index}>
                    {l}
                  </Tag>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className={style["loading-status-wrap"]}>
        <LoadingEmpatyContainer loading={loading}></LoadingEmpatyContainer>
      </div>
    </div>
  )
}

export default ArticleList
