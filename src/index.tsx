/*
 * @Description: **博客入口**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import React from "react"
import ReactDOM from "react-dom"
import Routers from "./routes/index"
import { Provider } from "react-redux"
import store from "./redux/store"
import "./less/main.less"
import "antd/dist/antd.less"

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routers />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
)
