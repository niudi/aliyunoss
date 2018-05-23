<template>
  <div class="hello">
    <div class="top"></div>
    <div class="upLoad">
      <div class="file">上传图片

        <input type="file" ref="myfile1" :accept="typeArr" @change="upload($event)">
      </div>
      <img :src="imgServer" alt="" class="isImg">
    </div>


    <div class="upLoad2">
      <div class="file">上传图片

        <input type="file" ref="myfile" :accept="typeArr" @change="upload2($event)">
      </div>
      <img :src="imgServer2" alt="" class="isImg">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mainPage',
    props: ['typeArr', 'size'],
    data () {
      return {
        client: '',
        imgServer:'',
        imgServer2:'',
        fileSize: 5000000,
        client:''
      }
    },

    methods: {
      getRight(imgServer,thisFile){

        var _this = this


        var getService={
          serviceName:'wx-management'
        }


        this.axios({
          method:'post',
          url:'http://172.24.3.16/sts/gen',
          params:getService
        }).then(function (response) {

          console.log(response);

          var client = new OSS.Wrapper({
            region: 'wx-management',
            //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
            endpoint: 'oss-cn-beijing.aliyuncs.com',
            accessKeyId:response.data.accessKeyId ,
            accessKeySecret: response.data.accessKeySecret,
            stsToken: response.data.securityToken,
            bucket: "wx-management-test"
          });

          var timestamp = Date.parse(new Date());
          var fileName = "img"+timestamp

          console.log(thisFile)

          client.multipartUpload(fileName, thisFile).then(function (result) {
            console.log(result);
            imgServer='http://wx-management-test.oss-cn-beijing.aliyuncs.com/'+fileName
          }).catch(function (err) {
            console.log(err);
          });




        }).catch(function (error) {
          console.log(error);

        });




      },
      /**上传图片**/
      upload(event){
        var _this = this
        console.log(this.$refs.myfile1.files[0])
        this.getRight(this.imgServer,this.$refs.myfile1.files[0])






      },
      upload2(event){

        this.getRight(this.imgServer2,this.$refs.myfile1.files[0])






      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #cccccc;
  }
  .top{
    height: 200px;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    background-color: #cccccc;

  }

  .file {
    position: relative;
    left: .26rem;
    top: .2rem;
    display: inline-block;
    background: #32d582;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: white;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .isImg{
    width: 100px;
    height: 100px;
    display: inline-block;
    margin-top: 100px;
  }

</style>
