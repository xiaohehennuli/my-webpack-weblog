/*
 * @Description: **博客主页面**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */
import { DatePicker } from "antd";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <HomePageHeader></HomePageHeader>
      <HomePageContainer></HomePageContainer>
      <DatePicker></DatePicker>
    </div>
  );
};

const HomePageHeader = () => {
  return <div>HomePageHeader</div>;
};

const HomePageContainer = () => {
  return <div>HomePageContainer</div>;
};

export default HomePage;
