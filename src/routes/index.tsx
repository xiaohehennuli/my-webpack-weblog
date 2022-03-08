/*
 * @Description: **博客路由文件**
 * @Author: heshuaishuai
 * @Date: 2022-1-19 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import { Suspense } from "react"

import router, { RouterData } from "./router"
import Navigator from "../components/Navigator/Navigator"

const Router = () => {
  const mapRouter = (routes: RouterData[]) =>
    routes.map((item, idx) =>
      item.path ? (
        <Route path={item.path} element={item.component} key={idx}>
          {
            /* 如果有子路由 , 递归渲染 */
            item.children && mapRouter(item.children)
          }
        </Route>
      ) : (
        <Route
          path={item.from}
          element={<Navigate to={item.to || "/home"} />}
          key={idx}
        ></Route>
      )
    )
  return (
    // 暂时用hash模式，否则二级路由页面刷新会有问题
    <HashRouter>
      <Navigator></Navigator>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>{mapRouter(router)}</Routes>
      </Suspense>
    </HashRouter>
  )
}

export default Router
