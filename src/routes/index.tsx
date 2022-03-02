/*
 * @Description: **博客路由文件**
 * @Author: heshuaishuai
 * @Date: 2022-1-19 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import Navigator from "../components/Navigator/Navigator"

const HomePage = lazy(() => import("../views/HomePage")) //懒加载HomePage
const FilePage = lazy(() => import("../views/FilePage"))
const LifePage = lazy(() => import("../views/LifePage"))
const NotePage = lazy(() => import("../views/NotePage"))
const TravelPage = lazy(() => import("../views/Travel"))

const Routers = () => (
  <Router>
    <Navigator></Navigator>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/file" element={<FilePage />}></Route>
        <Route path="/life" element={<LifePage />}></Route>
        <Route path="/note" element={<NotePage />}></Route>
        <Route path="/travel" element={<TravelPage />}></Route>
      </Routes>
    </Suspense>
  </Router>
)

export default Routers
