<template>
    <section class="search">
        <div class="input-div">
            <i class="iconfont icon-tubiao111"></i>
            <input v-model="city" placeholder="搜索城市">           
            <a class="cancel" @click="cancel">取消</a>
            <a class="cancel" @click="submit">确定</a>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            city: '',
            re: /^[\u4e00-\u9fa5]*$/
        }
    },
    methods: {
        cancel: function() {
            this.$('.search').style.height = 0
            this.$('.input-div').style.display = 'none'
        },
        submit: function() {
            if (this.city == '') {
                alert('请输入城市名')
            } else if (!this.re.test(this.city)) {
                alert('请输入正确的城市名')
            } else {
                this.$('.search').style.height = 0
                this.$('.input-div').style.display = 'none'
                this.$('.loadding').style.display = 'block'
                this.$emit('transferCity', this.city)
            }
        },
        $: function(selector) {
            return document.querySelector(selector)
        }
    }
}
</script>

<style>
    .search {
        width: 100%;
        height: 0;
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;
        transition: all 0.2s linear;
    }
    .search .input-div {
        display: none;
    }
    .search input {
        background: #f2f2f2;
        width: 60%;
        height: 30px;
        padding: 5px 0 5px 32px;
        box-sizing: border-box;
        line-height: 24px;
        background: #f2f2f2;
        border-radius: 44px;
        font-size: 14px;
        color: #434343;
        -webkit-appearance: none;
        border-width: 0;
        outline: none;
    }
    .search div {
        padding: 10px;
        border-bottom: 1px solid #e6e6e6;
    }
    .search .cancel {
        float: right;
        font-size: 14px;
        color: #434343;
        width: 60px;
        line-height: 30px;
        text-align: center;
    }
    .search .icon-tubiao111 {
        position: absolute;
        left: 20px;
        top: 17px;
        font-size: 16px !important;
    }
</style>