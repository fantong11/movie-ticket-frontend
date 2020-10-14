<template>
    <div class="Breadcrumb">
        <b-container class="breadcrumb-container" fluid="lg">
            <ul>
                <li
                v-for="(breadcrumb, i) in breadcrumbList"
                :key="i"
                @click="routeTo(i)"
                :class="{'linked': !!breadcrumb.link}">
                    {{ breadcrumb.name }}
                </li>
            </ul>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'Breadcrumb',
        data() {
            return {
                breadcrumbList: []
            }
        },
        mounted () { 
            this.updateList() 
        },
        watch: { '$route' () { 
            this.updateList() 
        } },
        methods: {
            routeTo (pRouteTo) {
                if (this.breadcrumbList[pRouteTo].link) 
                    this.$router.push(this.breadcrumbList[pRouteTo].link)
            },
            updateList () { 
                this.breadcrumbList = this.$route.meta.breadcrumb 
            }
        }
    }
</script>

<style scoped>
    .Breadcrumb {
        margin-bottom: line(3);
        background-color: #d8d8d8;
    }
    ul {
        display: flex;
        list-style: none;
        padding: 0;
        font-size: font(1);
    }
    li {
        cursor: pointer;
        color: #4297b9;
    }
    li:last-child {
        cursor: default;
        color: #5f6568;
    }
    li:not(:last-child):after {
        content: ">";
        margin: 5px;
        color: #5f6568;
    }
</style>