import Mock, {Random} from 'mockjs'

console.log(Mock)

let homeGetData = Mock.mock({
  'banner_bg|3': [{
    'id|+1': 20210001,
    'img': Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
    'url': 'www.baidu.com'
  }],
  'banner_btn|4': [{
    icon: Random.image('100x100', '#FF6600', '#FFF', 'Mock.js'),
    url: '',
    'name|+1': ['制作证件照', '换底色', '自定义规格', '热门']
  }],
  search_tips: '搜索证件照名称、尺寸',
  "search_hotkeys": ["寸照", "考试", "资格", "证件", "一寸", "英语四六级别"],
  'goods|2-10': [{
    'id|+1': 20210001,
    'img|+1': Random.image('200x100', Random.hex(), '#FFF', 'Mock.js'),
    'title|+1': Random.word(3, 5),
    'desc': ['支持冲印', '尺寸：25x35mm']
  }]
})

let getHotKeys = Mock.mock({
  search_tips: '搜索证件照名称、尺寸',
  "search_hotkeys": ["寸照", "考试", "资格", "证件", "一寸", "英语四六级别"],
})

let searchGoods = Mock.mock({
  "ads": [{
		"img": Random.image('200x100', Random.rgb(), '#FFF', 'Mock.js'),
		"title": "热门分类对应广告",
		"desc": "现在下单享受85折",
		"stay_time":5,
		"url": "https://www.baidu.com"
	}],
	"goods": [{
		"id":"45f3d589",
		"img": Random.image('200x100', Random.rgb(), '#FFF', 'Mock.js'),
		"title": "公务员考试",
		"desc": ["支持冲印", "尺寸:25x35mm"]
	},{
		"id":"45f3d589ddd2",
		"img": Random.image('200x100', Random.rgb(), '#FFF', 'Mock.js'),
		"title": "公务员考试",
		"desc": ["支持冲印", "尺寸:25x35mm"]
	},{
		"id":"45f3d589ddd",
		"img": Random.image('200x100', Random.rgb(), '#FFF', 'Mock.js'),
		"title": "公务员考试",
		"desc": ["支持冲印", "尺寸:25x35mm"]
	}]
})

let getPhotoDetail = Mock.mock({
  "example_show": {
    img: Random.image('200x100', Random.hex(), '#FFF', 'Mock.js'),
    icon: Random.image('100x100', '#FF6600', '#FFF', 'Mock.js'),
    desc:  ["优先使用后置摄像头拍摄","站白墙（纯色）前，光充足均匀","头部居中，正对镜头","露出眉毛和耳朵，面部无遮挡"]
  },
  "title": "英语四六级考试",
	"desc": ["打印尺寸：25x35mm", "像素尺寸：295x413px", "文件大小：无要求","分辨率：300 dpi"],
	"bg_color":["#27ae60","#2196f3","#ff9800"]
})

let photoGetData = Mock.mock({
  "ads": [{
		"img": Random.image('200x100', Random.hex(), '#FFF', 'Mock.js'),
		"title": "热门分类对应广告",
		"desc": "现在下单享受85折",
		"stay_time":5,
		"url": "https://www.baidu.com"
	}],
  "search_tips": "搜索证件照名称、尺寸1111",
	"search_hotkeys": ["寸照", "考试", "职业资格", "证件类", "签证", "公务员", "其他"],
	"goods": [{
		"id":"45f3d589",
		"img": Random.image('200x100', Random.hex(), '#FFF', 'Mock.js'),
		"title": "公务员考试",
		"desc": ["支持冲印", "尺寸:25x35mm"]
	},{
		"id":"45f3d589ddd2",
		"img": Random.image('200x100', Random.hex(), '#FFF', 'Mock.js'),
		"title": "公务员考试",
		"desc": ["支持冲印", "尺寸:25x35mm"]
	},{
		"id":"45f3d589ddd",
		"img": Random.image('200x100', Random.hex(), '#FFF', 'Mock.js'),
		"title": "公务员考试",
		"desc": ["支持冲印", "尺寸:25x35mm"]
	}]
})

let jobCreate = Mock.mock({
  "preview":{
    "#27ae60": Random.image('200x100', '#27ae60', '#FFF', 'Mock.js'),
    "#2196f3": Random.image('200x100', '#2196f3', '#FFF', 'Mock.js'),
    "#ff9800": Random.image('200x100', '#ff9800', '#FFF', 'Mock.js')
  },
  price: 2.9,
  option_service: 0.9
})

const mockData = {
  homeGetData,
  getHotKeys,
  searchGoods,
  getPhotoDetail,
  jobCreate,
  photoGetData
}

export default mockData