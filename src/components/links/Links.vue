<template>

    <div>

        <v-dialog v-model="dialog" max-width="500px">
            <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
            <v-card>
                  <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="adres orginalny" v-model="editedItem.url_org"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="adres krótki" v-model="editedItem.url_short"></v-text-field>
                            </v-flex>


                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <div v-if="test">test</div>
        <v-data-table
            :headers="headers"
            :items="links"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.url_org }}</td>
            <td>{{ props.item.url_short }}</td>
            <!--<td>{{ props.item.active }}</td>-->
            <td>
                <v-btn
                        :color="activityColors[activityState[props.item.id]]"
                        @click="change(!activityState[props.item.id], props.item.id)"
                >
                    {{activeToText(activityState[props.item.id])}}
                </v-btn>
            </td>

            <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item.id)">
                    <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item.id)">
                    <v-icon color="pink">delete</v-icon>
                </v-btn>
            </td>


        </template>
    </v-data-table></div>
</template>

<script>
    export default{
        name: "List",
        data(){
            return{
                dialog: false,
                links:[],

                editedIndex: 0,
                editedItem: {
                    ulr_org: '',
                    url_short: '',

                },

                test: 0,
                activityColors:{
                  0:'error',
                  1:'success'
                },
                activityState: {},
                headers: [
                    { text: 'id', value: 'id' },
                    { text: 'Adres oryginalny', value: 'url_org' },
                    { text: 'adres krótki', value: 'url_short' },
                    { text: 'Status', value: 'active' }
                ],

            }
        },
        methods:{
          activeToText(active){
              return active == 1 ? 'aktywny' : 'nieaktywny'
          },

            change(active,id){
              axios.patch(`links/${id}`, {
                  active:active
              })
                  .then(result=>{
                      this.activityState[id] = active ? 1: 0
                      this.$forceUpdate()
                  })
            },

            deleteItem (item) {
//
//                console.log(item)
                confirm('Czy chcesz usunąć?')
                axios.delete(`links/${item}`)
                    .then(()=>{
                    this.getLinks()
                    })


            },

            editItem (item) {

                axios(`links/${item}/edit`)
                    .then(result=>{

                        this.editedItem = result.data
                        //console.log(this.editedItem)

                        this.dialog = true

                    })


            },


            getLinks(){
                axios('links')
                    .then(result=>{
                        this.links = result.data

                        this.links.forEach(link =>{
                            this.activityState[link.id] = link.active
                        })
                    })
            },

            close () {

                this.dialog = false

            },
            save () {
                if(this.editedItem.id){
                    axios.put(`links/${this.editedItem.id}`,this.editedItem)
                        .then(result=>{

                            this.getLinks()
                        })
                }else{

                    axios.post('links',this.editedItem)
                        .then(result=>{
                            this.editedItem.url_org = ''
                            this.editedItem.url_short = ''
                            this.getLinks()
                        })}

                        this.close()
            },
        },

        created(){
           this.getLinks()
        }
    }

</script>