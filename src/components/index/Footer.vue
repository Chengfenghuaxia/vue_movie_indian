<template>
    <div class="custom-footer">
        <span @click="gotutext('copyright')"
            :style="{ borderRight: '.0625rem solid #ccc', padding: '0 .625rem 0 .625rem' }">{{ $t('copyright') }}</span>
        <span @click="gotutext('contact')"
            :style="{ borderRight: '.0625rem solid #ccc', padding: '0 .625rem 0 .625rem' }">{{ $t('contact') }}</span>
        <span @click="gotutext('privacy')" :style="{ paddingLeft: '.625rem' }">{{ $t('privacy') }}</span>
    </div>
</template>

<script lang="ts">
import { query } from 'vue-gtag';
import { useRouter } from 'vue-router';
export default {
    data() {
        return {
            router: ""
        }
    },
    mounted() {
        this.router = useRouter();
    },
    methods: {
        gotutext(type) {
            let cent = { type }
            switch (type) {
                case "copyright":
                    this.router.push({ path: '/copyright', query: cent })
                    break;
                case "privacy":
                    this.router.push({ path: '/privacy', query: cent })
                    break;
                default:
                    break;
            }
        }
    }
}

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