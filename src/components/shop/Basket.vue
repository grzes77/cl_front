<template>
    <v-container>
        <v-data-table
                :headers="headers"
                :items="$store.state.added"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.quantity }}</td>
                <td>{{ props.item.price }}</td>
                <td>
                    <v-btn @click="addQuantity(props.item)" fab dark small color="success">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </td>
                <td>
                    <v-btn @click="removeQuantity(props.item)" fab dark small color="primary">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

        <v-btn @click="addOrders($store.state.added['1'])" color="primary">realizuj</v-btn>
    </v-container>
</template>

<script>
    export default {
        name: "Basket",
        data () {
            return {
                headers: [
                    { text: 'Id', value: 'id' },
                    { text: 'Name', value: 'name' },
                    { text: 'Ilosc', value: 'quantity' },
                    { text: 'Cena', value: 'price' },
                    { text: 'Zwieksz', value: '' },
                    { text: 'Zmniejsz', value: '' }
                ]
            }
        },
        methods: {
            addQuantity(item) {
                axios.put(`orders/quantity/${item.id}/1`)
                    .then(() => {
                        item.quantity++
                    })
            },
            removeQuantity(item) {
                axios.put(`orders/quantity/${item.id}/0`)
                    .then(() => {
                        if(item.quantity === 1){
                            this.$store.state.added = this.$store.state.added.filter(element => element.id !== item.id)
                        }else{
                            item.quantity--
                        }
                    })
            },
            addOrders(id){


                axios.put(`orders/${id.order_id}`, id)
                    .then(() => {
                        router.go('/toOrder')
                })

            }
//            getBasket (item, add) {
//                this.$store.state.added = this.$store.state.added.filter(element => {
//                    if(element.id === item.id) {
//                        if(add) {
//                            element.quantity = element.quantity + 1
//                        } else {
//                            if(element.quantity === 1) {
//                                return false
//                            } else {
//                                element.quantity = element.quantity - 1
//                            }
//                        }
//                        return true
//                    }
//
//                    return element
//                })
//
//                // axios('orders')
//                //   .then(result => {
//                //     this.$store.state.added = result.data
//                //   })
//            }
        }

    }
</script>

