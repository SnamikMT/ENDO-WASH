// js/utils/sendEmailJS.js
export async function sendEmailJS({ 
  serviceId, templateId, publicKey,
  templateData = {}
}) {
  if (!window.emailjs) return { ok:false, error:'EmailJS not loaded' }
  try {
    window.emailjs.init(publicKey)
    const resp = await window.emailjs.send(serviceId, templateId, templateData)
    return { ok:true, resp }
  } catch (e) {
    console.error('EmailJS error:', e)
    return { ok:false, error:String(e) }
  }
}

export function escapeHtml(s=''){
  return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))
}
