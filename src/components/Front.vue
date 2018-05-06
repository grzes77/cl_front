<template>
  <v-container>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
        dodało link:
          {{this.url}}
        </v-card-title>

        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title>
         <v-alert >Ten link jest zajety</v-alert>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  <v-form @submit.prevent="save()">
    <v-text-field
            label="URL"
            v-model="url"
            required
    ></v-text-field>
    <v-text-field
            label="Short"
            v-model="short"

    ></v-text-field>

    <v-btn
     color="success"
     type="submit">
      zapisz
    </v-btn>
  </v-form>
  </v-container>
</template>

<script>
  export default{
      name: 'Front',
      data: () => ({
          url: '',
          short:'',
          dialog: false,
          dialog2: false

         }),

      methods:{
          save(){
                  axios.post(`links`,{
                      url_org: this.url,
                      url_short:this.short

                  })
                      .then(result=>{
                          this.dialog = true


                      }).catch(error =>{
                          this.dialog2 = true
                  })
          }
              },

      created(){
          axios('links')
              .then(result=>{
                  console.log(result.data)
              })
      }
  }
</script>
