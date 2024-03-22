<template>
    <div>
        <div class="advertise" v-for="(item, index) in advertiseList" :key="index" @click="addone(item)">
            <a :href="item.jump_url"><img class="img" :src="item.image" alt=""></a>
        </div>
       
    </div>
</template>
<script>
import { ApiGet } from "../../utils/request";
export default {
    props:["advertiseList"],
    data() {
        return {
        
        }

    },
    mounted() {},
    methods: {
        addone(raw) {
            ApiGet("/advertise/addclickstats",{id:raw.id})
        }
    }
}
</script>
<style scoped>
.advertise {
    width: 100%;
    height: 70px;
    background-color: fff;
}

.img {
    width: 100%;
    height: 70px;
}



.title {
    width: 22%;
    height: 80px;
    color: #000;
    line-height: 80px
}

.item_type {
    width: 78%;
    height: 80px;
    color: #000;
}


</style>