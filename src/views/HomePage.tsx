/*
 * @Description: **博客主页面**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import { useEffect, useState, useRef, useMemo } from "react"
import { Button, Carousel } from "antd"
import ArticleList, { ArticleItem } from "../components/Article/Article"
import style from "../less/homePage.less"
import { utils } from "../base/utils"
import store from "../redux/store"

const HomePage = () => {
  const [articleList, setArticleList] = useState<ArticleItem[]>([])

  const [pageSize, setPageSize] = useState(10)

  const [pageNumber, setPageNumber] = useState(0)

  const [loading, setLoding] = useState(false)

  const [hasNext, setHasNext] = useState(true)

  const [total, setTotal] = useState(1)

  const [headerChageFlag, setHeaderChageFlag] = useState(false)

  const scrollEl = useRef<HTMLDivElement>(null)

  // 用useMemo包一层，防止子组件重复渲染
  const memoArticleList = useMemo(() => {
    return articleList
  }, [articleList])

  const memoLoading = useMemo(() => {
    return loading
  }, [loading])

  const MineMessageWarp = () => {
    return (
      <div className={style["message-warp"]}>
        <img className={style["avatar"]}></img>
        <p className={style["name-warp"]}>游戏王小何</p>
        <div className={style["label-and-artile-warp"]}>
          <div>
            <p>文章</p>
            <p>{total}</p>
          </div>
          <div>
            <p>标签</p>
            <p>4</p>
          </div>
        </div>
        <div className={style["add-button"]}>
          <Button block type="primary">
            加入书签
          </Button>
        </div>
        <div className={style["finde-warp"]}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  const LifeCarousel = () => {
    return (
      <div className={style["life-carousel-warp"]}>
        <Carousel dotPosition="right">
          <div className={style["img-box"]}></div>
          <div className={style["img-box"]}></div>
          <div className={style["img-box"]}></div>
          <div className={style["img-box"]}></div>
        </Carousel>
      </div>
    )
  }

  const getList = (pageSize: number, pageNumber: number) => {
    setLoding(true)
    //TODO: 处理数据模拟分页
    const data = require("../data/article.json")
    const _subData = data.articleList.slice(
      articleList.length,
      articleList.length + pageSize
    )
    const hasNext = _subData.length >= pageSize
    setLoding(false)
    return { articleList: _subData, total: data.total as number, hasNext }
  }

  const loadMore = utils.debounce((e: any) => {
    const { clientHeight, scrollTop, scrollHeight } = e.target
    if (scrollHeight - scrollTop <= clientHeight && !loading && hasNext) {
      setPageNumber(pageNumber + 1)
    }
  })

  const headerChangeBg = (e: any) => {
    const { scrollTop } = e.target
    const headerMenu = document.getElementById("header-menu")
    if (!headerChageFlag && scrollTop > 150 && headerMenu) {
      setHeaderChageFlag(true)
      headerMenu.style.setProperty("backGround", "white")
    }
    if (!headerChageFlag && scrollTop < 150 && headerMenu) {
      headerMenu.style.removeProperty("backGround")
    }
  }
  // 获取数据list
  /*
    useEffect 接受两个参数
    callback: 回调函数，第一次会默认执行一次，内部可以return一个回调函数，当卸载组件时执行
    arr: 监控变量的数组，如果不传入arr则默认监控全部的变量，
	  如果传入并且为空，则相当于生命周期的DidMount；
	  如果有值则当里面的值变化时会再执行callback，相当于update生命周期
  */
  // 此类获取数据的useEffect需要传一个pageSize，否则useEffect监听所有变量，会一直重复执行
  useEffect(() => {
    const {
      articleList: _articleList,
      total,
      hasNext,
    } = getList(pageSize, pageNumber)
    setArticleList([...articleList, ..._articleList])
    setTotal(total)
    setHasNext(hasNext)
  }, [loading, pageNumber])

  // 监听滚动事件

  // 这里用到了loading，
  useEffect(() => {
    const scrollDiv = scrollEl.current
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", loadMore)
      return () => {
        scrollDiv.removeEventListener("scroll", loadMore)
      }
    }
  }, [pageNumber])

  // 监听滚动条滑动，顶部header变色的逻辑，
  useEffect(() => {
    const scrollDiv = scrollEl.current
    if (scrollDiv) {
      const { scrollTop } = scrollDiv
      scrollDiv.addEventListener("scroll", headerChangeBg)
      return () => {
        console.log("清除顶部header监听事件")
        scrollDiv.removeEventListener("scroll", headerChangeBg)
      }
    }
  }, [])

  return (
    <div className={style["home-page"]} ref={scrollEl}>
      <section className={style["header"]}></section>
      <section className={style["container"]}>
        <div className={style["left-container"]}>
          <ArticleList
            articleData={memoArticleList}
            loading={memoLoading}
          ></ArticleList>
        </div>
        <div className={style["right-container"]}>
          <MineMessageWarp></MineMessageWarp>
          <LifeCarousel></LifeCarousel>
        </div>
      </section>
    </div>
  )
}

export default HomePage
