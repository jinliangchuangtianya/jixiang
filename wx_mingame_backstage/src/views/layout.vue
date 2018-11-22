<style scoped>
    .layputWrap{
        width: 100%;
        height: 100%;
        background: url("../images/bg.jpg") no-repeat center;
        background-size: cover;
        filter: blur(2px);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .mform{
        width: 490px;
        height: 350px !important;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -175px;
        margin-left: -245px;
        padding: 25px;
        box-sizing: border-box;
    }
    .subbtn{
        height: 40px;
    }
    .mform{
        text-align: center;
        line-height: 80px;
    }
</style>
<template >
    <div>
        <section class="layputWrap"></section>
        <div class="mform">
            <h2>微信小游戏后台登录</h2>
            <Form  ref="formInline"  :model="formInline" :rules="ruleInline" label-position="left">
                <FormItem prop="user" label-for="Input" required>
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password" class="fitem" label-for="Input" required>
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend" ></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button class="subbtn" type="primary" :disabled="disabled" :loading="loading" long @click="handleSubmit('formInline')">
                        <span v-if="!loading">登录</span>
                        <span v-else>登录中...</span>
                    </Button>
                </FormItem>
            </Form>
        </div>

    </div>

</template>

<script>
    import {Login} from '../server';
    function validNameExist(rule, value, callback){
        if(value.trim() == ''){
            let title = (rule.field == 'user') ? '用户名' : '密码';
            callback(new Error(`请填写${title}`));
        }
        else{
            callback()
        }

    };
    export default {
        name: "layout",
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        {validator : validNameExist, trigger: 'blur'}
                    ],
                    password: [
                        {validator : validNameExist, trigger: 'blur'}
                    ]
                },
                loading : false,
                disabled : false
            }
        },
        mounted(){
            document.onkeyup = ev=>{
                if(ev.keyCode == 13){
                    this.handleSubmit('formInline')
                }
            }
        },
        methods: {
             handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        Login({
                            username : this.formInline.user,
                            password : this.formInline.password
                        })
                        .then(res=>{
                            let {status, msg } = res.data;
                            if(status != 0){
                                this.$Notice.error({
                                    title : '错误',
                                    desc : `${msg}`
                                })
                                this.loading = false;
                            }
                            else {
                                this.disabled = true;
                                this.loading = false;
                                this.$Notice.success({
                                    title : '成功',
                                    desc : `${msg}`,
                                    duration : 3,
                                    onClose:()=>{
                                        let redirect = this.$route.query.redirect;
                                        redirect = redirect ? redirect : '';
                                        this.$router.push({
                                            path : '/'+redirect
                                        })
                                    }
                                })

                            }
                        })

                    } else {
                        //this.$Message.error('用户名不能为空');
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>