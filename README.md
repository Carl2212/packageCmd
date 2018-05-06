## 目录说明
	├ root
	│  └ auth                           --登录服务和组件
	│ │
	│  └ core                           --核心模块
	│  │  └ components                  --重用组件
	│  │  │  │
	│  │  │  └ avatar                   --头像组件
	│  │  │  └ warning                  --提示组件
	│  │  │  
	│  │  └ directives                  --重用指令  
	│  │  │  └ menu                     --菜单按钮
	│  │  │    
	│  │  └ providers                   --核心服务  
	│  │  │  └ des                      --加密解密
	│  │  │  └ http.interceptor         --请求拦截
	│  │  │  └ loading                  --加载图标
	│  │  │  └ nav                      --布局根页
	│  │  │  └ toast           		   --消息提示
	│  │  │  └ translate                --语言翻译
	│  │  │  └ multiTranslateHttpLoader --翻译多文件loader
	│  │  │    
	│  │  └ core.module.ts              --核心模块入口
	│  │  └ core.store.ts               --核心服务缓存
	│  │  │
	│  │  └ desktop                     --三栏式组件
	│  │  └ welcome                     --欢迎组件
	│  │  └ settings                    --设置组件


## 使用说明
#### Auth组件引入设置

	AuthModule.forRoot({
	  logoUrl: 'assets/icon/defect.svg', //应用图标
	  twoUrl: 'assets/imgs/itwo.svg',
	  appName: 'common.defectMgnt'//应用名称翻译字段
	})
	
#### Auth登录成功操作
1 - 未填写server状态  
2 - 未登录状态  
3 - 已成功登录并选择组织

	
	this.authService.stateChange
	  .subscribe((state: number) => {
	    let options = { animate: false };
	    if(state === 3) {
	      // success ...
	    }
	  });

#### Desktop三栏设置

	this.root.popToRoot(options);
	this.root.push(Desktop, {
	  left: LeftPage,
	  content: MiddlePage,
	  right: RightPage
	}, options);

#### CoreStore使用
永久性数据存取方式由应用一方自定义   
CoreStore只保持在应用运行中的时段   
对CoreStore的成员执行存储操作时可自行定义应用的数据存储操作 
  
	this.store.onChange.subscribe(data => {
	  this.storage.set(data.name, data.value);
	});
	
可在应用启动时一次性加载永久性数据进CoreStore以缓解异步带来的回调影响

#### 消除应用启动时app.component组件的NavView加载白屏

	this.root.viewDidEnter.subscribe(data => {
	  this.splashScreen.hide();
	});

#### 配置welcome

	WelcomeModule.forRoot([
	  { topImg : 'assets/img/itwo.svg',
	    appName : 'common.appName',
	    title : 'welcome.screen1.title',
	    description : 'welcome.screen1.description' ,
	    isGetStartBtn : false ,
	    bottomImg : 'assets/imgs/logo.png'
	  },
	  { topImg : 'assets/img/title2.png' ,
	    title : 'welcome.screen2.title',
	    description : 'welcome.screen2.description',
	    isGetStartBtn : false
	  },
	  { topImg : 'assets/img/title3.png' ,
	    title : 'welcome.screen3.title',
	    description : 'welcome.screen3.description',
	    isGetStartBtn : false
	  },
	  { topImg : 'assets/img/title4.png' ,
	    title : 'welcome.screen4.title',
	    description : 'welcome.screen4.description',
	    isGetStartBtn : true ,
	    startBtnText : 'welcome.started'
	  },
	  ...//需要配置多少页面 设置多少项
	]),
	
**welcome颜色配置**  

	$welcome_bg: map_get($colors , white);
	$welcome_color: map_get($colors , dark);
	$welcome_title_color : map_get($colors , primary);
	$swiper-pagination-bullet-active-bg :map_get($colors , primary);

YTWO 需要配置以上值

