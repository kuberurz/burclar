import { useState, useEffect } from "react";

const SIGNS = [
  { name: "Koç", en: "Aries", symbol: "♈", dates: "21 Mar – 19 Nis", element: "Ateş", stone: "Kırmızı Akik", stoneEmoji: "🔴" },
  { name: "Boğa", en: "Taurus", symbol: "♉", dates: "20 Nis – 20 May", element: "Toprak", stone: "Zümrüt", stoneEmoji: "💚" },
  { name: "İkizler", en: "Gemini", symbol: "♊", dates: "21 May – 20 Haz", element: "Hava", stone: "Akvamarin", stoneEmoji: "🔵" },
  { name: "Yengeç", en: "Cancer", symbol: "♋", dates: "21 Haz – 22 Tem", element: "Su", stone: "İnci", stoneEmoji: "⚪" },
  { name: "Aslan", en: "Leo", symbol: "♌", dates: "23 Tem – 22 Ağu", element: "Ateş", stone: "Altın Topaz", stoneEmoji: "🟡" },
  { name: "Başak", en: "Virgo", symbol: "♍", dates: "23 Ağu – 22 Eyl", element: "Toprak", stone: "Yeşim", stoneEmoji: "💚" },
  { name: "Terazi", en: "Libra", symbol: "♎", dates: "23 Eyl – 22 Eki", element: "Hava", stone: "Opal", stoneEmoji: "🌈" },
  { name: "Akrep", en: "Scorpio", symbol: "♏", dates: "23 Eki – 21 Kas", element: "Su", stone: "Obsidyen", stoneEmoji: "⚫" },
  { name: "Yay", en: "Sagittarius", symbol: "♐", dates: "22 Kas – 21 Ara", element: "Ateş", stone: "Turkuaz", stoneEmoji: "🩵" },
  { name: "Oğlak", en: "Capricorn", symbol: "♑", dates: "22 Ara – 19 Oca", element: "Toprak", stone: "Oniks", stoneEmoji: "🖤" },
  { name: "Kova", en: "Aquarius", symbol: "♒", dates: "20 Oca – 18 Şub", element: "Hava", stone: "Ametist", stoneEmoji: "💜" },
  { name: "Balık", en: "Pisces", symbol: "♓", dates: "19 Şub – 20 Mar", element: "Su", stone: "Aytaşı", stoneEmoji: "🔮" },
];

const LUCK_COLORS = [
  { name: "Derin Mor", hex: "#7B2D8B", emoji: "💜" },
  { name: "Gül Altını", hex: "#C9956C", emoji: "🌹" },
  { name: "Zümrüt Yeşili", hex: "#2D8B6E", emoji: "💚" },
  { name: "Safir Mavisi", hex: "#2D5F8B", emoji: "💙" },
  { name: "Yakut Kırmızısı", hex: "#8B2D2D", emoji: "❤️" },
  { name: "Altın Sarısı", hex: "#C9A84C", emoji: "✨" },
  { name: "Gümüş", hex: "#8B8B9E", emoji: "🩶" },
  { name: "Buz Mavisi", hex: "#6ECFCF", emoji: "🩵" },
];

const COMPATIBILITY = {
  "Koç": { best: ["Aslan", "Yay", "İkizler"], ok: ["Kova", "Yengeç"], hard: ["Oğlak", "Terazi"] },
  "Boğa": { best: ["Başak", "Oğlak", "Yengeç"], ok: ["Balık", "Koç"], hard: ["Kova", "Aslan"] },
  "İkizler": { best: ["Terazi", "Kova", "Koç"], ok: ["Aslan", "Yay"], hard: ["Başak", "Balık"] },
  "Yengeç": { best: ["Akrep", "Balık", "Boğa"], ok: ["Başak", "Oğlak"], hard: ["Koç", "Terazi"] },
  "Aslan": { best: ["Koç", "Yay", "İkizler"], ok: ["Terazi", "İkizler"], hard: ["Akrep", "Kova"] },
  "Başak": { best: ["Boğa", "Oğlak", "Yengeç"], ok: ["Akrep", "Balık"], hard: ["İkizler", "Yay"] },
  "Terazi": { best: ["İkizler", "Kova", "Aslan"], ok: ["Koç", "Yengeç"], hard: ["Oğlak", "Balık"] },
  "Akrep": { best: ["Yengeç", "Balık", "Başak"], ok: ["Oğlak", "Boğa"], hard: ["Aslan", "Kova"] },
  "Yay": { best: ["Koç", "Aslan", "Kova"], ok: ["Terazi", "İkizler"], hard: ["Başak", "Boğa"] },
  "Oğlak": { best: ["Boğa", "Başak", "Akrep"], ok: ["Yengeç", "Balık"], hard: ["Koç", "Terazi"] },
  "Kova": { best: ["İkizler", "Terazi", "Yay"], ok: ["Koç", "Yay"], hard: ["Boğa", "Akrep"] },
  "Balık": { best: ["Yengeç", "Akrep", "Başak"], ok: ["Oğlak", "Boğa"], hard: ["İkizler", "Yay"] },
};

