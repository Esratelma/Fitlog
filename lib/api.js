const PRIMARY='https://api.abcz.workers.dev/api/fitlog';
const FALLBACK='https://api.api-store.workers.dev/api/fitlog';
async function request(url){const res=await fetch(url,{cache:'no-store'});if(!res.ok)throw new Error(`API request failed (${res.status})`);return res.json()}
export async function getWorkouts(){try{return await request(PRIMARY)}catch{return await request(FALLBACK)}}
export async function getWorkout(id){try{return await request(`${PRIMARY}/${id}`)}catch{return await request(`${FALLBACK}/${id}`)}}
