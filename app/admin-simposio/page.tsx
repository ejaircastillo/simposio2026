'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'

interface Inscrito {
  id: string
  nombre: string
  email: string
  dni: string
  institucion: string | null
  profesion: string | null
  esAbogado: boolean
  jurisdiccionMatricula: string | null
  otraJurisdiccion: string | null
  numeroMatricula: string | null
  attended: boolean
  mail_sent: boolean
  createdAt: string
}

interface AuditLog {
  id: string
  accion: string
  inscritoId: string
  inscritoNombre: string
  detalle: string | null
  createdAt: string
}

type FilterAbogado = 'all' | 'si' | 'no'
type RowAction = { id: string; action: 'delete' | 'resend' | 'attend' | 'edit' }

interface EditForm {
  nombre: string
  profesion: string
  institucion: string
}

const SESSION_KEY = 'admin_simposio_pwd'

const LOG_BADGE: Record<string, string> = {
  EDITAR: 'bg-amber-50 text-amber-700 border border-amber-200',
  BORRAR: 'bg-red-50 text-red-700 border border-red-200',
  REENVIAR_EMAIL: 'bg-sky-50 text-sky-700 border border-sky-200',
  MARCAR_ASISTENCIA: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
}

const LOG_LABEL: Record<string, string> = {
  EDITAR: 'Edición',
  BORRAR: 'Borrado',
  REENVIAR_EMAIL: 'Reenvío email',
  MARCAR_ASISTENCIA: 'Asistencia',
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [savedPassword, setSavedPassword] = useState<string | null>(null)
  const [inscritos, setInscritos] = useState<Inscrito[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filterAbogado, setFilterAbogado] = useState<FilterAbogado>('all')
  const [loadingRow, setLoadingRow] = useState<RowAction | null>(null)
  const [rowMessage, setRowMessage] = useState<{ id: string; text: string; ok: boolean } | null>(null)

  // Buscador global
  const [searchQuery, setSearchQuery] = useState('')

  // Modal de edición
  const [editingInscrito, setEditingInscrito] = useState<Inscrito | null>(null)
  const [editForm, setEditForm] = useState<EditForm>({ nombre: '', profesion: '', institucion: '' })
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  // Logs de actividad
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [logsLoading, setLogsLoading] = useState(false)

  const fetchLogs = useCallback(async (pwd: string) => {
    setLogsLoading(true)
    try {
      const res = await fetch('/api/admin/logs', {
        headers: { Authorization: `Bearer ${pwd}` },
      })
      if (res.ok) {
        const data = await res.json()
        setLogs(data.logs ?? [])
      }
    } catch {
      // logs son auxiliares, no bloquean
    } finally {
      setLogsLoading(false)
    }
  }, [])

  const fetchInscritos = useCallback(async (pwd: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/inscritos', {
        headers: { Authorization: `Bearer ${pwd}` },
      })
      if (res.status === 401) {
        setError('Contraseña incorrecta')
        sessionStorage.removeItem(SESSION_KEY)
        setSavedPassword(null)
        return
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(`Error del servidor (${res.status}): ${body.error ?? 'desconocido'}`)
        return
      }
      const data = await res.json()
      setInscritos(data.inscritos ?? [])
      sessionStorage.setItem(SESSION_KEY, pwd)
      setSavedPassword(pwd)
      fetchLogs(pwd)
    } catch (err) {
      setError(`Error de red: ${err instanceof Error ? err.message : 'no se pudo conectar'}`)
    } finally {
      setLoading(false)
    }
  }, [fetchLogs])

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored) {
      setSavedPassword(stored)
      fetchInscritos(stored)
    }
  }, [fetchInscritos])

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchInscritos(password)
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setSavedPassword(null)
    setInscritos([])
    setPassword('')
    setLogs([])
  }

  const showRowMessage = (id: string, text: string, ok: boolean) => {
    setRowMessage({ id, text, ok })
    setTimeout(() => setRowMessage(null), 3000)
  }

  const handleDelete = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Eliminar el registro de ${nombre}? Esta acción no se puede deshacer.`)) return
    setLoadingRow({ id, action: 'delete' })
    try {
      const res = await fetch(`/api/admin/inscritos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${savedPassword}` },
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        showRowMessage(id, body.error ?? 'Error al eliminar', false)
        return
      }
      setInscritos((prev) => prev.filter((i) => i.id !== id))
      fetchLogs(savedPassword!)
    } catch {
      showRowMessage(id, 'Error de red', false)
    } finally {
      setLoadingRow(null)
    }
  }

  const handleResendEmail = async (id: string) => {
    setLoadingRow({ id, action: 'resend' })
    try {
      const res = await fetch('/api/admin/reenviar-email', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${savedPassword}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        showRowMessage(id, body.error ?? 'Error al reenviar', false)
        return
      }
      showRowMessage(id, 'Email enviado', true)
      setInscritos((prev) => prev.map((i) => (i.id === id ? { ...i, mail_sent: true } : i)))
      fetchLogs(savedPassword!)
    } catch {
      showRowMessage(id, 'Error de red', false)
    } finally {
      setLoadingRow(null)
    }
  }

  const handleToggleAttendance = async (id: string, attended: boolean) => {
    setLoadingRow({ id, action: 'attend' })
    try {
      const res = await fetch(`/api/admin/inscritos/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${savedPassword}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attended }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        showRowMessage(id, body.error ?? 'Error al actualizar asistencia', false)
        return
      }
      setInscritos((prev) => prev.map((i) => (i.id === id ? { ...i, attended } : i)))
      fetchLogs(savedPassword!)
    } catch {
      showRowMessage(id, 'Error de red', false)
    } finally {
      setLoadingRow(null)
    }
  }

  const openEditModal = (inscrito: Inscrito) => {
    setEditingInscrito(inscrito)
    setEditForm({
      nombre: inscrito.nombre,
      profesion: inscrito.profesion ?? '',
      institucion: inscrito.institucion ?? '',
    })
    setEditError('')
  }

  const handleEditSave = async () => {
    if (!editingInscrito) return
    if (!editForm.nombre.trim()) {
      setEditError('El nombre no puede estar vacío')
      return
    }
    setEditSaving(true)
    setEditError('')
    try {
      const res = await fetch(`/api/admin/inscritos/${editingInscrito.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${savedPassword}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: editForm.nombre.trim(),
          profesion: editForm.profesion.trim(),
          institucion: editForm.institucion.trim(),
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        setEditError(body.error ?? 'Error al guardar')
        return
      }
      const updated: Inscrito = body.inscrito
      setInscritos((prev) => prev.map((i) => (i.id === updated.id ? { ...i, ...updated } : i)))
      setEditingInscrito(null)
      fetchLogs(savedPassword!)
    } catch {
      setEditError('Error de red')
    } finally {
      setEditSaving(false)
    }
  }

  const exportCSV = () => {
    const headers = [
      'Nombre', 'Email', 'DNI', 'Institución', 'Profesión',
      'Es Abogado', 'Jurisdicción', 'Otra Jurisdicción', 'N° Matrícula',
      'Asistió', 'Mail Enviado', 'Fecha de Registro',
    ]
    const rows = inscritos.map((i) => [
      i.nombre, i.email, i.dni,
      i.institucion ?? '', i.profesion ?? '',
      i.esAbogado ? 'Sí' : 'No',
      i.jurisdiccionMatricula ?? '', i.otraJurisdiccion ?? '', i.numeroMatricula ?? '',
      i.attended ? 'Sí' : 'No', i.mail_sent ? 'Sí' : 'No',
      new Date(i.createdAt).toLocaleString('es-AR'),
    ])
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inscritos-simposio-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = useMemo(() => {
    let list = inscritos
    if (filterAbogado === 'si') list = list.filter((i) => i.esAbogado)
    if (filterAbogado === 'no') list = list.filter((i) => !i.esAbogado)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (i) =>
          i.nombre.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.dni.toLowerCase().includes(q) ||
          (i.institucion ?? '').toLowerCase().includes(q),
      )
    }
    return list
  }, [inscritos, filterAbogado, searchQuery])

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  if (!savedPassword) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-sky-800 mb-1">Panel de Administración</h1>
            <p className="text-sm text-slate-500">Simposio 2026</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 bg-slate-50"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modal de edición */}
      {editingInscrito && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Editar inscripto</h2>
              <button
                onClick={() => setEditingInscrito(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-xs text-slate-400">
                DNI: <span className="font-mono text-slate-600">{editingInscrito.dni}</span>
                {' · '}Email: <span className="text-slate-600">{editingInscrito.email}</span>
              </p>
              <div className="space-y-1">
                <label htmlFor="edit-nombre" className="text-sm font-medium text-slate-700">
                  Nombre completo
                </label>
                <input
                  id="edit-nombre"
                  type="text"
                  value={editForm.nombre}
                  onChange={(e) => setEditForm((f) => ({ ...f, nombre: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 bg-slate-50 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="edit-profesion" className="text-sm font-medium text-slate-700">
                  Profesión
                </label>
                <input
                  id="edit-profesion"
                  type="text"
                  value={editForm.profesion}
                  onChange={(e) => setEditForm((f) => ({ ...f, profesion: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 bg-slate-50 text-sm"
                  placeholder="opcional"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="edit-institucion" className="text-sm font-medium text-slate-700">
                  Institución
                </label>
                <input
                  id="edit-institucion"
                  type="text"
                  value={editForm.institucion}
                  onChange={(e) => setEditForm((f) => ({ ...f, institucion: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 bg-slate-50 text-sm"
                  placeholder="opcional"
                />
              </div>
              {editError && <p className="text-sm text-red-600">{editError}</p>}
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setEditingInscrito(null)}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditSave}
                disabled={editSaving}
                className="px-4 py-2 text-sm font-semibold bg-sky-700 hover:bg-sky-800 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {editSaving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-sky-800">Panel de Administración</h1>
            <p className="text-sm text-slate-500">Primer Simposio Americano y Europeo de Victimología Penal — 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              disabled={inscritos.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-40"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar CSV
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Inscriptos</p>
            <p className="text-5xl font-bold text-sky-800">{inscritos.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">Emails Enviados</p>
            <p className="text-5xl font-bold text-emerald-700">{inscritos.filter((i) => i.mail_sent).length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">Abogados / CPACF</p>
            <p className="text-5xl font-bold text-indigo-700">{inscritos.filter((i) => i.esAbogado).length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">Asistentes</p>
            <p className="text-5xl font-bold text-teal-700">{inscritos.filter((i) => i.attended).length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <h2 className="font-semibold text-slate-800 whitespace-nowrap">
              Lista de Inscriptos
              {(filterAbogado !== 'all' || searchQuery) && (
                <span className="ml-2 text-sm font-normal text-slate-500">
                  ({filtered.length} de {inscritos.length})
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
              {/* Buscador global */}
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, email o DNI…"
                  className="w-full pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <label className="text-sm text-slate-500 whitespace-nowrap">Filtrar:</label>
              <select
                value={filterAbogado}
                onChange={(e) => setFilterAbogado(e.target.value as FilterAbogado)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">Todos</option>
                <option value="si">Solo abogados</option>
                <option value="no">No abogados</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">#</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Nombre</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">DNI</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Institución</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Abogado</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Asistencia</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Mail</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Fecha</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((inscrito, index) => {
                    const isDeleting = loadingRow?.id === inscrito.id && loadingRow.action === 'delete'
                    const isResending = loadingRow?.id === inscrito.id && loadingRow.action === 'resend'
                    const isAttending = loadingRow?.id === inscrito.id && loadingRow.action === 'attend'
                    const isBusy = loadingRow?.id === inscrito.id
                    const msg = rowMessage?.id === inscrito.id ? rowMessage : null

                    return (
                      <tr
                        key={inscrito.id}
                        className={`hover:bg-slate-50 transition-colors ${isDeleting ? 'opacity-40' : ''}`}
                      >
                        <td className="px-4 py-3 text-slate-400">{filtered.length - index}</td>
                        <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{inscrito.nombre}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{inscrito.email}</td>
                        <td className="px-4 py-3 text-slate-600 font-mono">{inscrito.dni}</td>
                        <td className="px-4 py-3 text-slate-600">
                          {inscrito.institucion ?? <span className="text-slate-300">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          {inscrito.esAbogado ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
                              {inscrito.jurisdiccionMatricula ?? 'Sí'}
                            </span>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                        {/* Columna Asistencia */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleToggleAttendance(inscrito.id, !inscrito.attended)}
                            disabled={isBusy}
                            title={inscrito.attended ? 'Marcar como ausente' : 'Marcar como presente'}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors disabled:opacity-40 ${
                              inscrito.attended
                                ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
                                : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            {isAttending ? (
                              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin inline-block" />
                            ) : inscrito.attended ? (
                              <>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                Presente
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Ausente
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          {inscrito.mail_sent ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              Enviado
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">Pendiente</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                          {new Date(inscrito.createdAt).toLocaleDateString('es-AR', {
                            day: '2-digit', month: '2-digit', year: '2-digit',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3">
                          {msg ? (
                            <span className={`text-xs font-medium ${msg.ok ? 'text-emerald-600' : 'text-red-500'}`}>
                              {msg.text}
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {/* Editar */}
                              <button
                                onClick={() => openEditModal(inscrito)}
                                disabled={isBusy}
                                title="Editar datos del inscripto"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors disabled:opacity-40"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Editar
                              </button>
                              {/* Reenviar */}
                              <button
                                onClick={() => handleResendEmail(inscrito.id)}
                                disabled={isBusy}
                                title="Reenviar email de confirmación"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-md transition-colors disabled:opacity-40"
                              >
                                {isResending ? (
                                  <span className="w-3 h-3 border-2 border-sky-600 border-t-transparent rounded-full animate-spin inline-block" />
                                ) : (
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                )}
                                Reenviar
                              </button>
                              {/* Borrar */}
                              <button
                                onClick={() => handleDelete(inscrito.id, inscrito.nombre)}
                                disabled={isBusy}
                                title="Eliminar registro"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors disabled:opacity-40"
                              >
                                {isDeleting ? (
                                  <span className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin inline-block" />
                                ) : (
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                )}
                                Borrar
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-slate-400">
                  {inscritos.length === 0
                    ? 'No hay inscriptos registrados aún.'
                    : 'Ningún resultado para el filtro aplicado.'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Logs de actividad */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Registro de Actividad</h2>
            <button
              onClick={() => fetchLogs(savedPassword!)}
              disabled={logsLoading}
              className="text-xs text-sky-600 hover:text-sky-800 border border-sky-200 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
            >
              {logsLoading ? 'Cargando…' : 'Actualizar'}
            </button>
          </div>
          {logsLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              No hay actividad registrada aún.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Fecha y hora</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Acción</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500 whitespace-nowrap">Inscripto</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">Detalle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono text-xs">
                        {new Date(log.createdAt).toLocaleString('es-AR', {
                          day: '2-digit', month: '2-digit', year: '2-digit',
                          hour: '2-digit', minute: '2-digit', second: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${LOG_BADGE[log.accion] ?? 'bg-slate-100 text-slate-600'}`}>
                          {LOG_LABEL[log.accion] ?? log.accion}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap font-medium">
                        {log.inscritoNombre}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {log.detalle ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
