/*
 * @Description: **博客路由文件**
 * @Author: heshuaishuai
 * @Date: 2022-1-19 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("../views/HomePage")); //懒加载HomePage

const Routers = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<HomePage />}></Route>
      </Routes>
    </Suspense>
  </Router>
);

export default Routers;
