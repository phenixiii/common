<template>
    <div class="cur-panel">
        <div class="cur-title">
            <slot name='title'></slot>
        </div>
        <div class="cur-content">
            <slot name='content'></slot>
        </div>
    </div>
</template>

<script>
export default {
   name:'panel'
}
</script>

<style scoped>

.cur-panel{
    position: relative;
    margin: 0.5rem;
    border: 1px solid #dddddd;
    -webkit-box-shadow: 0 10px 5px -5px rgba(0, 0, 0, 0.2);
    box-shadow: 0 10px 5px -5px rgba(0, 0, 0, 0.2);
}

.cur-title{
    position: absolute;
    width: 100%;
    padding: 0 1rem;
    border: 1px solid #dddddd;
    height: 40px;
    line-height: 40px;
    background: #dddddd
}

.cur-content{
    height: calc(100% - 40px);
    margin-top: 40px;
    padding: 1rem;
    min-height: 40px;
}
</style>