function getCompatibilityScore(s1, s2) {
  if (!s1 || !s2 || s1 === s2) return null;
  const c = COMPATIBILITY[s1.name];
  if (c.best.includes(s2.name)) return { score: 95, label: "Mükemmel Uyum", emoji: "💞", color: "#C9956C" };
  if (c.ok.includes(s2.name)) return { score: 70, label: "İyi Uyum", emoji: "💛", color: "#C9A84C" };
  if (c.hard.includes(s2.name)) return { score: 40, label: "Zorlu İlişki", emoji: "⚡", color: "#8B2D2D" };
  return { score: 60, label: "Orta Uyum", emoji: "🤝", color: "#7B2D8B" };
}

function Stars({ dark }) {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5, delay: Math.random() * 5,
  }));
  if (!dark) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "white", opacity: 0.4,
          animation: `twinkle ${3 + s.delay}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}
    </div>
  );
}

function LoadingSpinner({ color }) {
  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        border: `2px solid rgba(201,149,108,0.15)`,
        borderTop: `2px solid ${color || "#C9956C"}`,
        animation: "spin 1s linear infinite", margin: "0 auto 16px",
      }} />
      <p style={{ fontSize: 14, fontStyle: "italic", opacity: 0.5, letterSpacing: "0.06em" }}>
        Yıldızlar konuşuyor...
      </p>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("home");
  const [selectedSign, setSelectedSign] = useState(null);
  const [view, setView] = useState("grid"); // grid | result
  const [horoscope, setHoroscope] = useState("");
  const [weeklyHoroscope, setWeeklyHoroscope] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState("daily");
  const [luckData, setLuckData] = useState(null);

  // Uyumluluk
  const [sign1, setSign1] = useState(null);
  const [sign2, setSign2] = useState(null);
  const [compat, setCompat] = useState(null);
  const [compatText, setCompatText] = useState("");
  const [compatLoading, setCompatLoading] = useState(false);

  // Evet/Hayır
  const [yesNoQ, setYesNoQ] = useState("");
  const [yesNoResult, setYesNoResult] = useState(null);
  const [yesNoLoading, setYesNoLoading] = useState(false);

  // Yükselen
  const [risingBirthSign, setRisingBirthSign] = useState(null);
  const [birthHour, setBirthHour] = useState("");
  const [birthMinute, setBirthMinute] = useState("00");
  const [risingSign, setRisingSign] = useState(null);
  const [risingReading, setRisingReading] = useState("");
  const [risingLoading, setRisingLoading] = useState(false);

  const today = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

  const th = {
    bg: dark ? "#0D0918" : "#F5F0FF",
    card: dark ? "rgba(255,255,255,0.06)" : "rgba(123,45,139,0.07)",
    border: dark ? "rgba(201,149,108,0.25)" : "rgba(123,45,139,0.2)",
    text: dark ? "#EDE0D4" : "#1E0E2E",
    sub: dark ? "rgba(237,224,212,0.55)" : "rgba(30,14,46,0.55)",
    accent: dark ? "#C9956C" : "#8B3FA8",
    purple: dark ? "#9B4DBB" : "#6B1F8B",
    gold: dark ? "#C9A84C" : "#8B6B1F",
    tabBg: dark ? "rgba(13,9,24,0.97)" : "rgba(245,240,255,0.97)",
    inputBg: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
    placeholder: dark ? "rgba(237,224,212,0.3)" : "rgba(30,14,46,0.35)",
  };

  function generateLuck() {
    const num = Math.floor(Math.random() * 99) + 1;
    const color = LUCK_COLORS[Math.floor(Math.random() * LUCK_COLORS.length)];
    return { num, color };
  }

  async function getHoroscope(sign) {
    setSelectedSign(sign);
    setView("result");
    setLoading(true);
    setHoroscope("");
    setWeeklyHoroscope("");
    setActiveResultTab("daily");
    setLuckData(generateLuck());
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Sen mistik ve bilge bir astroloji uzmanısın. Bugün ${today} için ${sign.name} burcu günlük yorumu yaz. Şu bölümleri içersin:

🌟 Genel Enerji (2-3 cümle)
❤️ Aşk & İlişkiler (2 cümle)
💼 Kariyer & Para (2 cümle)
🌿 Sağlık & Enerji (1-2 cümle)
🔮 Günün Mesajı (1 güçlü cümle)

Mistik, içten ve ilham verici bir dil kullan. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      setHoroscope(data.content?.[0]?.text || "Yorum alınamadı.");
    } catch { setHoroscope("Bağlantı hatası. Lütfen tekrar deneyin."); }
    setLoading(false);
  }

  async function getWeekly(sign) {
    setWeeklyHoroscope("");
    setActiveResultTab("weekly");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `${sign.name} burcu için bu haftanın Türkçe astroloji yorumunu yaz. Pazartesi'den Pazar'a her gün için kısa bir enerji notu (1 cümle) yaz, sonra haftalık genel özet yaz (3-4 cümle). Mistik bir dil kullan. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      setWeeklyHoroscope(data.content?.[0]?.text || "Yorum alınamadı.");
    } catch { setWeeklyHoroscope("Bağlantı hatası."); }
    setLoading(false);
  }

  async function checkCompatibility() {
    if (!sign1 || !sign2) return;
    const result = getCompatibilityScore(sign1, sign2);
    setCompat(result);
    setCompatText("");
    setCompatLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          messages: [{
            role: "user",
            content: `${sign1.name} ve ${sign2.name} burcları arasındaki ilişki uyumunu Türkçe anlat. 3-4 cümle, mistik ve samimi bir dil kullan. Güçlü yönleri ve dikkat edilmesi gerekenleri belirt. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      setCompatText(data.content?.[0]?.text || "");
    } catch { setCompatText("Bağlantı hatası."); }
    setCompatLoading(false);
  }

  async function askYesNo() {
    if (!yesNoQ.trim()) return;
    setYesNoLoading(true);
    setYesNoResult(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          messages: [{
            role: "user",
            content: `Sen mistik bir fal bakıcısısın. Kullanıcının sorusu: "${yesNoQ}"
            
Önce "EVET" ya da "HAYIR" ile başla (büyük harfle), sonra 2-3 cümlelik mistik bir açıklama yap. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const isYes = text.toUpperCase().startsWith("EVET");
      setYesNoResult({ answer: isYes ? "EVET" : "HAYIR", text, isYes });
    } catch { setYesNoResult({ answer: "HATA", text: "Bağlantı hatası.", isYes: false }); }
    setYesNoLoading(false);
  }

  // Yükselen burç hesaplama (doğum saatine göre yaklaşık)
  function calcRisingSign(birthSign, hour, minute) {
    const signIndex = SIGNS.findIndex(s => s.name === birthSign.name);
    const totalMinutes = parseInt(hour) * 60 + parseInt(minute || 0);
    // Her 2 saatte bir burç değişir (yaklaşık). 6:00 = Yükselen = Güneş burcu
    const offset = Math.floor(totalMinutes / 120);
    const risingIndex = (signIndex + offset) % 12;
    return SIGNS[risingIndex];
  }

  async function getRisingReading() {
    if (!risingBirthSign || birthHour === "") return;
    const rising = calcRisingSign(risingBirthSign, birthHour, birthMinute);
    setRisingSign(rising);
    setRisingReading("");
    setRisingLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Sen deneyimli bir astroloji uzmanısın. Kişinin doğum burcu ${risingBirthSign.name}, yükselen burcu ise ${rising.name}. 

Şu başlıkları Türkçe olarak yaz:

⭐ Doğum Burcu × Yükselen Etkisi (2-3 cümle — bu iki burcun birlikte nasıl bir enerji yarattığını anlat)
🌅 Dış Dünyaya Yansıman (2 cümle — yükselen burcun kişiyi dışarıdan nasıl gösterdiği)
💫 Güçlü Yanların (2 cümle — bu kombinasyonun avantajları)
🌑 Dikkat Etmen Gerekenler (1-2 cümle)
🔮 Senin İçin Mesaj (1 güçlü, kişisel cümle)

Mistik, samimi ve ilham verici bir dil kullan. Markdown kullanma.`
          }]
        })
      });
      const data = await res.json();
      setRisingReading(data.content?.[0]?.text || "Yorum alınamadı.");
    } catch { setRisingReading("Bağlantı hatası. Lütfen tekrar deneyin."); }
    setRisingLoading(false);
  }

  const tabs = [
    { id: "home", icon: "✦", label: "Burçlar" },
    { id: "compat", icon: "♾", label: "Uyum" },
    { id: "yesno", icon: "🔮", label: "Fal" },
    { id: "rising", icon: "🌅", label: "Yükselen" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${th.bg}; transition: background 0.4s; }
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:0.8} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(201,149,108,0.2)} 50%{box-shadow:0 0 40px rgba(201,149,108,0.5)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        .sign-pill:hover { transform: translateY(-2px); opacity: 1 !important; }
        .tab-btn:hover { opacity: 1 !important; }
        textarea:focus { outline: none; }
        input:focus { outline: none; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        textarea::placeholder { color: ${th.placeholder}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(201,149,108,0.3); border-radius: 2px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: th.bg, color: th.text, fontFamily: "'Jost', sans-serif", position: "relative", transition: "background 0.4s" }}>
        <Stars dark={dark} />

        <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", position: "relative", zIndex: 1, paddingBottom: 80 }}>

          {/* Top Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 0" }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: th.accent, letterSpacing: "0.08em" }}>KUBER BURÇLAR</h1>
              <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.2em", textTransform: "uppercase" }}>{today}</p>
            </div>
            <button onClick={() => setDark(!dark)} style={{
              background: th.card, border: `1px solid ${th.border}`,
              borderRadius: 20, padding: "8px 14px", cursor: "pointer",
              color: th.text, fontSize: 16, transition: "all 0.3s",
            }}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          {/* ——— HOME TAB ——— */}
          {tab === "home" && (
            <>
              {view === "grid" && (
                <div style={{ animation: "fadeUp 0.5s ease", padding: "24px 16px 0" }}>
                  <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <div style={{ fontSize: 52, marginBottom: 8, animation: "glow 3s ease-in-out infinite" }}>✦</div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: th.sub }}>
                      Burcunu seç, yıldızların rehberliğine bak
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                    {SIGNS.map((s, i) => (
                      <div key={s.name} className="sign-pill" onClick={() => getHoroscope(s)} style={{
                        background: th.card, border: `1px solid ${th.border}`,
                        borderRadius: 18, padding: "18px 8px", textAlign: "center",
                        cursor: "pointer", transition: "transform 0.2s ease",
                        animation: `fadeUp 0.4s ease ${i * 0.04}s both`,
                      }}>
                        <div style={{ fontSize: 28, marginBottom: 5 }}>{s.symbol}</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, color: th.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.name}</div>
                        <div style={{ fontSize: 9, color: th.sub, marginTop: 3, letterSpacing: "0.02em" }}>{s.dates}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === "result" && selectedSign && (
                <div style={{ animation: "fadeUp 0.5s ease" }}>
                  {/* Back */}
                  <div style={{ padding: "16px 20px 0" }}>
                    <button onClick={() => { setView("grid"); setHoroscope(""); }} style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: th.sub, fontSize: 13, letterSpacing: "0.1em",
                      fontFamily: "'Jost', sans-serif",
                    }}>← Geri</button>
                  </div>

                  {/* Sign Hero */}
                  <div style={{ textAlign: "center", padding: "20px 24px 16px" }}>
                    <div style={{ fontSize: 64, marginBottom: 8, filter: "drop-shadow(0 0 20px rgba(201,149,108,0.5))" }}>{selectedSign.symbol}</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: th.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {selectedSign.name.toUpperCase()}
                    </h2>
                    <p style={{ fontSize: 12, color: th.sub, marginTop: 4 }}>{selectedSign.element} Burcu · {selectedSign.dates}</p>
                  </div>

                  {/* Luck Cards */}
                  {luckData && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "0 16px 16px" }}>
                      {[
                        { label: "Şans Sayısı", value: luckData.num, icon: "🔢" },
                        { label: "Şans Rengi", value: luckData.color.name, icon: luckData.color.emoji },
                        { label: "Şans Taşı", value: selectedSign.stone, icon: selectedSign.stoneEmoji },
                      ].map(c => (
                        <div key={c.label} style={{
                          background: th.card, border: `1px solid ${th.border}`,
                          borderRadius: 14, padding: "12px 8px", textAlign: "center",
                        }}>
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{c.icon}</div>
                          <div style={{ fontSize: 11, fontWeight: 500, color: th.accent, marginBottom: 3 }}>{c.label}</div>
                          <div style={{ fontSize: 12, color: th.text, fontFamily: "'Playfair Display', serif" }}>{c.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Daily / Weekly Tabs */}
                  <div style={{ display: "flex", gap: 8, padding: "0 16px 16px" }}>
                    {[{ id: "daily", label: "Günlük" }, { id: "weekly", label: "Haftalık" }].map(t => (
                      <button key={t.id} onClick={() => {
                        if (t.id === "weekly" && !weeklyHoroscope && !loading) getWeekly(selectedSign);
                        else setActiveResultTab(t.id);
                      }} style={{
                        flex: 1, padding: "10px", borderRadius: 12, cursor: "pointer",
                        border: `1px solid ${activeResultTab === t.id ? th.accent : th.border}`,
                        background: activeResultTab === t.id ? `rgba(201,149,108,0.15)` : th.card,
                        color: activeResultTab === t.id ? th.accent : th.sub,
                        fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 500,
                        transition: "all 0.2s",
                      }}>{t.label}</button>
                    ))}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "0 16px" }}>
                    {loading ? <LoadingSpinner color={th.accent} /> : (
                      <div style={{
                        background: th.card, border: `1px solid ${th.border}`,
                        borderRadius: 20, padding: "24px 18px",
                        fontSize: 15, lineHeight: 1.9, color: th.text,
                        whiteSpace: "pre-wrap", animation: "scaleIn 0.4s ease",
                      }}>
                        {activeResultTab === "daily" ? horoscope : (weeklyHoroscope || "Haftalık yorum yükleniyor...")}
                      </div>
                    )}

                    {!loading && (
                      <div style={{ textAlign: "center", marginTop: 16 }}>
                        <button onClick={() => {
                          if (activeResultTab === "daily") getHoroscope(selectedSign);
                          else getWeekly(selectedSign);
                        }} style={{
                          background: "none", border: `1px solid ${th.border}`,
                          borderRadius: 30, padding: "10px 24px", cursor: "pointer",
                          color: th.accent, fontSize: 13, letterSpacing: "0.1em",
                          fontFamily: "'Jost', sans-serif",
                        }}>✦ Yenile</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ——— UYUMLULUK TAB ——— */}
          {tab === "compat" && (
            <div style={{ padding: "24px 16px 0", animation: "fadeUp 0.5s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>♾</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: th.accent }}>Burç Uyumu</h2>
                <p style={{ fontSize: 13, color: th.sub, marginTop: 6, fontStyle: "italic" }}>İki burç seç, yıldızların yorumunu gör</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Birinci Burç", val: sign1, set: setSign1 },
                  { label: "İkinci Burç", val: sign2, set: setSign2 },
                ].map(({ label, val, set }) => (
                  <div key={label}>
                    <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.1em", marginBottom: 8, textTransform: "uppercase" }}>{label}</p>
                    <div style={{
                      background: th.card, border: `1px solid ${val ? th.accent : th.border}`,
                      borderRadius: 14, padding: "12px", textAlign: "center",
                      minHeight: 70, display: "flex", alignItems: "center", justifyContent: "center",
                      flexDirection: "column",
                    }}>
                      {val ? (
                        <>
                          <div style={{ fontSize: 28 }}>{val.symbol}</div>
                          <div style={{ fontSize: 13, color: th.accent, fontFamily: "'Playfair Display', serif", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{val.name}</div>
                        </>
                      ) : (
                        <p style={{ fontSize: 12, color: th.sub }}>Seç ↓</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 20 }}>
                {SIGNS.map(s => (
                  <button key={s.name} onClick={() => {
                    if (!sign1) setSign1(s);
                    else if (!sign2 && s !== sign1) setSign2(s);
                    else if (sign1 && sign2) { setSign1(s); setSign2(null); setCompat(null); setCompatText(""); }
                  }} style={{
                    background: (sign1 === s || sign2 === s) ? `rgba(201,149,108,0.2)` : th.card,
                    border: `1px solid ${(sign1 === s || sign2 === s) ? th.accent : th.border}`,
                    borderRadius: 10, padding: "8px 4px", cursor: "pointer",
                    textAlign: "center", transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 18 }}>{s.symbol}</div>
                    <div style={{ fontSize: 9, color: th.sub, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.03em" }}>{s.name}</div>
                  </button>
                ))}
              </div>

              {sign1 && sign2 && (
                <button onClick={checkCompatibility} style={{
                  width: "100%", padding: "14px", borderRadius: 14, cursor: "pointer",
                  background: `linear-gradient(135deg, ${th.purple}, #C9956C)`,
                  border: "none", color: "white", fontSize: 15, fontFamily: "'Jost', sans-serif",
                  fontWeight: 500, letterSpacing: "0.05em", marginBottom: 20,
                }}>✦ Uyumu Hesapla</button>
              )}

              {compat && (
                <div style={{ animation: "scaleIn 0.4s ease" }}>
                  <div style={{
                    background: th.card, border: `1px solid ${compat.color}`,
                    borderRadius: 20, padding: "24px", textAlign: "center", marginBottom: 12,
                  }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{compat.emoji}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: compat.color, marginBottom: 8 }}>
                      {compat.label}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 12 }}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} style={{
                          width: 24, height: 6, borderRadius: 3,
                          background: i < Math.round(compat.score / 10) ? compat.color : `rgba(201,149,108,0.15)`,
                          transition: "background 0.3s",
                        }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 13, color: th.sub }}>%{compat.score} Uyum</div>
                  </div>

                  {compatLoading ? <LoadingSpinner color={compat.color} /> : (
                    compatText && (
                      <div style={{
                        background: th.card, border: `1px solid ${th.border}`,
                        borderRadius: 16, padding: "18px", fontSize: 14,
                        lineHeight: 1.85, color: th.text, fontStyle: "italic",
                      }}>{compatText}</div>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          {/* ——— EVET/HAYIR TAB ——— */}
          {tab === "yesno" && (
            <div style={{ padding: "24px 16px 0", animation: "fadeUp 0.5s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🔮</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: th.accent }}>Evren'e Sor</h2>
                <p style={{ fontSize: 13, color: th.sub, marginTop: 6, fontStyle: "italic" }}>Aklındaki soruyu yaz, mistik cevabı al</p>
              </div>

              <textarea
                value={yesNoQ}
                onChange={e => setYesNoQ(e.target.value)}
                placeholder="Sorunuzu buraya yazın... (örn: Bu işi kabul etmeli miyim?)"
                style={{
                  width: "100%", minHeight: 100, padding: "16px",
                  background: th.inputBg, border: `1px solid ${th.border}`,
                  borderRadius: 16, color: th.text, fontSize: 14, lineHeight: 1.7,
                  fontFamily: "'Jost', sans-serif", resize: "none",
                  transition: "border-color 0.2s",
                }}
              />

              <button onClick={askYesNo} disabled={!yesNoQ.trim() || yesNoLoading} style={{
                width: "100%", padding: "14px", borderRadius: 14, cursor: "pointer",
                background: yesNoQ.trim() ? `linear-gradient(135deg, ${th.purple}, #C9956C)` : th.card,
                border: `1px solid ${yesNoQ.trim() ? "transparent" : th.border}`,
                color: yesNoQ.trim() ? "white" : th.sub,
                fontSize: 15, fontFamily: "'Jost', sans-serif",
                fontWeight: 500, marginTop: 12, transition: "all 0.3s",
              }}>🔮 Cevabı Göster</button>

              {yesNoLoading && <LoadingSpinner color={th.accent} />}

              {yesNoResult && !yesNoLoading && (
                <div style={{
                  marginTop: 20, animation: "scaleIn 0.5s ease",
                  background: th.card, border: `1px solid ${yesNoResult.isYes ? "#2D8B6E" : "#8B2D2D"}`,
                  borderRadius: 20, padding: "28px 20px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 60, marginBottom: 12 }}>{yesNoResult.isYes ? "✅" : "❌"}</div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif", fontSize: 36,
                    color: yesNoResult.isYes ? "#4CAF82" : "#CF6679",
                    letterSpacing: "0.1em", marginBottom: 16,
                  }}>{yesNoResult.answer}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: th.text, fontStyle: "italic" }}>
                    {yesNoResult.text.replace(/^(EVET|HAYIR)[.!,]?\s*/i, "")}
                  </p>
                  <button onClick={() => { setYesNoResult(null); setYesNoQ(""); }} style={{
                    marginTop: 16, background: "none", border: `1px solid ${th.border}`,
                    borderRadius: 20, padding: "8px 20px", cursor: "pointer",
                    color: th.sub, fontSize: 12, fontFamily: "'Jost', sans-serif",
                  }}>Yeni Soru Sor</button>
                </div>
              )}
            </div>
          )}

          {/* ——— YÜKSELEn TAB ——— */}
          {tab === "rising" && (
            <div style={{ padding: "24px 16px 0", animation: "fadeUp 0.5s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🌅</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: th.accent }}>Yükselen Burcun</h2>
                <p style={{ fontSize: 13, color: th.sub, marginTop: 6, fontStyle: "italic" }}>Doğum burcu + saatini gir, yükselen burcunu keşfet</p>
              </div>

              {/* Doğum Burcu Seçimi */}
              <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>1. Doğum Burcunu Seç</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 20 }}>
                {SIGNS.map(s => (
                  <button key={s.name} onClick={() => { setRisingBirthSign(s); setRisingSign(null); setRisingReading(""); }} style={{
                    background: risingBirthSign === s ? `rgba(201,149,108,0.2)` : th.card,
                    border: `1px solid ${risingBirthSign === s ? th.accent : th.border}`,
                    borderRadius: 10, padding: "8px 4px", cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 18 }}>{s.symbol}</div>
                    <div style={{ fontSize: 9, color: risingBirthSign === s ? th.accent : th.sub, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.03em" }}>{s.name}</div>
                  </button>
                ))}
              </div>

              {/* Saat Girişi */}
              <p style={{ fontSize: 11, color: th.sub, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>2. Doğum Saatini Gir</p>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, color: th.sub, marginBottom: 6 }}>Saat (0-23)</p>
                  <input
                    type="number" min="0" max="23" placeholder="ör: 14"
                    value={birthHour}
                    onChange={e => { setBirthHour(e.target.value); setRisingSign(null); setRisingReading(""); }}
                    style={{
                      width: "100%", padding: "12px 14px",
                      background: th.inputBg, border: `1px solid ${th.border}`,
                      borderRadius: 12, color: th.text, fontSize: 16,
                      fontFamily: "'Jost', sans-serif", textAlign: "center",
                    }}
                  />
                </div>
                <div style={{ fontSize: 24, color: th.sub, marginTop: 18 }}>:</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, color: th.sub, marginBottom: 6 }}>Dakika (0-59)</p>
                  <input
                    type="number" min="0" max="59" placeholder="ör: 30"
                    value={birthMinute}
                    onChange={e => { setBirthMinute(e.target.value); setRisingSign(null); setRisingReading(""); }}
                    style={{
                      width: "100%", padding: "12px 14px",
                      background: th.inputBg, border: `1px solid ${th.border}`,
                      borderRadius: 12, color: th.text, fontSize: 16,
                      fontFamily: "'Jost', sans-serif", textAlign: "center",
                    }}
                  />
                </div>
              </div>
              <p style={{ fontSize: 11, color: th.sub, fontStyle: "italic", marginBottom: 20, textAlign: "center" }}>
                💡 Doğum saatini bilmiyorsan nüfus cüzdanı veya doğum belgesine bakabilirsin
              </p>

              <button
                onClick={getRisingReading}
                disabled={!risingBirthSign || birthHour === "" || risingLoading}
                style={{
                  width: "100%", padding: "14px", borderRadius: 14, cursor: "pointer",
                  background: risingBirthSign && birthHour !== "" ? `linear-gradient(135deg, #1a0a2e, #C9956C)` : th.card,
                  border: `1px solid ${risingBirthSign && birthHour !== "" ? "transparent" : th.border}`,
                  color: risingBirthSign && birthHour !== "" ? "white" : th.sub,
                  fontSize: 15, fontFamily: "'Jost', sans-serif", fontWeight: 500,
                  letterSpacing: "0.05em", marginBottom: 20, transition: "all 0.3s",
                }}
              >🌅 Yükseleni Hesapla</button>

              {risingLoading && <LoadingSpinner color={th.accent} />}

              {risingSign && !risingLoading && (
                <div style={{ animation: "scaleIn 0.5s ease" }}>
                  {/* İki Burç Gösterimi */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 16, marginBottom: 16,
                    background: th.card, border: `1px solid ${th.border}`,
                    borderRadius: 20, padding: "20px",
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 36 }}>{risingBirthSign.symbol}</div>
                      <div style={{ fontSize: 10, color: th.sub, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Doğum</div>
                      <div style={{ fontSize: 13, color: th.accent, fontFamily: "'Playfair Display', serif", fontWeight: 700, textTransform: "uppercase" }}>{risingBirthSign.name}</div>
                    </div>
                    <div style={{ fontSize: 22, color: th.sub }}>×</div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 36 }}>{risingSign.symbol}</div>
                      <div style={{ fontSize: 10, color: th.sub, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Yükselen</div>
                      <div style={{ fontSize: 13, color: th.accent, fontFamily: "'Playfair Display', serif", fontWeight: 700, textTransform: "uppercase" }}>{risingSign.name}</div>
                    </div>
                  </div>

                  {risingReading && (
                    <div style={{
                      background: th.card, border: `1px solid ${th.border}`,
                      borderRadius: 20, padding: "22px 18px",
                      fontSize: 15, lineHeight: 1.9, color: th.text,
                      whiteSpace: "pre-wrap", marginBottom: 16,
                    }}>{risingReading}</div>
                  )}

                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <button onClick={getRisingReading} style={{
                      background: "none", border: `1px solid ${th.border}`,
                      borderRadius: 30, padding: "10px 24px", cursor: "pointer",
                      color: th.accent, fontSize: 13, letterSpacing: "0.1em",
                      fontFamily: "'Jost', sans-serif",
                    }}>✦ Yenile</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Nav */}
          <div style={{
            position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "100%", maxWidth: 430,
            background: th.tabBg, borderTop: `1px solid ${th.border}`,
            backdropFilter: "blur(20px)", display: "flex",
            padding: "10px 0 20px",
          }}>
            {tabs.map(t => (
              <button key={t.id} className="tab-btn" onClick={() => { setTab(t.id); if (t.id === "home") setView("grid"); }} style={{
                flex: 1, background: "none", border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                opacity: tab === t.id ? 1 : 0.4, transition: "opacity 0.2s",
              }}>
                <span style={{ fontSize: 20, color: tab === t.id ? th.accent : th.text }}>{t.icon}</span>
                <span style={{ fontSize: 10, color: tab === t.id ? th.accent : th.sub, letterSpacing: "0.08em", fontWeight: 500 }}>
                  {t.label}
                </span>
                {tab === t.id && <div style={{ width: 20, height: 2, background: th.accent, borderRadius: 1 }} />}
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
