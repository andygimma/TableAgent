export const VITE_SUPABASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_SUPABASE_URL
  : import.meta.env.VITE_SUPABASE_URL_DEV;

export const VITE_SUPABASE_SECRET_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_SUPABASE_SECRET_KEY
  : import.meta.env.VITE_SUPABASE_SECRET_KEY_DEV;

export const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;