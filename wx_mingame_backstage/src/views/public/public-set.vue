<style scoped>
    .addBtn{
        line-height: 3.5;
        border-top-color: rgba(255,255,255,0);
        border-radius: 0 0 4px 4px;
    }
    .pageWrap{
        padding-top: 20px;
        text-align: center;
    }
    .search{
        width: 500px;
        float: right;
        margin-bottom: 20px;
    }
    .table{
        clear: both;
    }
</style>
<template>
    <div style="width: 100%;" class="public-set">
        <Input class="search" placeholder="搜索游戏名称"
               icon="ios-search"
               v-model="searchName"
               @on-enter="searchHandler"
               @on-click="searchHandler"
               />
        <Table class="table" :loading="loading" border :columns="columns" :data="showList"></Table>
        <Button v-if="!loading" class="addBtn" long icon="ios-add" @click="ModalShow('add')">添加</Button>
        <template v-if="showPage">
            <Page :total="total" class="pageWrap" :page-size="pageSize"  @on-change="changePageHandler" />
        </template>
    </div>
</template>


<script>
    import {GetList, AddList, DeleList, UpdataList, Search} from '../../server';
    //const Qs = require('qs');
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '游戏名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '游戏图标',
                        key: 'icon',
                        render: (h, params) => {
                            return h('img', {
                                attrs: {
                                    src: params.row.icon
                                },
                                style : {
                                    width: '50px',
                                    height : '50px',
                                    'vertical-align': 'middle'
                                }
                            });
                        }
                    },
                    {
                        title: '游戏描述',
                        key: 'description'
                    },
                    {
                        title: '游戏地址',
                        key: 'url'
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
                        title: '操作',
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
                                            this.show(params.row.id)
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
                dataList: [],
                changeData : {},
                addData :{
                    name : '',
                    icon: require('../../images/default2.jpg'),
                    description : '',
                    url: '',
                    sort : '0'
                },
                pageSize : 10,  //每页条数
                indexPage : 1, //当前页
                loading : true,
                picPreview : '',
                formData : null,
                searchName : '',
                isFileUp : false
            }
        },
        mounted(){
            GetList()
                .then(res=>{
                    let {status, list} = res.data;
                    if(status == 0){
                        this.dataList = list == null ? [] : list;
                    }
                    else{
                        this.$Message.error(`${status} 数据请求失败！`);
                    }
                    this.loading = false;
                })

        },
        computed : {
            total(){
                return this.dataList.length;
            },
            showPage(){
              if(!this.dataList.length || this.dataList.length <= this.pageSize){
                  return false;
              }
              else{
                  return true;
              }
            },
            showList(){
                var iPage = (this.indexPage-1) <= 0 ? 0 : this.indexPage-1;
                var pageStart = iPage * this.pageSize;
                if(!this.dataList[pageStart]){
                    this.indexPage-=1;
                    pageStart = (this.indexPage-1) * this.pageSize;
                }
                return this.dataList.slice(pageStart, pageStart + this.pageSize);
            }
        },
        methods: {
            show (id) {
                var index =  this.dataList.findIndex(item=>item.id==id);
                var oldData = this.showList.filter(item=>{
                    return item.id == id
                })[0]
                this.changeData = Object.assign({}, oldData);
                this.picPreview = this.changeData.icon;
                this.ModalShow(index, id);
            },
            ModalShow(index, id){
                var vm = this;
                var title;

                if(index == 'add'){
                    title = '添加游戏';
                    this.changeData = Object.assign({}, this.addData);
                    this.picPreview = this.changeData.icon
                }
                else{
                    title = '修改游戏信息';
                }
                this.$Modal.confirm({
                    render: (h) => {
                        return h('div',[
                            h('div',{
                                style : {
                                    padding : '5px 0'
                                }
                            },[
                                h('span',{
                                    domProps:{
                                        innerHTML : '游戏名称'
                                    },
                                    attrs:{
                                        class : 'moaleLable'
                                    }
                                }),
                                h('Input',{
                                    attrs: {
                                        value: this.changeData.name
                                    },
                                    style : {
                                        width : '484px'
                                    },
                                    on: {
                                        input: (val) => {
                                            this.changeData.name = val.trim();
                                        }
                                    }
                                })
                            ]),
                            h('div',{
                                style : {
                                    padding : '5px 0'
                                }
                            },[
                                h('span',{
                                    domProps:{
                                        innerHTML : '游戏图标'
                                    },
                                    attrs:{
                                        class : 'moaleLable'
                                    }
                                }),
                                h('img',{
                                    attrs: {
                                        src: this.picPreview,
                                    },
                                    style : {
                                        width : '50px',
                                        height: '50px',
                                        'vertical-align': 'middle'
                                    }
                                }),
                                h('span',{
                                    attrs:{
                                        class : 'fileUpLoad'
                                    }
                                },[
                                    h('input',{
                                        attrs: {
                                            type : 'file',
                                        },
                                        on : {
                                            change : (ev)=>{
                                                var type = ev.target.files[0].type.split('/')[0];
                                                if(type != 'image'){
                                                    this.$Message.warning('请上传图片类型');
                                                }
                                                else{
                                                    this.getFile(ev);
                                                }

                                            }
                                        }

                                    })
                                ]),

                            ]),
                            h('div',{
                                style : {
                                    padding : '5px 0'
                                }
                            },[
                                h('span',{
                                    domProps:{
                                        innerHTML : '游戏描述'
                                    },
                                    attrs:{
                                        class : 'moaleLable'
                                    }
                                }),
                                h('Input',{
                                    attrs: {
                                        value: this.changeData.description
                                    },
                                    style : {
                                        width : '484px'
                                    },
                                    on: {
                                        input: (val) => {
                                            this.changeData.description  = val.trim();
                                        }
                                    }
                                })
                            ]),
                            h('div',{
                                    style : {
                                        padding : '5px 0'
                                    }
                                },
                                [
                                    h('span',{
                                        domProps:{
                                            innerHTML : '游戏地址 :'
                                        },
                                        attrs:{
                                            class : 'moaleLable'
                                        }
                                    }),
                                    h('Input',{
                                        attrs: {
                                            value: this.changeData.url,
                                            id : 'file'
                                        },
                                        style : {
                                            width : '484px'
                                        },
                                        on: {
                                            input: (val) => {
                                                this.changeData.url = val.trim();
                                            }
                                        }
                                    })
                                ]),
                            h('div',{
                                style : {
                                    padding : '5px 0'
                                }
                            },[
                                h('span',{
                                    domProps:{
                                        innerHTML : '排序'
                                    },
                                    attrs:{
                                        class : 'moaleLable'
                                    }
                                }),
                                h('Input',{
                                    attrs: {
                                        value: this.changeData.sort
                                    },
                                    style : {
                                        width : '484px'
                                    },
                                    on: {
                                        input: (val) => {
                                            this.changeData.sort = val.trim();
                                        }
                                    }
                                })
                            ])
                        ])
                    },
                    width : '600px',
                    title : title,
                    loading : true,
                    onOk: function(){
                        vm.changeListHandler(this, index, id);
                    },
                    onCancel: () => {
                        this.isFileUp = false;
                        this.changeData = {};
                        this.formData = null;
                        this.$Notice.warning({
                            title: '提示！',
                            desc : '取消操作'
                        });
                    }
                })
            },
            remove (id) {
                var vm  = this;
                this.$Modal.confirm({
                    loading : true,
                    title: '确定删除本条数据吗？',
                    onOk: function(){
                        vm.delDataList(id, this);
                    },
                    onCancel: () => {
                        this.$Notice.warning({
                            title: '提示！',
                            desc : '取消操作'
                        });
                    }
                });
            },
            changePageHandler(index){
                this.indexPage = index;
            },
            getFile(ev){

                var inputFile = ev.target;
                var file = inputFile.files[0];
                this.formData = new FormData();
                this.formData.append('icon', file);
                this.isFileUp = true;
                var reader = new FileReader();

                // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
               reader.addEventListener("load", ()=> {
                   this.picPreview = reader.result;
               }, false);
                // 调用reader.readAsDataURL()方法，把图片转成base64
               reader.readAsDataURL(file);

            },
            changeListHandler(modal, index, id){   //修改/添加数据

                var isNull = true;

                for(var attr in this.changeData){
                    if(attr == 'icon' && index == 'add'){
                        if(this.isFileUp){
                            isNull = false;
                            continue;
                        }
                        else
                        {
                            modal.buttonLoading = false;
                            this.$Message.warning(this.getTitle(attr));
                            return false;
                        }
                    }
                    else{
                        if(this.changeData[attr] == ''){
                            modal.buttonLoading = false;
                            this.$Message.warning(this.getTitle(attr));
                            return false;
                        }
                        else{
                            if(attr == 'sort'){
                                var myreg=/^([1-9]\d*|0)(\.\d*[1-9])?$/;
                                if(this.changeData[attr] !== '0' && !myreg.test(this.changeData[attr])){
                                    modal.buttonLoading = false;
                                    this.$Message.warning('请输入有效数字');
                                    return false;
                                }
                            }
                        }
                    }

                }
                if(index != 'add'){
                    if(this.isFileUp){
                        isNull = false;
                    }
                     else
                    {

                        for(var attr in this.changeData){
                            if(this.changeData[attr] != this.dataList[index][attr]){
                                isNull = false;
                                break;
                            }
                        }
                    }
                }

                if(isNull){
                    this.$Message.warning('您未作任何修改');
                    modal.buttonLoading = false;
                    return false;
                }

                this.changeDataList(index, id)

            },
            getTitle(val){
                switch(val){
                    case 'name' :
                        return '游戏名称不能为空'
                        break;
                    case 'description' :
                        return '游戏描述不能为空'
                        break;
                    case 'url' :
                        return '游戏地址不能为空'
                        break;
                    case 'icon' :
                        return '请上传图片'
                        break;
                    case 'sort' :
                        return '排序不能为空'
                        break;
                }
            },
            changeDataList(title, id){  //添加游戏

                this.$Modal.remove();
                this.loading = true;

                let tipsTitile;
                if(title == 'add'){
                    this.formData.append('name',this.changeData.name);
                    this.formData.append('description',this.changeData.description);
                    this.formData.append('url',this.changeData.url);
                    this.formData.append('sort',this.changeData.sort);
                    AddList(this.formData)
                        .then(data=>{
                            tipsTitile = '添加';
                            this.upDataHandler(data, tipsTitile);
                        })

                }
                else{
                   if(this.formData == null){
                       this.formData = new FormData();

                       this.formData.append('icon','');
                       this.formData.append('isup',0);
                   }
                   else{
                       this.formData.append('isup',1);
                   }
                    this.formData.append('name',this.changeData.name);
                    this.formData.append('description',this.changeData.description);
                    this.formData.append('url',this.changeData.url);
                    this.formData.append('id',id);
                    this.formData.append('sort',this.changeData.sort);
                    UpdataList(this.formData)
                        .then(data=>{
                           tipsTitile = '修改';
                           this.upDataHandler(data, tipsTitile);
                        })

                }


            },
            delDataList(id){
                this.loading = true;
                this.$Modal.remove();
                //DeleList
                DeleList({id})
                    .then(res=>{
                        let {status, list} = res.data;
                        if(status == 0){
                            this.dataList = list == null ? [] : list;
                            this.$Notice.success({
                                title: '成功！',
                                desc : '数据删除成功!'
                            });
                        }
                        else{
                            this.$Notice.error({
                                title: '错误',
                                desc : '数据删除成功!'
                            });
                        }
                        this.loading = false;
                    })


            },
            upDataHandler(res, tipsTitile){
                let {status, list} = res.data;

                if(status == 0){
                    this.dataList = list;
                    this.changeData = {};
                    this.formData = null;
                    this.isFileUp = false;
                    this.$Notice.success({
                        title: '成功',
                        desc:`数据${tipsTitile}成功！`
                    });
                }
                else {
                    this.$Notice.error({
                        title: '错误',
                        desc:`数据${tipsTitile}失败！`
                    });
                }
                this.loading = false;
            },
            searchHandler(){  //搜索
                this.loading = true;

                Search({name : this.searchName})
                    .then(res=>{
                        let {status, list} = res.data;
                        if(status == 0){
                            this.dataList = list == null ? [] : list;
                        }
                        this.loading = false;
                    })

            },
        }
    }
    </script>
