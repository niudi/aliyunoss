# rickcontrol

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


 aliyunoss/src/components/mainPage.vue
 
 需要引入 <script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
 
 阿里云的oss文件存储，配置了权限，不能直传，需要使用stsToken验证


 var client = new OSS.Wrapper({
 
          region: 'oss前半截',
          endpoint: '阿里云oss地址',
          accessKeyId:'阿里云提供的accessKeyId' ,
          accessKeySecret: ；'阿里云提供的accessKeySecret',
          stsToken: '阿里云提供的stsToken',
          bucket: "阿里云提供的bucket"
          
   });

        var fileName='img'+timestamp
          //'本地的文件'=this.files[0]

        client.multipartUpload('文件名（阿里云上存储的文件名）', '本地的文件').then(function (result) {
          console.log(result);
        

        }).catch(function (err) {
          console.log(err);
     });
