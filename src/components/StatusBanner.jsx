const messages = {
  success: '✅ Payment successful — thank you! We will contact you shortly.',
  cancelled: 'Payment cancelled. You can try again anytime.',
};

export default function StatusBanner() {
  const status = new URLSearchParams(window.location.search).get('status');
  if (!messages[status]) return null;
  return <div className={`banner ${status}`}>{messages[status]}</div>;
}
