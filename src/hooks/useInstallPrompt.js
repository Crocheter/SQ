import { useEffect, useState } from 'react'

// Captures the browser's native "Add to Home Screen" prompt (fired as
// 'beforeinstallprompt' on Chrome/Edge/Android) so a normal button can
// trigger it. iOS Safari never fires this event — there's no API for it —
// so `canInstall` will stay false there and callers should fall back to
// showing manual instructions instead.
export default function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }
    const handleInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const promptInstall = async () => {
    if (!deferredPrompt) return 'unavailable'
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    return outcome // 'accepted' | 'dismissed'
  }

  return { canInstall: Boolean(deferredPrompt) && !installed, installed, promptInstall }
}
