<template>
    <v-container grid-list-md text-xs-center>



        <v-layout row wrap>
            <v-flex  xs3 v-for="(product, key) in products" :key="key" >
                <v-card >
                    <v-card-media src="/static/img/pustynia.jpg" height="200px">
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{product.name}}</h3>
                            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...
                            </div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn @click="addToBasket(product)" flat color="orange">Add</v-btn>

                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default{
        name: "List",
        data(){

            return {
                added:[],
                products:[]
            }
        },

        methods:{
            addToBasket(product){

                //console.log(product.id)

                axios.post('orders',{
                    product_id: product.id
                })
                    .then(result=>{
//                        console.log(result.data)
//                        localStorage.order = result.data
//                        this.getOrders(result.data)
                        this.getBastet()

                    })

                //this.$store.state.added.push(product)

            },

            getBastet(){
                axios.get(`orders`)

                    .then(result=>{
                        console.log(result.data)
                        this.$store.state.added = result.data

                    })

            },

            getProduct(){
                axios.get(`products`)
                    .then(result=>{
                        //console.log(result.data)
                        this.products = result.data
                    })
            }


        },

        created (){
//                if(localStorage.getItem('order')){
//                    this.$store.state.order = localStorage.getItem('order');
//                    //console.log(localStorage.order)
//                  this.getOrders(localStorage.order)
//
//                }
                this.getProduct()
        }
    }


</script>