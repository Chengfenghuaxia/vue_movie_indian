<template>
    <div class="loader"  v-show="msg.show">
        <div class="loader-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <!-- <div class="loadingss">Loading...</div> -->
        </div>
   
    </div>
</template>

<script lang="ts" setup>
defineProps({
    msg:{
    },
})
</script>

<style scoped>
/*body {*/
/*    margin: 0;*/
/*}*/
.loadingss{
    color: goldenrod;
    font-size: 30px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
}
.loader {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 50%;
    left: 40%;
    margin-left: 10%;
    transform: translate3d(-50%, -50%, 0);
    background: rgba(0,0,0, 0.65);
    z-index: 5000;
    overflow-y: hidden;
}
.loader-container {
    width: 100%;
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
}
.dot {
    width: 24px;
    height: 24px;
    background: #3ac;
    border-radius: 100%;
    display: inline-block;
    animation: slide 1s infinite;
}
.dot:nth-child(1) {
    animation-delay: 0.1s;
 
    background: linear-gradient(to right, #edeeee, #aec4cf);
}
.dot:nth-child(2) {
    animation-delay: 0.2s;
    background: linear-gradient(to right, #aec4cf, rgb(228, 223, 209));
}
.dot:nth-child(3) {
    animation-delay: 0.3s;

    background: linear-gradient(to right,  rgb(228, 223, 209),rgb(233, 205, 135));
}
.dot:nth-child(4) {
    animation-delay: 0.4s;
    background: linear-gradient(to right, rgb(233, 205, 135),goldenrod);

}
.dot:nth-child(5) {
    animation-delay: 0.5s;
    background: linear-gradient(to right, goldenrod,rgb(250, 180, 1));
 
}
@-moz-keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
}
@-webkit-keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
}
@-o-keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
}

</style>