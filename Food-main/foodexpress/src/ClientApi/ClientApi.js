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

  PostPlats:async(data)=>{
    return await api.post('/api/admin/plats',data);
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
PatchStatusCommande: async (id,statut) => {
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
   return await   api.get(`/api/admin/commande-client`)},

   incrementeRreviewCount:async (id)=>{
    return await api.post(`/api/plats/${id}/review`);
   },
   getCategories :  async () => {
  return await api.get(`/api/categories`);
},
   //ADMIN
    getStats : async()=>{
      return await api.get('/api/admin/stats');
    },
    getRevenueTrends : async (period) => {
  return await api.get(`/api/admin/chart/revenue/${period}`);
},
 getOrderDistribution : async (period) => {
  return await api.get(`/api/admin/getOrderDistribution/${period}`);
},
 PostPayment : async (data) => {
  return await api.post(`/api/commandes/${id}/payment`,data);
},

UpdatePlat :  async (id,data) => {
  return await api.put(`/api/admin/plats/${id}`,data);
},
DeletePlat :  async (id) => {
  return await api.delete(`/api/admin/plats/${id}`);
},
AddCustomer  : async (data) => {
  return await api.post(`/api/ajouter`,data);
},
CommandesDashboard : async () => {
  return await api.get(`/api/admin/orders/dashboard`);
},
DriverDashboard : async () => {
  return await api.get(`/api/drivers/dashboard`);
},
DriverUpdate : async (id,data) => {
  return await api.put(`/api/drivers/${id}`,data);
},
CreateDriver : async (data) => {
  return await api.post(`/api/drivers/`,data);
},
DriverupdateStatus: async (id,statut) => {
  return await api.patch(`api/drivers/${id}/status`,statut);
},
DriverDelete: async (id) => {
  return await api.delete(`api/drivers/${id}`);
},
/*Route::prefix('drivers')->group(function () {
    Route::get('/dashboard', [DriverController::class, 'dashboard']);
    Route::get('/available', [DriverController::class, 'availableDrivers']);
    Route::get('/', [DriverController::class, 'index']);
    Route::post('/', [DriverController::class, 'store']);
    Route::get('/{id}', [DriverController::class, 'show']);
    Route::put('/{id}', [DriverController::class, 'update']);
    Route::delete('/{id}', [DriverController::class, 'destroy']);
    Route::patch('/{id}/status', [DriverController::class, 'updateStatus']);
    Route::post('/assign', [DriverController::class, 'assignToOrder']);
});*/
//CONTACT
report: async (data) => {
  return await api.post('/api/reports',data);
},
getReports : async (params) => {
  return await api.get('/api/reports', { params });
},
getKPIs : async (data)=>{
 return  await api.get('/api/reports/kpis');
},
getDashboard : async ()=>{
 return  await api.get('/api/reports/dashboard');
},
markAsRead: async (id)=>{
 return await api.patch(`/api/reports/${id}/read`);
},
markAsResolved: async (id)=>{
 return await api.patch(`/api/reports/${id}/resolve`);
},
deleteReport: async (id)=>{
 return await api.delete(`/api/reports/${id}`);
},

//ANALYTICS

getStatistics:async (period) => {return await api.get("/api/analytics/stats", { params: { period } })},
  getTrendRevenue:async (period) => {return await api.get("/api/analytics/revenue-trends", { params: { period } })},
  getTopCategories:async (period) => {return await api.get("/api/analytics/top-categories", { params: { period } })},
  getPaymentMethods:async (period) => {return await api.get("/api/analytics/payment-methods", { params: { period } })},
  getTopProducts:async (limit = 5) => {return await api.get("/api/analytics/top-products", { params: { limit } })},
  getPeakHours: async() =>{ return await api.get("/api/analytics/peak-hours")},
  getCustomerMetrics:async (period) => {return await api.get("/api/analytics/customer-metrics", { params: { period } })},
  getExportReport: async(period) => {return await api.get("/api/analytics/export-report", { params: { period } })},

availableDrivers: async ()=>{
 return await api.get(`/api/drivers/available`);
},
assignToOrder: async (data)=>{
 return await api.post(`/api/drivers/assign`,data);
},

/* Route::get('/dashboard', [DriverController::class, 'dashboard']);
    Route::get('/available', [DriverController::class, 'getAvailableDrivers']);
    Route::get('/', [DriverController::class, 'index']);
    Route::post('/', [DriverController::class, 'store']);
    Route::get('/{id}', [DriverController::class, 'show']);
    Route::put('/{id}', [DriverController::class, 'update']);
    Route::delete('/{id}', [DriverController::class, 'destroy']);
    Route::patch('/{id}/status', [DriverController::class, 'updateStatus']);
    Route::post('/assign', [DriverController::class, 'assignToOrder']);*/

};