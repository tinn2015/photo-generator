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
  'goods|3-10': [{
    'id|+1': 20210001,
    'img': Random.image('200x100', Random.rgb(), '#FFF', 'Mock.js'),
    'title|+1': Random.word(3, 5),
    'desc': ['支持冲印', '尺寸：25x35mm']
  }]
})

const mockData = {
  homeGetData
}

export default mockData