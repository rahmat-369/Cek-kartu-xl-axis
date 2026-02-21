const $ = (id) => document.getElementById(id);
const input = $("number");
const btn = $("btn");
const out = $("out");

function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

function setStatus(ok, payload) {
  out.className = ok ? "ok" : "bad";
  out.textContent = pretty(payload);
}

async function run() {
  const number = input.value.trim();
  btn.disabled = true;
  btn.textContent = "Memproses...";

  try {
    const res = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number }),
    });

    const data = await res.json().catch(() => ({}));
    setStatus(res.ok && data?.success, data);
  } catch (e) {
    setStatus(false, { success: false, message: e.message });
  } finally {
    btn.disabled = false;
    btn.textContent = "Cek";
  }
}

btn.addEventListener("click", run);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") run();
});
