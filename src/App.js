import './App.css'
import { Input, Space, Image, Card } from 'antd';
import React, { useState } from 'react';
import { StarOutlined } from '@ant-design/icons';
import sun from './imgs/sun.png';
import cloud from './imgs/cloud.png';
import mist from './imgs/mist.png';
import rain from './imgs/rain.png';
import snow from './imgs/snow.png';
// import cryptoJs from 'crypto-js';
// sql城市编号数据库
//首先引入
const {connection} = require('./MySQL')

//连接数据库
connection.connect((err) => {
    if(err) {
        console.log("数据库连接失败");
    }
    console.log("数据库连接成功");
})


//一个简单的查询功能

//首先定义查询的SQL语句，这里的 useinfo为数据库表名，where为  where 条件判断语句
// LoginData.username  是前端传来的数据
//一个小注意点              
//'SELECT * FROM useinfo WHERE username = ' + username 写成这种不行   传入中文参数   mysql  中间件识别不了
// var find2 = "SELECT * FROM city_v93 WHERE username = '"+LoginData.username+"'";
var find2 = "SELECT * FROM city_v93"
 //执行sql语句
            connection.query(find2, function(err, result) {
                if (err) {   //链接失败 直接return;
                    console.log('[错误]' + err);
                    return;
                };

                if (result.length) {   //如果查到了数据
                	console.log('查到信息!')
                }
                else {
					console.log('未查到信息!');
				}
	        })




const { Search } = Input;
const cityId = 101100201;

async function weather() {
  const response = await fetch(`https://www.yiketianqi.com/free/week?unescape=1&appid=32989673&appsecret=QvNP449e&cityid=${cityId}`);
  var data = await response.json();
  console.log(data);
  document.querySelectorAll("li")[0].innerHTML = data.city
  document.querySelectorAll("li")[1].innerHTML = "日期：" + data.data[0].date
  document.querySelectorAll("li")[2].innerHTML = "最低温度: " + data.data[0].tem_night + "°C\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0最高温度: " + data.data[0].tem_day + "°C"
  document.querySelectorAll("li")[3].innerHTML = data.data[0].wea

  switch (data.data[0].wea_img) {
    case "yu":
      document.getElementsByClassName("ant-image-img")[0].src = rain
      break;
    case "qing":
      document.getElementsByClassName("ant-image-img")[0].src = sun
      break;
    case "yun":
      document.getElementsByClassName("ant-image-img")[0].src = cloud
      break;
    case "yin":
      document.getElementsByClassName("ant-image-img")[0].src = mist
      // console.log("yin")
      break;
    default:
      break;
  }

  for (var i = 0; i < 5; i++) {
    document.getElementsByClassName('ant-card-meta-title')[i].innerHTML = data.data[i + 1].wea
    document.getElementsByClassName('ant-card-meta-description')[i].innerHTML = data.data[i + 1].date
    if (data.data[i + 1].wea_img == "yu") {
      document.getElementsByClassName("ant-card-cover")[i].getElementsByTagName("img")[0].src = rain
      console.log("yu")
    }
    if (data.data[i + 1].wea_img == "yun") {
      document.getElementsByClassName("ant-card-cover")[i].getElementsByTagName("img")[0].src = cloud
    }
    if (data.data[i + 1].wea_img == "qing") {
      document.getElementsByClassName("ant-card-cover")[i].getElementsByTagName("img")[0].src = sun
    }
    if (data.data[i + 1].wea_img == "yin") {
      document.getElementsByClassName("ant-card-cover")[i].getElementsByTagName("img")[0].src = mist
    }
  }
  // document.getElementsByClassName("ant-card-cover")[2].getElementsByTagName("img")[2].src = cloud

  // document.getElementsByClassName("ant-card-cover")[0].getElementsByTagName("img")[0].src = rain
  console.log(document.getElementsByClassName("ant-card-cover")[2].getElementsByTagName("img")[0])

}
weather();
const onSearch = (value) => console.log(value);
const { Meta } = Card;

function App() {
  return (
    <div id='root'>
      <div id="search">
        <Space direction="vertical">
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
          <StarOutlined id='icon_like' style={{ fontSize: '32px' }} />
        </Space>
      </div>
      <div id="taday">
        <div id='weaImg'>
          <Image
            width={300}
            src=""
            fallback="data:image/png;base64,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"
          />
        </div>

        {/* 天气详细信息 */}
        <div id="weaText">
          <ul id='weaMas'>
            <li className='city'>地区</li>
            <li>时间</li>
            <li>温度</li>
            <li>其他信息</li>
          </ul>
        </div>
      </div>
      <div id="future">
        <Card
          hoverable
          style={{ width: 140 }}
          cover={<img alt="example" src="" />}
        >
          <Meta title="xxxxxxxx" description="www.instagram.com" />
        </Card>
        <Card
          hoverable
          style={{ width: 140 }}
          cover={<img alt="example" src={sun} />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
        <Card
          hoverable
          style={{ width: 140 }}
          cover={<img alt="example" src={sun} />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
        <Card
          hoverable
          style={{ width: 140 }}
          cover={<img alt="example" src={sun} />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
        <Card
          hoverable
          style={{ width: 140 }}
          cover={<img alt="example" src={sun} />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </div>
    </div>
  );
}

export default App;
