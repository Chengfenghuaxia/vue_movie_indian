<template>
    <div class="custom-footer">
        <span :style="{borderRight:'.0625rem solid #ccc',padding:'0 .625rem .5rem'}">copyright notice</span>
        <span :style="{borderRight:'.0625rem solid #ccc',padding:'0 .625rem 0 .625rem'}">disclaimer</span>
        <span :style="{borderRight:'.0625rem solid #ccc',padding:'0 .625rem 0 .625rem'}">contact us
</span>
        <span :style="{paddingLeft:'.625rem'}">privacy policy</span>
    </div>
</template>

<script lang="ts" setup>


</script>

<style scoped>
.custom-footer {
    text-align: center;
    width: 100%;
    height: 1.875rem;
    text-align: center;
    line-height: .9375rem;
    font-size: 11px;
    color: #888888;
    margin-top: 1.5625rem;
}
</style>