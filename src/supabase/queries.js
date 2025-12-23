// src/supabase/queries.js
import { supabase } from './client.js'

// ========== CLIENTES ==========
export async function carregarClientes() {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('nome', { ascending: true })
  
  if (error) throw error
  return data
}

export async function buscarClientePorId(id) {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function salvarCliente(cliente) {
  const { data, error } = await supabase
    .from('clientes')
    .upsert(cliente)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function excluirCliente(id) {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// ========== PROFISSIONAIS ==========
export async function carregarProfissionais() {
  const { data, error } = await supabase
    .from('profissionais')
    .select('*')
    .order('nome', { ascending: true })
  
  if (error) throw error
  return data
}

// ========== CONTAS A RECEBER ==========
export async function carregarContasReceber() {
  const { data, error } = await supabase
    .from('contas_receber')
    .select(`
      *,
      clientes (nome)
    `)
    .order('data_vencimento', { ascending: true })
  
  if (error) throw error
  return data
}

export async function salvarContaReceber(conta) {
  const { data, error } = await supabase
    .from('contas_receber')
    .upsert(conta)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// ========== CONTAS A PAGAR ==========
export async function carregarContasPagar() {
  const { data, error } = await supabase
    .from('contas_pagar')
    .select('*')
    .order('data_vencimento', { ascending: true })
  
  if (error) throw error
  return data
}

export async function salvarContaPagar(conta) {
  const { data, error } = await supabase
    .from('contas_pagar')
    .upsert(conta)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// ========== AGENDAMENTOS ==========
export async function carregarAgendamentos() {
  const { data, error } = await supabase
    .from('agendamentos')
    .select(`
      *,
      clientes (nome),
      profissionais (nome, especialidade)
    `)
    .order('data_agendamento', { ascending: true })
  
  if (error) throw error
  return data
}

// ========== DASHBOARD ==========
export async function carregarEstatisticas() {
  const hoje = new Date().toISOString().split('T')[0]
  
  const [
    { data: totalClientes, error: err1 },
    { data: totalProfissionais, error: err2 },
    { data: contasReceber, error: err3 },
    { data: contasPagar, error: err4 },
    { data: agendamentosHoje, error: err5 }
  ] = await Promise.all([
    supabase.from('clientes').select('id', { count: 'exact' }),
    supabase.from('profissionais').select('id', { count: 'exact' }).eq('ativo', true),
    supabase.from('contas_receber').select('valor').eq('status', 'pendente'),
    supabase.from('contas_pagar').select('valor').eq('status', 'pendente'),
    supabase.from('agendamentos')
      .select('id', { count: 'exact' })
      .gte('data_agendamento', `${hoje}T00:00:00`)
      .lt('data_agendamento', `${hoje}T23:59:59`)
  ])
  
  const erro = err1 || err2 || err3 || err4 || err5
  if (erro) throw erro
  
  const totalReceber = contasReceber?.reduce((sum, c) => sum + (c.valor || 0), 0) || 0
  const totalPagar = contasPagar?.reduce((sum, c) => sum + (c.valor || 0), 0) || 0
  
  return {
    totalClientes: totalClientes?.length || 0,
    totalProfissionais: totalProfissionais?.length || 0,
    totalReceber,
    totalPagar,
    agendamentosHoje: agendamentosHoje?.length || 0
  }
}