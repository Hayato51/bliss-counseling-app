import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(url, key)
export async function createCustomer(data) { const { data: row, error } = await supabase.from('customers').insert(data).select().single(); if (error) throw error; return row }
export async function updateCustomer(id, data) { const { data: row, error } = await supabase.from('customers').update(data).eq('id', id).select().single(); if (error) throw error; return row }
export async function getCustomers() { const { data, error } = await supabase.from('customers').select('*').order('created_at', { ascending: false }); if (error) throw error; return data || [] }
export async function deleteCustomer(id) { const { error } = await supabase.from('customers').delete().eq('id', id); if (error) throw error }
