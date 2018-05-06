<template>
    <v-container>
        <h1>Logowanie</h1>
        <v-form @submit.prevent="login()">
            <v-text-field
                    label="email"
                    v-model="user.email"

            ></v-text-field>
            <v-text-field
                    label="password"
                    v-model="user.password"
                    type="password"

            ></v-text-field>

            <v-btn color="primary" type="success">
                login
            </v-btn>
        </v-form>
    </v-container>

</template>

<script>
    export default {
        data(){
            return {
                user: {
                    email: '',
                    password: ''

                },
            }
        },

        methods:{
            login(){

                //console.log(this.user.email)
                axios.post(`login`, {
                    email: this.user.email,
                    password: this.user.password
                })
                    .then(result=>{
                        localStorage.setItem('token', result.data.access_token)
                            this.$router.push({
                                path:`/shop`
                            })
                        }

                    )
            }
        }
    }




</script>