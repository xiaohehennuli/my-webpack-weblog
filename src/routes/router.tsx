import HomePage from "../views/HomePage"
import LifePage from "../views/LifePage"
import NotePage from "../views/NotePage"
import NotFound from "../views/NotFoundPage"
import LifeAnime1 from "../views/LifeAnime/LifeAnime1"
import LifeGame1 from "../views/LifeGame/LifeGame1"
import LifeNote1 from "../views/LifeNote/LifeNote1"
import FilePage from "../views/FilePage"
import TravelPage from "../views/TravelPage"
import DaliPage from "../views/TravelPlaceName/Dali"
import TaiguoPage from "../views/TravelPlaceName/Taiguo"
import PromiseNote from "../views/Note/PromiseNote"
import CssShadow from "../views/Note/CssShadow"
import ReactHook from "../views/Note/ReactHook"

export interface RouterData {
  path?: string
  children?: RouterData[]
  component?: any
  from?: string
  to?: string
}

//配置路由表
const routes: RouterData[] = [
  //这些是一级路由
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/file",
    component: <FilePage />,
  },
  {
    path: "/life",
    component: <LifePage />,
    children: [
      //这里面是life的二级路由
      {
        path: "/life/anime1",
        component: <LifeAnime1 />,
      },
      {
        path: "/life/game1",
        component: <LifeGame1 />,
      },
      {
        path: "/life/note1",
        component: <LifeNote1 />,
      },
      {
        path: "*",
        component: <NotFound />,
      },
    ],
  },
  {
    path: "/note",
    component: <NotePage />,
    children: [
      //这里面是/note的二级路由
      {
        path: "/note/js/promise",
        component: <PromiseNote />,
      },
      {
        path: "/note/css/shadow",
        component: <CssShadow />,
      },
      {
        path: "/note/react/hook",
        component: <ReactHook />,
      },
      {
        path: "*",
        component: <NotFound />,
      },
    ],
  },
  {
    path: "/travel",
    component: <TravelPage />,
    children: [
      //这里面是/News的二级路由
      {
        path: "/travel/dali",
        component: <DaliPage />,
      },
      {
        path: "/travel/taiguo",
        component: <TaiguoPage />,
      },
      {
        path: "*",
        component: <NotFound />,
      },
    ],
  },
  {
    from: "/",
    to: "/home",
  },
  {
    path: "*",
    component: <NotFound />,
  },
]

//导出路由表
export default routes
