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
Register: async(name,email,password,password_confirmation)=>{
    return await api.post("/api/register",{name,email,password,password_confirmation}); 
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
 },
  PostCommande : async(OrderData)=>{
         return await api.post('/api/commande',OrderData);
},
Postadresslivraison : async(data)=>{
         return await api.post('/api/adresse-livraison',data);
},
CreatePaymentIntent: async ({ amount, livraison_id }) => {
  return await api.post('/api/payment-intent', { amount, livraison_id });
},
PatchStatus: async ({id,statut}) => {
  return await api.patch(`/api/commande/${id}`, {statut});
},
  updateUsername: async({id, name}) =>{
   return await  api.patch(`/api/modifier/${id}/username`, { name })}
,
  updateEmail: async({id, email}) =>{
   return await    api.patch(`/api/modifier/${id}/email`, { email })}
,
  updatePhone: async(phone) =>{
   return await    api.patch('/api/modifier-phone', { phone })},
    updatePassword: async(data) =>{
   return await    api.patch('/api/modifier-password',  data )},
   getCommandeClient : async() =>{
   return await   api.get(`/api/commande-client`)},
   incrementeRreviewCount:async (id)=>{
    return await api.post(`/api/plats/${id}/review`);
   }

};