#### 配置Setting
	export const AboutInfo :aboutInfo= {
	    appName :"app.defectMgnt",
	    appLogo : "app.itwo",
		logoUrl : 'assets/img/progress.svg',
	    company : "RIB Software SE",
	    version : "1.0.0",
	    copyright : "©️2017 RIB Software SE",
	    website : "mobility@ribitwo.com"
	}
	
	export const languages :Array<languagesStruct>= [
	    {lang : 'en' , culture : 'en-gb' },
	    {lang : 'zh' , culture : 'zh-cn'},
	    {lang : 'de' , culture : 'de-de' }
	]
	SettingsModule.forRoot({
	   about : AboutInfo,//可不传 默认值如上 一般传version
	   language : languages,//可不传 默认值如上
	   dynamicComponent : ClearCache//setting list 可增加的子组件项，渲染到ion-list的最后一项后面,无需增加子项 可不传；
	});

#### 配置翻译
一般对于lib的翻译通用的会写在lib/assets里面。差异化的翻译以配置参数形式forRoot传入  

**复制lib/assets的翻译文件**
 
在package.json

	  "config": {
	    "ionic_copy": "./config/copy.config.js"
	  },
	  
在copy.config.js 新增该项  

	copyi18n: {
	    src: ['{{SRC}}/lib/assets/i18n/*'],//{{ROOT}}/node_modules/mobility-lib/assets/i18n/*
	    dest: '{{WWW}}/lib/assets/i18n'
	},

配置loader  

	TranslateModule.forRoot({
	  loader: {
	    provide: TranslateLoader,
	    useFactory: TRANSLATIONS,
	    deps: [HttpClient]
	  }
	}),
	export function TRANSLATIONS(http: HttpClient){
	  return new MultiTranslateHttpLoader(http, [
	      {prefix : '/assets/i18n/', suffix : '.json'},
	      {prefix : '/lib/assets/i18n/', suffix : '.json'},
	      ]
	  );
	}

对于不同文件json 相同key值会覆盖 即/lib/assets/i18n/en.json common值 会覆盖 /assets/i18n/ common值。需要注意

#### 兼容iphoneX
1. 加入cordova-webview插件： cordova-plugin-ionic-webview
2. 重新安装mobility-lib 升级到1.0.2
3. 移除之前statusbar的设置：
	this.statusBar.overlaysWebView(true);
	this.statusBar.backgroundColorByName('black');
	或者改为false
4. 此时的mobility-lib已经做了兼容。根据mobility里面的core/lib.global.scss 去做自己项目的兼容
加上 disable-env-top disable-env-left disable-env-right disable-env-all 去掉ionic帮我们适配的非页面最顶部的一些toolbar的safe-area
或者加上需要的safe-area enable-env-top enable-env-left enable-env-right enable-env-all

目前针对大部分项目 只做了部分组件的设配   
disable-env-top 和 enable-env-top 对在其下面的全部子元素ion-nav生效  
disable-env-all ，enable-env-all ，enable-env-left，disable-env-right ， disable-env-left，enable-env-right 对在其下面全部子元素ion-nav，ion-item生效

example:

	<ion-item class="disable-env-all"></ion-item> 生效
	<ion-content class="disable-env-all">
	    <ion-item></ion-item> 生效
	    <ion-item></ion-item> 生效
	</ion-content>

暂时没有做footer，tab的特殊兼容，后续需要再补充。


**In order to have full iPhoneX support you need the following:**

1. Update this plugin: cordova-plugin-statusbar. [CB-13273: fix statusbar spacing with new iphoneX #85](https://github.com/apache/cordova-plugin-statusbar/pull/85)

2. Install this plugin: cordova-plugin-ionic-webview.

3. Set viewport-fit=cover on the viewport <meta> tag, the white bars in UIWebView then disappear, i.e.:
	```
	<meta name="viewport" content="initial-scale=1, width=device-width, height=device-height, viewport-fit=cover">
	```
4. The solution to remove the black areas (provided by @dpogue in a comment below) is to use LaunchStoryboard images with cordova-plugin-splashscreen to replace the legacy launch images, used by Cordova by default. To do so, add the following to the iOS platform in config.xml:  
	```
	<splash src="resources/ios/splash/Default@2x~universal~anyany.png" />
	```  
	 
[More detail](https://stackoverflow.com/questions/46232812/cordova-app-not-displaying-correctly-on-iphone-x-simulator/46232813#46232813)

