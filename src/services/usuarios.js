import { http } from './config'

export default	{

	salvar:(usuario)=>{
		return http.post('usuario',usuario);
  },
    
	atualizar:(usuario)=>{
		return http.put('usuario',usuario);
  },

  listar:()=>{
		return http.get('usuario')
  },
    
  apagar:(id)=>{
		
		return http.delete('usuario/'+id, { data: id })
	}

}