import { MAINTENANCE_HTML } from './maintenance'

function isMaintenanceEnabled(value: string | undefined): boolean {
  return value === 'true' || value === '1'
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (isMaintenanceEnabled(env.MAINTENANCE_MODE)) {
      return new Response(MAINTENANCE_HTML, {
        status: 503,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
          'Retry-After': '3600',
        },
      })
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
