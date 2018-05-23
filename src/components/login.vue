<template>
  <div class="login">
    <div class="loginBox">
      <div class="loginTitle">海象-业务风控管理系统</div>
      <div class="accNum">
        <span>账号 :</span>
        <el-input v-model="accNum" placeholder="请输入账号" class="accInp"></el-input>
      </div>
      <div class="pwd">
        <span>密码 :</span>
        <el-input v-model="pwd" placeholder="请输入密码" class="pwdInp"></el-input>
      </div>
      <div class="imgShow" v-if="ifshowImg">
        <el-input v-model="imgShowInp" placeholder="请输入图形验证码" class="imgShowInp"></el-input>
        <div class="imgShowImages" @click="getImgAgain"><img :src="imgSrc" alt=""></div>
      </div>
      <div class="remeberPwd">
        <el-checkbox v-model="remeberPwdSele" class='remeberPwdSele'>记住密码</el-checkbox>
      </div>
      <el-button type="success" class="okLogin" @click="oktoLogin"> 登 录 </el-button>

    </div>
  </div>
</template>


<script>
  export default{
    name:'login',
    data(){
      return {
        accNum:'',
        pwd:'',
        loginPwdYesNo:0,
        remeberPwdSele: true,
        isRefreshCode:0,
        captcha:'',
        ifshowImg:false,
        imgShowInp:'',
        imgSrc:''
      }
    },
    mounted(){


      if(this.remeberPwdSele &&  sessionStorage.getItem('accNum')!=null){
        this.accNum=sessionStorage.getItem('accNum')
        this.pwd=sessionStorage.getItem('pwd')
      }



    },
    methods: {
      getImgAgain(){

        this.imgSrc=staticUrl+'captcha.jpg?'+Math.random();


      },


      oktoLogin(){



        if(this.accNum==''){
          this.$notify({
            title: '请输入账号',
            type: 'warning',
            position: 'top-left'

          });
        }else if(this.pwd==''){

          this.$notify({
            title: '请输入密码',
            type: 'warning',
            position: 'top-left'

          });

        }else{//axios post请求

          var _this = this

          _this.$router.replace('/mainPage')

          // var params = new URLSearchParams();
          // params.append('username', this.accNum);
          // params.append('password', this.pwd);


          if(this.loginPwdYesNo==0){
            var loginJson={
              'username':this.accNum,
              'password':this.pwd,
              'captcha':'',
              'isRefreshCode':'0'
            }
          }else{
            var loginJson={
              'username':this.accNum,
              'password':this.pwd,
              'captcha':this.imgShowInp,
              'isRefreshCode':'1'
            }

          }

          // var loginJson={
          //   'username':this.accNum,
          //   'password':this.pwd,
          //   'captcha':'',
          //   'isRefreshCode':'0'
          // }





          this.axios({
            method:'post',
            url:staticUrl+'sys/login',
            params:loginJson
          })
            .then(function (response) {

              console.log(response);
              console.log(response.code);


              //登陆成功
              if(response.data.code==0){

                console.log(response.data.data.menuList);

                // sessionStorage.setItem('token',response.data.data.token)
                // sessionStorage.setItem('fullName',response.data.data.fullName)
                // sessionStorage.setItem('RoleName',response.data.data.roleList[0].roleName)
                // sessionStorage.setItem('roleHave',response.data.data.menuList)


                if(response.data.data.property=='超级管理员'){

                  sessionStorage.setItem('token',response.data.data.token)
                  sessionStorage.setItem('fullName','admin')
                  sessionStorage.setItem('RoleName',response.data.data.property)
                  sessionStorage.setItem('roleHave','1,2,3,4')
                  _this.$router.replace('/mainPage')

                }else{

                  sessionStorage.setItem('token',response.data.data.token)
                  sessionStorage.setItem('fullName',response.data.data.fullName)
                  sessionStorage.setItem('RoleName',response.data.data.roleList[0].roleName)
                  sessionStorage.setItem('roleHave',response.data.data.menuList)
                  _this.$router.replace('/mainPage')

                }







                if(_this.remeberPwdSele){

                  sessionStorage.setItem('accNum',_this.accNum)
                  sessionStorage.setItem('pwd',_this.pwd)
                  sessionStorage.setItem('loginFlag',true)


                }else{

                  sessionStorage.setItem('accNum','')
                  sessionStorage.setItem('pwd','')
                  sessionStorage.setItem('loginFlag',true)


                }





              }else{

              }



            })
            .catch(function (error) {
              console.log(error);
              console.log();
              if(error.response.data.code==1002){

                _this.loginPwdYesNo=1

                _this.$alert('请输入图形验证码', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {

                  }
                });

                _this.ifshowImg=true
                _this.imgSrc=staticUrl+'captcha.jpg'


              }else if(error.response.data.code==1){

                this.imgSrc=staticUrl+'captcha.jpg?'+Math.random();

              }else{
                _this.$alert(error.response.data.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // _this.$router.push('/')
                  }
                });
              }





            });

        }


      }
    },
    getShowImg(){
      var _this = this


      // this.imgSrc=
        this.axios({
          method:'post',
          url:staticUrl+'captcha.jpg',

        })
        .then(function (response) {

          console.log(response);
          console.log(response.code);


          //登陆成功
          if(response.data.code==0){



          }



        })
        .catch(function (error) {
          console.log(error);

        });
    }
  }
</script>


<style scoped>


  .login{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #ffffff;
    background-image: linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%);
  }

  .loginBox{
    width:500px;
    height: 450px;
    position: absolute;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    left: 40%;
    top: 30%;
    /* border-radius: 20px; */
    background: rgba(0, 0, 0,0.2);
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.4);
  }
  .loginTitle{
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    margin-top: 15px;
    color: #ffffff;
    font-weight: bold;
  }
  .accNum{
    width: 90%;
    height: 40px;
    position: relative;
    left: 5%;
    top: 50px;
  }
  .pwd{
    width: 90%;
    height: 40px;
    position: relative;
    left: 5%;
    top:80px;
  }
  .imgShow{
    width: 90%;
    height: 40px;
    position: relative;
    left: 5%;
    top: 100px;
  }
  .accNum span,.pwd span,.imgShow span{
    text-align: left;
    width: 50px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    line-height: 40px;
    font-size: 18px;
    color: #f5f5f5;

  }
  .accNum .accInp,.pwd .pwdInp,.imgShow .imgShowInp{
    width: 75%;
    font-size: 18px;
    position: absolute;
    left: 60px;



  }
  .imgShow .imgShowInp{
    width: 40%;
  }
  .imgShowImages{
    width: 30%;
    height: 100%;
    margin-left: 58%;
    border-radius: 5px;
  }

  .imgShowImages img{
    display: inline-block;
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
  .remeberPwd{
    width: 90%;
    height: 40px;
    color: #ffffff;
    position: relative;
    left: 18%;
    top: 120px;
    text-align: left;
  }
  .remeberPwdSele{
    position: relative;
    /*left: 5px;*/
    top: 0;
  }
  .okLogin{
    width: 400px;
    height: 50px;
    border-radius:30px;
    position: relative;
    /*left: 50px;*/
    top:130px;
    font-size: 20px;
  }


</style>
