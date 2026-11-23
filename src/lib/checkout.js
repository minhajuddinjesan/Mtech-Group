export async function startCheckout(serviceId) {
  let res;
  try {
    res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId }),
    });
  } catch {
    throw new Error('Cannot reach the payment server. Please try again.');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
  window.location.assign(data.url);
}
