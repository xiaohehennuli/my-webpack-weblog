/*
 * @Description: **博客主页面**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import { useEffect, useState, useRef, useMemo, memo } from 'react';
import { Button, Carousel } from 'antd';
import ArticleList, { ArticleItem } from '../components/Article/Article';
import { utils } from '../base/utils';
import { BG_IMGS,HOME_SWITCH_IMG } from '../base/common';
import avatar from "../assets/avatar.jpeg"
import style from '../less/homePage.less';

const HomePage = memo(() => {
  const [articleList, setArticleList] = useState<ArticleItem[]>([]);

  const [pageSize, setPageSize] = useState(10);

  const [pageNumber, setPageNumber] = useState(0);

  const [loading, setLoading] = useState(false);

  const [hasNext, setHasNext] = useState(true);

  const [total, setTotal] = useState(1);

  const [headerChangeFlag, setHeaderChangeFlag] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  const scrollEl = useRef<HTMLDivElement>(null);

  // 用useMemo包一层，防止子组件重复渲染
  const memoArticleList = useMemo(() => {
    return articleList;
  }, [articleList]);

  const memoLoading = useMemo(() => {
    return loading;
  }, [loading]);

  const getList = (pageSize: number, pageNumber: number) => {
    setLoading(true);
    //TODO: 处理数据模拟分页
    const data = require('../data/article.json');
    const _subData = data.articleList.slice(
      articleList.length,
      articleList.length + pageSize,
    );
    const hasNext = _subData.length >= pageSize;
    setLoading(false);
    return { articleList: _subData, total: data.total as number, hasNext };
  };

  const loadMore = utils.debounce((e: any) => {
    const { clientHeight, scrollTop, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight && !loading && hasNext) {
      setPageNumber(pageNumber + 1);
    }
  });

  const headerChangeBg = (e: any) => {
    const { scrollTop } = e.target;
    const headerMenu = document.getElementById('header-menu');
    if (!headerChangeFlag && scrollTop > 150 && headerMenu) {
      setHeaderChangeFlag(true);
      headerMenu.style.setProperty('backGround', 'white');
    }
    if (!headerChangeFlag && scrollTop < 150 && headerMenu) {
      headerMenu.style.removeProperty('backGround');
    }
  };
  // 设置顶部随机背景
  useEffect(() => {
    if (headerRef.current) {
      const bgIndex = Math.ceil(Math.random() * (BG_IMGS.length - 1));
      headerRef.current.style.backgroundImage = `url(${BG_IMGS[bgIndex]})`;
    }
  }, []);

  // 获取数据list
  useEffect(() => {
    const {
      articleList: _articleList,
      total,
      hasNext,
    } = getList(pageSize, pageNumber);
    setArticleList([...articleList, ..._articleList]);
    setTotal(total);
    setHasNext(hasNext);
  }, [loading, pageNumber]);

  // 监听滚动事件
  // 这里用到了loading，
  useEffect(() => {
    const scrollDiv = scrollEl.current;
    if (scrollDiv) {
      scrollDiv.addEventListener('scroll', loadMore);
      return () => {
        scrollDiv.removeEventListener('scroll', loadMore);
      };
    }
  }, [pageNumber]);

  // 监听滚动条滑动，顶部header变色的逻辑，
  useEffect(() => {
    const scrollDiv = scrollEl.current;
    if (scrollDiv) {
      scrollDiv.addEventListener('scroll', headerChangeBg);
      return () => {
        scrollDiv.removeEventListener('scroll', headerChangeBg);
      };
    }
  }, []);

  return (
    <div className={style['home-page']} ref={scrollEl}>
      <section className={style['header']} ref={headerRef}></section>
      <section className={style['container']}>
        <div className={style['left-container']}>
          <ArticleList
            articleData={memoArticleList}
            loading={memoLoading}
          ></ArticleList>
        </div>
        <div className={style['right-container']}>
          <div className={style['message-warp']}>
            <img className={style['avatar']} src={avatar}></img>
            <p className={style['name-warp']}>游戏王小何</p>
            <div className={style['label-and-article-warp']}>
              <div>
                <p>文章</p>
                <p>{total}</p>
              </div>
              <div>
                <p>标签</p>
                <p>4</p>
              </div>
            </div>
            <div className={style['add-button']}>
              <Button block type="primary">
                加入书签
              </Button>
            </div>
            <div className={style['find-warp']}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className={style['life-carousel-warp']}>
            <Carousel dotPosition="right" autoplay>
              {HOME_SWITCH_IMG.map(item =>
                <div className={style['img-box']}>
                  <img src={item.img} alt="" />
                  <p className={style['title']}>{item.title}</p>
                  <p className={style['desc']}>{item.desc}</p>
                </div>
              )}
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
});

export default HomePage;
