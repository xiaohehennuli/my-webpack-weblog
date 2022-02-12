/*
 * @Description: **项目路由文件**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-1-29 17:08:00
 */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../views/HomePage"


const Routers = () => (
    <Router>
        <Routes>
            <Route index element={<HomePage />}></Route>
        </Routes>
    </Router>
)

export default Routers