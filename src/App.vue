<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Usuarios Front</a>
      </div>
    </nav>

    <div class="container">
    
      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="usuario.nome" required>
          <label>Inicio Jornada de Trabalho</label>
          <input type="datetime-local" placeholder="Formato dd/MM/yyyy HH:mm" v-model="usuario.inicioJornada" required>
          <label>Fim Jornada de Trabalho</label>
          <input type="datetime-local" placeholder="Formato dd/MM/yyyy HH:mm" v-model="usuario.finalJornada" required>

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>INICIO JORNADA</th>
            <th>FIM DA JORNADA</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="usuario of usuarios" :key="usuario.id">

            <td>{{usuario.nome}}</td>
            <td>{{usuario.inicioJornada}}</td>
            <td>{{usuario.finalJornada}}</td>
            <td>
              <button @click="editar(usuario)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(usuario.id)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>
  import Usuario from './services/usuarios'

    export default {

        data(){
          return {
            usuario: {
              id: '',
              nome: '',
              inicioJornada: '',
              finalJornada: ''
            },
            usuarios: [],
            errors: []
          }
        },

        mounted(){
          this.listar()
          },

        methods:{

          listar(){
              Usuario.listar().then(resposta =>{
                this.usuarios = resposta.data
              })
          },  

          salvar(){
            if(!this.usuario.id){
                Usuario.salvar(this.usuario).then(resposta => {
                  alert('Salvo com sucesso!')
                  this.usuario = resposta.data
                  this.usuario = {}
                  this.listar()
                }).catch(e => {
                  this.errors = e.response.data.errors
                    //alert('Problemas ao salvar o usuario, verifique o preenchimento dos campos!')
                  })
                
            } else {
                Usuario.atualizar(this.usuario).then(resposta => {
                  alert('Atualizado com sucesso!')
                  this.usuario = resposta.data
                  this.usuario = {}
                  this.listar()
                }).catch(e => {
                  this.errors = e.response.data.errors
                    //alert('Problemas ao atualizar o usuario, verifique o preenchimento dos campos!')
                  
                })
            }
            
          },

          editar(usuario){
            this.usuario = usuario
          },

          remover(id){

            if(confirm('Deseja excluir o usuario?')){

                Usuario.apagar(id).then(resposta => {
                this.listar();
                this.errors = []
                this.usuario = resposta.data
                this.usuario = {}
                }).catch(e => {
                  this.errors = e.response.data.errors
                  alert('Problemas ao remover o usuario!')
                  })

              }         
            
          }
          
        }
      }
</script>

<style>

</style>
