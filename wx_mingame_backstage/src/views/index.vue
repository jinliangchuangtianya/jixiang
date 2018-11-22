<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 100%;
        text-align: center;
    }
    .layout-nav h2{
        font-weight: normal;
        letter-spacing: 5px;
        color: white;
    }
    .layout-logo img{
        width: 100%;
        height: 100%;
    }
    .item{
        padding-left: 12px;
    }
    .user{
        position: absolute;
        right: 0;
        top: 0;
        color: white;
    }
    .user span{
        cursor: pointer;
        margin-left: 15px;
    }
    .user i{
        position: relative;
        top: -2px;
    }
    .ivu-layout-content{
        background: #fff;
        height: auto;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <div class="layout-logo">
                        <img src="../images/logo.png" alt="">
                    </div>
                    <div class="layout-nav">
                        <h2>小游戏后台管理系统</h2>
                        <div class="user" v-if="isLoding"><Icon type="ios-person-outline" size="22"/>创始人
                            <span @click="logout ">退出</span>
                        </div>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}" >
                    <Menu :active-name="activeName"
                          theme="light"
                          width="auto"
                          accordion
                          :open-names="['public']"
                          @on-select="selectHandler">
                        <Submenu name="public">
                            <template slot="title">
                                <Icon type="ios-game-controller-b" size="18" />
                                公众号游戏
                            </template>
                            <MenuItem name="publicset" :to="{path:'/'}">
                                <span class="item">游戏设置</span>
                            </MenuItem>
                            <MenuItem name="bannerset" :to="{path:'/bannerset'}">
                                <span class="item">轮播图设置</span>
                            </MenuItem>
                        </Submenu>
                        <Submenu name="applets">
                            <template slot="title">
                                <Icon type="md-game-controller-b" size="18" />
                                小程序游戏
                            </template>
                            <MenuItem name="appletsset" :to="{path:'/appletsset'}">
                                <span class="item">游戏设置</span>
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>{{breadcrumb.item1}}</BreadcrumbItem>
                        <BreadcrumbItem>{{breadcrumb.item2}}</BreadcrumbItem>
                    </Breadcrumb>
                    <router-view class="ivu-layout-content" :style="{padding: '24px'}"></router-view>

                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import {LogOut} from '../server'
    let breadcrumb = {
        'publicset' : {
            'item1' : '公众号游戏',
            'item2' : '游戏设置'
        },
        'bannerset' : {
            'item1' : '公众号游戏',
            'item2' : '轮播图设置'
        },
        'appletsset' : {
            'item1' : '小程序游戏',
            'item2' : '游戏设置'
        }
    }
    export default {
        data(){
            return {
                breadcrumb:{
                    'item1' : '公众号游戏',
                    'item2' : '设置'
                },
                isLoding : false,
                realname : '',
                activeName : ''
            }
        },
        methods : {
            selectHandler(name){
                this.breadcrumb = breadcrumb[name];
            },
            logout(){
              LogOut()
                  .then(res=>{
                      let{msg, status} = res.data;
                      if(status == 0){
                          this.$Notice.success({
                              title: '成功！',
                              desc : '退出成功！请重新登录',
                              duration : 3,
                              onClose:()=>{
                                  localStorage.clear();
                                  this.$router.push({
                                      path : '/login'
                                  })
                              }
                          });
                      }
                      else {
                          this.$Notice.error({
                              title : '错误',
                              desc : `${msg}`
                          })
                      }
                  })
            }
        },
        beforeRouteEnter(to, from, next){
            next(vm=>{
               vm.activeName = to.path.substring(1);
               vm.activeName = vm.activeName == '' ? 'publicset' : vm.activeName;
               let realname =  vm.$Util.$getStorage('realname');
               if(realname){
                   vm.isLoding = true;
                   vm.realname = realname;
               }
            })
        }
    }
</script>
