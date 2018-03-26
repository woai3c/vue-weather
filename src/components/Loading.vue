<template>
    <section class="loading">
        <div class="rotate-div">
            <i class="iconfont icon-loader"></i>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style>
    .loading {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: none;
        background: #000;
        opacity: 0.5;
    }
    .rotate-div {
        width: 100%;
        height: 100%;
        display:flex;
        align-items: center;/*垂直居中*/
        justify-content: center;/*水平居中*/
    }
    .icon-loader {
        font-size: 2rem !important;
        color: #fff;
        animation: loading 1.5s linear infinite;
        display: block;
    }
    @keyframes loading {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>