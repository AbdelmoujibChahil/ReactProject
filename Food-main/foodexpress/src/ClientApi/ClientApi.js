// ClientApi.js
import api from '../api/axios'; // Assurez-vous que axios est configuré avec withCredentials

export const ClientApi = {
  // 1️⃣ Récupération du cookie CSRF
  getcsrf: async () => {
    return await api.get("/sanctum/csrf-cookie");
  },

  Login: async (email, password) => {
    return await api.post("/api/login", { email, password });
  },


  GetUser: async () => {
    return await api.get("/api/user"); 
  },
GetAllUsers: async()=>{
    return await api.get("/api/allusers"); 
  },


  GetPlats:async()=>{
    return await api.get('/api/plats');
  },
  PostPlats:async(nom,prix)=>{
    return await api.post('/api/plats',{nom,prix});
  },
   Logout:async()=>{
    return await api.post('/api/logout');
  },
  PutProfile:async(id,name,email,password)=>{
    return await api.put(`/api/modifier/${id}`,{name,email,password});
  },
  GetCommandeServices:async()=>{
    return await api.get(`/api/commandes`);

 PostCommande : async(commandeData)=>{
         return await api.post('/api/commande',userID);
 }
}};