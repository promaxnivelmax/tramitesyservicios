import { createClient } from '@supabase/supabase-js';

// =================================================================
// CONFIGURACIÓN DE BASE DE DATOS (SUPABASE)
// =================================================================

const SUPABASE_URL: string = 'https://yyayllgxconjonqpzety.supabase.co';
const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5YXlsbGd4Y29uam9ucXB6ZXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNzA1MTksImV4cCI6MjA4MDk0NjUxOX0.JqtijHg5dQbo2lQ8RGnpfgHCH5Jg9zbq9rf22rs3BA0';

// Lógica para determinar si usamos la nube o local
export const isSupabaseEnabled = SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';

export const supabase = isSupabaseEnabled 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;