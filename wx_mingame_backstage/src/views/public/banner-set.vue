<template>
    <div class="banner-set" style="width: 100%;">
        <Table :loading="loading" border :columns="columns" :data="data"></Table>
        <Button v-if="!loading" class="addBtn" long icon="ios-add" @click="add">添加</Button>
        <Modal
                v-model="modal"
                :closable=false
                :mask-closable=false
                :title="modalTile">
            <Form :label-width="80">
                <FormItem label="图片名称">
                    <Input type="text" v-model.trim="formCustom.name"></Input>
                </FormItem>
                <FormItem label="图片">
                    <div class="upload-list">
                       <img :src="formCustom.ossurl">
                    </div>
                    <Upload
                            ref="upload"
                            type="drag"
                            :show-upload-list="false"
                            :format="['jpg','jpeg','png']"
                            :before-upload="handleBeforeUpload"
                            action="//jsonplaceholder.typicode.com/posts/"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="链接地址">
                    <Input type="text" v-model.trim="formCustom.jumpurl"></Input>
                </FormItem>
                <FormItem label="排序">
                    <Input type="text" v-model.trim="formCustom.sort"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="modalcancel">取消</Button>
                <Button type="primary" size="large" @click="modalok">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import {BannerAdd, BannerChange, BannerDel, BannerGet} from '../../server';
    export default {
        name : 'banner-set',
        data () {
            return {
                columns: [
                    {
                        title: '图片名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '图片',
                        key: 'ossurl',
                        render: (h, params) => {
                            return h('img', {
                                attrs: {
                                    src: params.row.ossurl
                                },
                                style : {
                                    width: '100%',
                                    height : 'auto',
                                    margin : '5px 0',
                                    'vertical-align': 'middle'
                                }
                            });
                        }
                    },
                    {
                        title: '链接地址',
                        key: 'jumpurl'
                    },
                    {
                        title: '添加/修改时间',
                        key: 'time'
                    },
                    {
                        title: '排序',
                        key: 'sort'
                    },
                    {
                        title: '设置',
                        key: 'set',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }

                ],
                data: [],
                modal : false,
                name : 'banner-set',
                modalTile : '',
                changeTitle : '',
                loading : false,
                formCustom: {},
                showIndex : 0,
                formData : null
            }
        },
        created(){
            this.loading = true;
            BannerGet()
                .then(res=>{
                    this.loading = false;
                    let {status, list} = res.data;
                    if(status == 0){
                        this.data = list == null ? [] : list;
                    }
                    else{
                        this.$Message.error(`${status} 数据请求失败！`);
                    }
                })
        },
        methods: {
            add(){
                this.formCustom = {
                    name : '',
                    ossurl : require('../../images/defaule.jpg'),
                    jumpurl : '',
                    sort: ''
                }
                this.modalTile = '添加轮播图';
                this.changeTitle = 'add';
                this.modal = true;
            },
            show (index) {
                this.changeTitle = 'change';
                this.showIndex = index;
                this.formCustom = Object.assign({}, this.data[index]);
                this.modalTile = '修改轮播图';

                this.modal = true;
            },
            remove (id) {
                var vm = this;
                this.$Modal.confirm({
                    title: '确定删除本条数据吗？',
                    onOk: function(){
                        vm.loading = true;
                        BannerDel({id}).then(res=>{
                            vm.loading = false;
                            let {status, list} = res.data;
                            if(status == 0){
                                vm.data = list == null ? [] : list;
                                vm.formCustom = {};
                                vm.formData = null;
                                this.$Notice.success({
                                    title: '成功',
                                    desc:`数据删除成功！`
                                });
                            }
                            else {
                                this.$Notice.error({
                                    title: '错误',
                                    desc:`数据删除失败！`
                                });
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Notice.warning({
                            title: '提示！',
                            desc : '取消操作'
                        });
                    }
                });
            },
            handleSubmit (name) {

            },
            modalok(){
                this.changeData(this.changeTitle)
            },
            changeData(name){
                var isChange = false;
                for(var attr in  this.formCustom){
                    if(attr == 'name' || attr == 'jumpurl' || attr == 'sort'){
                        if(this.formCustom[attr] == ''){
                            this.$Message.warning(this.getTitle(attr));
                            return;
                        }
                        if(attr == 'sort'){
                            var myreg=/^([1-9]\d*|0)(\.\d*[1-9])?$/;
                            if(this.formCustom[attr] !== '0' && !myreg.test(this.formCustom[attr])){
                                this.$Message.warning('请输入有效数字');
                                return false;
                            }
                        }
                    }
                    else if( attr == 'ossurl'){
                        if(name == 'add'){
                            if(this.formData == null){
                                this.$Message.warning(this.getTitle(attr));
                                return;
                            }
                        }
                    }
                }
                if(name == 'change'){
                    for(var attr in  this.formCustom){
                        if(this.formCustom[attr] != this.data[this.showIndex][attr]){
                            isChange = true;
                            break;
                        }

                    }
                    if(!isChange){
                        this.$Message.warning('您未作任何的修改');
                        return;
                    }
                    this.changeList()
                }
                else {
                    this.addList()
                }
                this.loading = true;
                this.modal = false;

            },
            getTitle(val){
                switch(val){
                    case 'name' :
                        return '游戏名称不能为空'
                        break;
                    case 'jumpurl' :
                        return '游戏地址不能为空'
                        break;
                    case 'ossurl' :
                        return '请上传图片'
                        break;
                    case 'sort' :
                        return '排序不能为空'
                        break;
                }
            },
            modalcancel(){
                this.modal = false;
                this.formCustom = {};
                this.formData = null;
            },
            handleBeforeUpload(file){
                var type = file.type.split('/')[0];
                if(type != 'image'){
                    this.$Message.warning('请上传图片类型');
                    return;
                }
                this.getFile(file);
                return false;
            },
            getFile(file){
                this.formData = new FormData();
                this.formData.append('image', file);
                var reader = new FileReader();

                // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
                reader.addEventListener("load", ()=> {
                    console.log(reader)
                    this.formCustom.ossurl = reader.result;
                }, false);
                // 调用reader.readAsDataURL()方法，把图片转成base64
                reader.readAsDataURL(file);

            },
            changeList(){
                if(this.formData == null){
                    this.formData = new FormData();

                    this.formData.append('image','');
                    this.formData.append('isup',0);
                }
                else{
                    this.formData.append('isup',1);
                }
                this.formData.append('name',this.formCustom.name);
                this.formData.append('id',this.formCustom.id);
                this.formData.append('jumpurl',this.formCustom.jumpurl);
                this.formData.append('sort',this.formCustom.sort);

                BannerChange(this.formData).then(res=>{
                    this.loading = false;
                    let {status, list} = res.data;
                    if(status == 0){
                        this.data = list;
                        this.formCustom = {};
                        this.formData = null;
                        this.$Notice.success({
                            title: '成功',
                            desc:`数据修改成功！`
                        });
                    }
                    else {
                        this.$Notice.error({
                            title: '错误',
                            desc:`数据修改失败！`
                        });
                    }
                })
            },
            addList(){
                this.formData.append('name',this.formCustom.name);
                this.formData.append('jumpurl',this.formCustom.jumpurl);
                this.formData.append('sort',this.formCustom.sort);

                BannerAdd(this.formData).then(res=>{
                    this.loading = false;
                    let {status, list} = res.data;
                    if(status == 0){
                        this.data = list;
                        this.formCustom = {};
                        this.formData = null;
                        this.$Notice.success({
                            title: '成功',
                            desc:`数据添加成功！`
                        });
                    }
                    else {
                        this.$Notice.error({
                            title: '错误',
                            desc:`数据添加失败！`
                        });
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .upload-list{
        display: inline-block;
        width: 340px;
        height: auto;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .upload-list img{
        width: 100%;
        display: block;
    }
    .addBtn{
        line-height: 3.5;
        border-top-color: rgba(255,255,255,0);
        border-radius: 0 0 4px 4px;
    }
</style>