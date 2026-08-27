import { useState, useMemo, useEffect } from "react";
import {
  Home,
  TrendingUp,
  CreditCard,
  User,
  Bell,
  Plus,
  X,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Moon,
  Sun,
  Wallet,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ============================================================
   DONNÉES DE RÉFÉRENCE
   ============================================================ */

const CATEGORY_ICONS = {
  Nourriture: "🍔",
  Transport: "🚗",
  Internet: "🌐",
  Shopping: "🛍️",
  Logement: "🏠",
  Salaire: "💰",
  Santé: "💊",
  Loisirs: "🎮",
  Autre: "🔖",
};

const CATEGORY_COLORS = {
  Nourriture: "#f97316",
  Transport: "#3b82f6",
  Internet: "#8b5cf6",
  Shopping: "#ec4899",
  Logement: "#14b8a6",
  Salaire: "#22c55e",
  Santé: "#ef4444",
  Loisirs: "#eab308",
  Autre: "#64748b",
};

const CATEGORIES = Object.keys(CATEGORY_ICONS);
const EXCHANGE_RATE = 2850; // FC pour 1 USD (taux indicatif)

const STORAGE_KEYS = {
  transactions: "mkelo:transactions",
  prefs: "mkelo:prefs",
};

// Génère une date à J-n jours
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(9 + (n % 6), 0, 0, 0);
  return d;
};

const SEED_TRANSACTIONS = [
  { id: 1, type: "revenu", category: "Salaire", description: "Salaire", amount: 500, date: daysAgo(0) },
  { id: 2, type: "depense", category: "Nourriture", description: "Déjeuner", amount: 8, date: daysAgo(0) },
  { id: 3, type: "depense", category: "Transport", description: "Taxi-moto", amount: 4, date: daysAgo(0) },
  { id: 4, type: "depense", category: "Shopping", description: "Vêtements", amount: 32, date: daysAgo(1) },
  { id: 5, type: "depense", category: "Internet", description: "Forfait data", amount: 12, date: daysAgo(2) },
  { id: 6, type: "depense", category: "Nourriture", description: "Marché", amount: 21, date: daysAgo(3) },
  { id: 7, type: "depense", category: "Transport", description: "Bus", amount: 3, date: daysAgo(4) },
  { id: 8, type: "revenu", category: "Autre", description: "Vente d'un objet", amount: 45, date: daysAgo(5) },
  { id: 9, type: "depense", category: "Logement", description: "Facture d'eau", amount: 18, date: daysAgo(6) },
  { id: 10, type: "depense", category: "Santé", description: "Pharmacie", amount: 15, date: daysAgo(8) },
  { id: 11, type: "depense", category: "Nourriture", description: "Restaurant", amount: 27, date: daysAgo(9) },
  { id: 12, type: "depense", category: "Loisirs", description: "Cinéma", amount: 10, date: daysAgo(11) },
  { id: 13, type: "revenu", category: "Autre", description: "Freelance", amount: 120, date: daysAgo(14) },
  { id: 14, type: "depense", category: "Transport", description: "Carburant", amount: 25, date: daysAgo(16) },
  { id: 15, type: "depense", category: "Logement", description: "Loyer", amount: 150, date: daysAgo(18) },
  { id: 16, type: "depense", category: "Shopping", description: "Chaussures", amount: 22, date: daysAgo(21) },
  { id: 17, type: "revenu", category: "Salaire", description: "Salaire (avance)", amount: 200, date: daysAgo(24) },
  { id: 18, type: "depense", category: "Nourriture", description: "Épicerie", amount: 34, date: daysAgo(27) },
];

/* ============================================================
   FONCTIONS UTILITAIRES
   ============================================================ */

function formatRelativeDate(date) {
  const now = new Date();
  const diffDays = Math.floor((now.setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) / 86400000);
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function formatAmount(amountUSD, currency) {
  if (currency === "CDF") {
    const value = Math.round(amountUSD * EXCHANGE_RATE);
    return `${value.toLocaleString("fr-FR")} FC`;
  }
  return `$${amountUSD.toFixed(2)}`;
}

function buildChartData(transactions, period) {
  const now = new Date();

  if (period === "semaine") {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = daysAgo(i);
      days.push({ key: d.toDateString(), label: d.toLocaleDateString("fr-FR", { weekday: "short" }), solde: 0 });
    }
    transactions.forEach((t) => {
      const key = new Date(t.date).toDateString();
      const bucket = days.find((d) => d.key === key);
      if (bucket) bucket.solde += t.type === "revenu" ? t.amount : -t.amount;
    });
    let running = 0;
    return days.map((d) => {
      running += d.solde;
      return { label: d.label, valeur: Math.round(running * 100) / 100 };
    });
  }

  if (period === "mois") {
    const weeks = [];
    for (let i = 3; i >= 0; i--) {
      weeks.push({ label: `S-${i === 0 ? "0" : i}`, from: i * 7 + 6, to: i * 7, solde: 0 });
    }
    transactions.forEach((t) => {
      const diffDays = Math.floor((now - new Date(t.date)) / 86400000);
      const bucket = weeks.find((w) => diffDays <= w.from && diffDays >= w.to);
      if (bucket) bucket.solde += t.type === "revenu" ? t.amount : -t.amount;
    });
    let running = 0;
    return weeks.map((w) => {
      running += w.solde;
      return { label: w.label === "S-0" ? "Cette sem." : w.label, valeur: Math.round(running * 100) / 100 };
    });
  }

  // année
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleDateString("fr-FR", { month: "short" }), solde: 0 });
  }
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = months.find((m) => m.key === key);
    if (bucket) bucket.solde += t.type === "revenu" ? t.amount : -t.amount;
  });
  let running = 0;
  return months.map((m) => {
    running += m.solde;
    return { label: m.label, valeur: Math.round(running * 100) / 100 };
  });
}

async function loadTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.transactions);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.map((t) => ({ ...t, date: new Date(t.date) }));
    }
  } catch (e) {
    // clé absente ou erreur de lecture : on retombe sur les données de démarrage
  }
  return null;
}

async function saveTransactions(transactions) {
  try {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
    return true;
  } catch (e) {
    return false;
  }
}

async function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.prefs);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // pas de préférences enregistrées encore
  }
  return null;
}

async function savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEYS.prefs, JSON.stringify(prefs));
    return true;
  } catch (e) {
    return false;
  }
}

/* ============================================================
   APP
   ============================================================ */

function App() {
  const [theme, setTheme] = useState("clair");
  const [currency, setCurrency] = useState("USD");
  const [activeTab, setActiveTab] = useState("accueil");
  const [showAdd, setShowAdd] = useState(false);
  const [period, setPeriod] = useState("semaine");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("toutes");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [form, setForm] = useState({
    type: "depense",
    category: "Nourriture",
    description: "",
    amount: "",
  });

  // Chargement initial depuis le stockage persistant
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [storedTransactions, storedPrefs] = await Promise.all([loadTransactions(), loadPrefs()]);

      if (cancelled) return;

      if (storedTransactions) {
        setTransactions(storedTransactions);
      } else {
        setTransactions(SEED_TRANSACTIONS);
        saveTransactions(SEED_TRANSACTIONS);
      }

      if (storedPrefs) {
        if (storedPrefs.theme) setTheme(storedPrefs.theme);
        if (storedPrefs.currency) setCurrency(storedPrefs.currency);
      }

      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Sauvegarde automatique des transactions à chaque changement (après le chargement initial)
  useEffect(() => {
    if (isLoading) return;
    saveTransactions(transactions);
  }, [transactions, isLoading]);

  // Sauvegarde automatique des préférences (devise, thème)
  useEffect(() => {
    if (isLoading) return;
    savePrefs({ theme, currency });
  }, [theme, currency, isLoading]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const totalRevenus = useMemo(
    () => transactions.filter((t) => t.type === "revenu").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalDepenses = useMemo(
    () => transactions.filter((t) => t.type === "depense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const solde = totalRevenus - totalDepenses;

  const soldeMoisDernier = useMemo(() => {
    const cutoff = daysAgo(30);
    const anciennes = transactions.filter((t) => new Date(t.date) < cutoff);
    const rev = anciennes.filter((t) => t.type === "revenu").reduce((s, t) => s + t.amount, 0);
    const dep = anciennes.filter((t) => t.type === "depense").reduce((s, t) => s + t.amount, 0);
    return rev - dep;
  }, [transactions]);

  const evolutionPct = useMemo(() => {
    if (soldeMoisDernier === 0) return null;
    return ((solde - soldeMoisDernier) / Math.abs(soldeMoisDernier)) * 100;
  }, [solde, soldeMoisDernier]);

  const chartData = useMemo(() => buildChartData(transactions, "semaine"), [transactions]);
  const evolutionChartData = useMemo(() => buildChartData(transactions, period), [transactions, period]);

  const categoryBreakdown = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === "depense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => (filterType === "toutes" ? true : t.type === filterType))
      .filter((t) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, search, filterType]);

  const recentTransactions = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
    [transactions]
  );

  const validateForm = () => {
    const next = {};
    if (!form.description.trim()) next.description = "Ajoute une courte description.";
    const numAmount = Number(form.amount);
    if (!form.amount || isNaN(numAmount) || numAmount <= 0) next.amount = "Entre un montant valide.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const ajouterTransaction = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const nouvelleTransaction = {
      id: Date.now(),
      type: form.type,
      category: form.category,
      description: form.description.trim(),
      amount: Number(form.amount),
      date: new Date(),
    };

    setTransactions((prev) => [nouvelleTransaction, ...prev]);
    setForm({ type: "depense", category: "Nourriture", description: "", amount: "" });
    setErrors({});
    setShowAdd(false);
    setToast(form.type === "revenu" ? "Revenu ajouté ✅" : "Dépense ajoutée ✅");
  };

  const supprimerTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    setConfirmDeleteId(null);
    setToast("Transaction supprimée 🗑️");
  };

  const reinitialiserDonnees = () => {
    setTransactions(SEED_TRANSACTIONS);
    setShowResetConfirm(false);
    setToast("Données réinitialisées 🔄");
  };

  const renderTransactionRow = (t) => (
    <div className="transaction" key={t.id}>
      <div className="transaction-icon" style={{ background: `${CATEGORY_COLORS[t.category]}1a` }}>
        {CATEGORY_ICONS[t.category] || "🔖"}
      </div>

      <div className="transaction-info">
        <strong>{t.category}</strong>
        <span>{t.description}</span>
        <small>{formatRelativeDate(t.date)}</small>
      </div>

      {confirmDeleteId === t.id ? (
        <div className="confirm-row">
          <button className="confirm-yes" onClick={() => supprimerTransaction(t.id)}>Suppr.</button>
          <button className="confirm-no" onClick={() => setConfirmDeleteId(null)}>Annuler</button>
        </div>
      ) : (
        <>
          <strong className={t.type === "revenu" ? "amount income-text" : "amount expense-text"}>
            {t.type === "revenu" ? "+" : "-"}
            {formatAmount(t.amount, currency)}
          </strong>
          <button
            className="delete-btn"
            aria-label="Supprimer la transaction"
            onClick={() => setConfirmDeleteId(t.id)}
          >
            <Trash2 size={15} />
          </button>
        </>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="app" data-theme={theme}>
        <style>{STYLES}</style>
        <div className="loading-screen">
          <div className="spinner" />
          <p>Chargement de tes données…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app" data-theme={theme}>
      <style>{STYLES}</style>

      {/* ================= HEADER ================= */}
      <header className="header">
        <div>
          <p className="greeting">Bonjour, Alexandre 👋</p>
          <h1>Mkelo</h1>
        </div>
        <button className="notification" aria-label="Notifications">
          <Bell size={19} />
        </button>
      </header>

      {/* ================= ACCUEIL ================= */}
      {activeTab === "accueil" && (
        <main>
          <section className="balance-card">
            <p>Solde actuel</p>
            <h2>{formatAmount(solde, currency)}</h2>
            {evolutionPct !== null && (
              <span className={`balance-change ${evolutionPct >= 0 ? "" : "negative"}`}>
                {evolutionPct >= 0 ? "↗" : "↘"} {evolutionPct >= 0 ? "+" : ""}
                {evolutionPct.toFixed(1)} % depuis le mois dernier
              </span>
            )}
          </section>

          <section className="summary">
            <div className="summary-card income">
              <span className="summary-icon"><ArrowUpRight size={17} /></span>
              <p>Revenus</p>
              <strong>+{formatAmount(totalRevenus, currency)}</strong>
            </div>
            <div className="summary-card expense">
              <span className="summary-icon"><ArrowDownRight size={17} /></span>
              <p>Dépenses</p>
              <strong>-{formatAmount(totalDepenses, currency)}</strong>
            </div>
          </section>

          <section className="card evolution-card">
            <div className="section-header">
              <h2>Évolution de mon argent</h2>
              <button onClick={() => setActiveTab("evolution")}>Voir tout</button>
            </div>

            <div className="chart-placeholder">
              <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={chartData} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="soldeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip currency={currency} />} />
                  <Area type="monotone" dataKey="valeur" stroke="var(--accent)" strokeWidth={3} fill="url(#soldeGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="card transactions-card">
            <div className="section-header">
              <h2>Transactions récentes</h2>
              <button onClick={() => setActiveTab("transactions")}>Voir tout</button>
            </div>

            <div className="transaction-list">
              {recentTransactions.length === 0 ? (
                <EmptyState />
              ) : (
                recentTransactions.map(renderTransactionRow)
              )}
            </div>
          </section>
        </main>
      )}

      {/* ================= EVOLUTION ================= */}
      {activeTab === "evolution" && (
        <main>
          <section className="page-title">
            <h2>Évolution</h2>
            <p>Analyse de ton argent</p>
          </section>

          <section className="card evolution-page">
            <div className="period-buttons">
              {["semaine", "mois", "année"].map((p) => (
                <button
                  key={p}
                  className={period === p ? "active" : ""}
                  onClick={() => setPeriod(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>

            <div className="big-chart">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={evolutionChartData} margin={{ top: 15, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bigGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltip currency={currency} />} />
                  <Area type="monotone" dataKey="valeur" stroke="var(--accent)" strokeWidth={3} fill="url(#bigGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="evolution-stats">
              <div>
                <span>Revenus</span>
                <strong className="income-text">+{formatAmount(totalRevenus, currency)}</strong>
              </div>
              <div>
                <span>Dépenses</span>
                <strong className="expense-text">-{formatAmount(totalDepenses, currency)}</strong>
              </div>
              <div>
                <span>Solde</span>
                <strong>{formatAmount(solde, currency)}</strong>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="section-header">
              <h2>Répartition des dépenses</h2>
            </div>

            {categoryBreakdown.length === 0 ? (
              <EmptyState label="Pas encore de dépenses à répartir" />
            ) : (
              <div className="breakdown">
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={48}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {categoryBreakdown.map((entry) => (
                        <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#94a3b8"} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip currency={currency} />} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="breakdown-legend">
                  {categoryBreakdown.map((entry) => (
                    <div className="legend-row" key={entry.name}>
                      <span className="legend-dot" style={{ background: CATEGORY_COLORS[entry.name] || "#94a3b8" }} />
                      <span className="legend-label">{CATEGORY_ICONS[entry.name]} {entry.name}</span>
                      <span className="legend-value">{formatAmount(entry.value, currency)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      )}

      {/* ================= TRANSACTIONS ================= */}
      {activeTab === "transactions" && (
        <main>
          <section className="page-title">
            <h2>Historique</h2>
            <p>Toutes tes transactions</p>
          </section>

          <section className="card">
            <div className="search-wrap">
              <Search size={16} className="search-icon" />
              <input
                className="search-input"
                type="text"
                placeholder="Rechercher une transaction..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filters">
              {[
                { key: "toutes", label: "Toutes" },
                { key: "revenu", label: "Revenus" },
                { key: "depense", label: "Dépenses" },
              ].map((f) => (
                <button
                  key={f.key}
                  className={filterType === f.key ? "active" : ""}
                  onClick={() => setFilterType(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="transaction-list">
              {filteredTransactions.length === 0 ? (
                <EmptyState label="Aucune transaction ne correspond à ta recherche" />
              ) : (
                filteredTransactions.map(renderTransactionRow)
              )}
            </div>
          </section>
        </main>
      )}

      {/* ================= PROFIL ================= */}
      {activeTab === "profil" && (
        <main>
          <section className="page-title">
            <h2>Mon profil</h2>
            <p>Gère tes informations</p>
          </section>

          <section className="card profile-card">
            <div className="profile-avatar">A</div>
            <h2>Alexandre</h2>
            <p>Utilisateur Mkelo</p>

            <div className="profile-setting">
              <div className="profile-setting-label">
                <Wallet size={16} />
                <span>Devise d'affichage</span>
              </div>
              <div className="segmented">
                <button className={currency === "USD" ? "active" : ""} onClick={() => setCurrency("USD")}>USD</button>
                <button className={currency === "CDF" ? "active" : ""} onClick={() => setCurrency("CDF")}>CDF</button>
              </div>
            </div>

            <div className="profile-setting">
              <div className="profile-setting-label">
                {theme === "clair" ? <Sun size={16} /> : <Moon size={16} />}
                <span>Thème</span>
              </div>
              <div className="segmented">
                <button className={theme === "clair" ? "active" : ""} onClick={() => setTheme("clair")}>Clair</button>
                <button className={theme === "sombre" ? "active" : ""} onClick={() => setTheme("sombre")}>Sombre</button>
              </div>
            </div>

            <button className="profile-button">Modifier mon profil</button>
            <button className="profile-button">Paramètres avancés</button>

            {showResetConfirm ? (
              <div className="reset-confirm">
                <p>Effacer toutes tes transactions ? Cette action est irréversible.</p>
                <div className="reset-confirm-buttons">
                  <button className="confirm-yes" onClick={reinitialiserDonnees}>Oui, effacer</button>
                  <button className="confirm-no" onClick={() => setShowResetConfirm(false)}>Annuler</button>
                </div>
              </div>
            ) : (
              <button className="profile-button danger" onClick={() => setShowResetConfirm(true)}>
                Effacer mes données
              </button>
            )}
          </section>
        </main>
      )}

      {/* ================= NAVIGATION ================= */}
      <nav className="bottom-nav">
        <button className={activeTab === "accueil" ? "active" : ""} onClick={() => setActiveTab("accueil")}>
          <Home size={18} />
          <small>Accueil</small>
        </button>

        <button className={activeTab === "evolution" ? "active" : ""} onClick={() => setActiveTab("evolution")}>
          <TrendingUp size={18} />
          <small>Évolution</small>
        </button>

        <button className="nav-add" onClick={() => setShowAdd(true)} aria-label="Ajouter une transaction">
          <Plus size={22} />
        </button>

        <button className={activeTab === "transactions" ? "active" : ""} onClick={() => setActiveTab("transactions")}>
          <CreditCard size={18} />
          <small>Transactions</small>
        </button>

        <button className={activeTab === "profil" ? "active" : ""} onClick={() => setActiveTab("profil")}>
          <User size={18} />
          <small>Profil</small>
        </button>
      </nav>

      {/* ================= MODALE AJOUT ================= */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => { setShowAdd(false); setErrors({}); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Ajouter une transaction</h2>
              <button onClick={() => { setShowAdd(false); setErrors({}); }} aria-label="Fermer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={ajouterTransaction} noValidate>
              <div className="type-selector">
                <button
                  type="button"
                  className={form.type === "revenu" ? "selected income" : ""}
                  onClick={() => setForm({ ...form, type: "revenu" })}
                >
                  ↗ Revenu
                </button>
                <button
                  type="button"
                  className={form.type === "depense" ? "selected expense" : ""}
                  onClick={() => setForm({ ...form, type: "depense" })}
                >
                  ↘ Dépense
                </button>
              </div>

              <label htmlFor="amount">Montant (USD)</label>
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className={errors.amount ? "input-error" : ""}
              />
              {errors.amount && <span className="error-text">{errors.amount}</span>}

              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>
                ))}
              </select>

              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                placeholder="Ex : Déjeuner, Uber..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={errors.description ? "input-error" : ""}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}

              <button className="submit-button" type="submit">
                Ajouter la transaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function EmptyState({ label = "Aucune transaction pour le moment" }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">🗂️</span>
      <p>{label}</p>
    </div>
  );
}

function ChartTooltip({ active, payload, label, currency }) {
  if (!active || !payload || !payload.length) return null;
  const value = payload[0].value ?? payload[0].payload?.value;
  return (
    <div className="chart-tooltip">
      <strong>{label || payload[0].name}</strong>
      <span>{formatAmount(value, currency)}</span>
    </div>
  );
}

/* ============================================================
   STYLES
   ============================================================ */

const STYLES = `
* { box-sizing: border-box; }

.app {
  --bg: #f4f6fb;
  --card-bg: #ffffff;
  --text: #14245f;
  --text-muted: #71809e;
  --text-faint: #9aa5bb;
  --border: #edf0f6;
  --accent: #2946c7;
  --accent-dark: #16296d;
  --income: #00a56b;
  --income-bg: #e2f8ed;
  --expense: #e74444;
  --expense-bg: #ffe7e7;
  --nav-bg: #ffffff;
  --shadow: rgba(20, 40, 100, 0.08);

  font-family: Inter, Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
  min-height: 100vh;
  padding-bottom: 110px;
  transition: background .25s ease, color .25s ease;
}

.app[data-theme="sombre"] {
  --bg: #0d1224;
  --card-bg: #171f38;
  --text: #eef1fa;
  --text-muted: #93a0c2;
  --text-faint: #6b7699;
  --border: #232c4d;
  --accent: #6b84ff;
  --accent-dark: #c4cdff;
  --income: #34d399;
  --income-bg: rgba(52, 211, 153, 0.14);
  --expense: #f87171;
  --expense-bg: rgba(248, 113, 113, 0.14);
  --nav-bg: #171f38;
  --shadow: rgba(0, 0, 0, 0.35);
}

button, input, select { font-family: inherit; }
button { cursor: pointer; }
button:focus-visible, input:focus-visible, select:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.header {
  width: min(100%, 760px);
  margin: auto;
  padding: 25px 22px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.greeting { margin: 0 0 4px; color: var(--text-muted); font-size: 13px; }
.header h1 { margin: 0; font-size: 25px; color: var(--accent-dark); }

.notification {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  border: none; border-radius: 50%;
  background: var(--card-bg);
  color: var(--text);
  box-shadow: 0 7px 20px var(--shadow);
}

main { width: min(100%, 760px); margin: auto; padding: 10px 22px; }

.balance-card {
  padding: 30px 20px;
  border-radius: 24px;
  text-align: center;
  background: linear-gradient(135deg, #2539a6, #304dcc);
  color: white;
  box-shadow: 0 15px 30px rgba(38, 60, 170, 0.22);
}
.balance-card p { margin: 0 0 8px; font-size: 14px; opacity: 0.9; }
.balance-card h2 { margin: 0; font-size: 38px; letter-spacing: -1px; }
.balance-change {
  display: inline-block; margin-top: 12px; padding: 7px 13px;
  border-radius: 20px; background: rgba(255,255,255,0.16); font-size: 11px;
}
.balance-change.negative { background: rgba(255,255,255,0.22); }

.summary { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; margin: 16px 0; }
.summary-card {
  padding: 19px; border-radius: 19px; background: var(--card-bg);
  box-shadow: 0 7px 20px var(--shadow);
}
.summary-icon {
  display: flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 50%;
}
.summary-card.income .summary-icon { background: var(--income-bg); color: var(--income); }
.summary-card.expense .summary-icon { background: var(--expense-bg); color: var(--expense); }
.summary-card p { margin: 11px 0 4px; color: var(--text-muted); font-size: 13px; }
.summary-card strong { font-size: 20px; }

.card {
  margin-top: 16px; padding: 20px; border-radius: 21px;
  background: var(--card-bg); box-shadow: 0 7px 22px var(--shadow);
}
.section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.section-header h2 { margin: 0; font-size: 17px; }
.section-header button { border: none; background: none; color: var(--accent); font-size: 12px; font-weight: 700; }

.chart-placeholder { position: relative; border-radius: 14px; overflow: hidden; }
.chart-tooltip {
  background: var(--card-bg); border: 1px solid var(--border);
  padding: 8px 11px; border-radius: 10px; box-shadow: 0 8px 20px var(--shadow);
  display: flex; flex-direction: column; gap: 2px; font-size: 12px;
}
.chart-tooltip strong { font-size: 11px; color: var(--text-muted); }

.transaction-list { display: flex; flex-direction: column; }
.transaction { display: flex; align-items: center; gap: 11px; padding: 13px 0; border-bottom: 1px solid var(--border); }
.transaction:last-child { border-bottom: none; }
.transaction-icon {
  flex-shrink: 0; width: 43px; height: 43px; display: flex; align-items: center; justify-content: center;
  border-radius: 14px; font-size: 18px;
}
.transaction-info { flex: 1; display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.transaction-info strong { font-size: 14px; }
.transaction-info span { color: var(--text-muted); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.transaction-info small { color: var(--text-faint); font-size: 10px; }
.amount { font-size: 13px; white-space: nowrap; }
.income-text { color: var(--income); }
.expense-text { color: var(--expense); }

.delete-btn {
  border: none; background: transparent; color: var(--text-faint);
  padding: 6px; border-radius: 8px; display: flex; align-items: center;
}
.delete-btn:hover { color: var(--expense); background: var(--expense-bg); }

.confirm-row { display: flex; gap: 6px; }
.confirm-yes, .confirm-no {
  border: none; border-radius: 8px; padding: 7px 10px; font-size: 11px; font-weight: 700;
}
.confirm-yes { background: var(--expense); color: white; }
.confirm-no { background: var(--border); color: var(--text-muted); }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 30px 0; color: var(--text-muted); }
.empty-icon { font-size: 28px; }
.empty-state p { margin: 0; font-size: 13px; text-align: center; }

.page-title { margin: 8px 0 18px; }
.page-title h2 { margin: 0; font-size: 27px; }
.page-title p { margin: 4px 0; color: var(--text-muted); font-size: 13px; }

.evolution-page { padding: 20px; }
.period-buttons {
  display: flex; gap: 5px; padding: 4px; width: fit-content;
  border-radius: 10px; background: var(--bg);
}
.period-buttons button { border: none; padding: 7px 12px; border-radius: 8px; background: transparent; color: var(--text-muted); font-size: 11px; }
.period-buttons button.active { background: var(--card-bg); color: var(--accent); box-shadow: 0 2px 7px var(--shadow); }

.big-chart { position: relative; margin-top: 25px; border-radius: 15px; overflow: hidden; }

.evolution-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 20px; }
.evolution-stats div { padding: 12px; border-radius: 13px; background: var(--bg); }
.evolution-stats span { display: block; margin-bottom: 5px; color: var(--text-muted); font-size: 10px; }
.evolution-stats strong { font-size: 14px; }

.breakdown { display: flex; flex-direction: column; gap: 14px; }
.breakdown-legend { display: flex; flex-direction: column; gap: 9px; }
.legend-row { display: flex; align-items: center; gap: 9px; font-size: 12px; }
.legend-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.legend-label { flex: 1; color: var(--text); }
.legend-value { color: var(--text-muted); font-weight: 600; }

.search-wrap { position: relative; }
.search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-faint); }
.search-input {
  width: 100%; padding: 13px 15px 13px 38px; border: 1px solid var(--border);
  border-radius: 13px; outline: none; background: var(--bg); color: var(--text);
}
.search-input:focus { border-color: var(--accent); }

.filters { display: flex; gap: 8px; margin: 15px 0; flex-wrap: wrap; }
.filters button { padding: 8px 14px; border: 1px solid var(--border); border-radius: 20px; background: var(--card-bg); color: var(--text-muted); font-size: 11px; }
.filters button.active { background: var(--accent); border-color: var(--accent); color: white; }

.profile-card { text-align: center; }
.profile-avatar {
  width: 75px; height: 75px; margin: 5px auto 15px; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; background: var(--accent); color: white; font-size: 30px; font-weight: 800;
}
.profile-card h2 { margin: 0; font-size: 21px; }
.profile-card p { margin: 5px 0 20px; color: var(--text-muted); }

.profile-setting {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 15px; border-radius: 14px; background: var(--bg); margin-bottom: 10px; text-align: left;
}
.profile-setting-label { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; }
.segmented { display: flex; gap: 3px; padding: 3px; border-radius: 9px; background: var(--card-bg); }
.segmented button { border: none; padding: 6px 11px; border-radius: 7px; background: transparent; color: var(--text-muted); font-size: 11px; font-weight: 700; }
.segmented button.active { background: var(--accent); color: white; }

.profile-button {
  width: 100%; padding: 13px; margin-top: 9px; border: 1px solid var(--border);
  border-radius: 13px; background: var(--card-bg); color: var(--text); font-weight: 600;
}
.profile-button.danger { color: var(--expense); border-color: var(--expense-bg); }

.reset-confirm {
  margin-top: 9px; padding: 14px; border-radius: 13px; background: var(--expense-bg);
  text-align: left;
}
.reset-confirm p { margin: 0 0 10px; font-size: 12px; color: var(--text); }
.reset-confirm-buttons { display: flex; gap: 8px; }
.reset-confirm-buttons .confirm-yes, .reset-confirm-buttons .confirm-no { flex: 1; padding: 10px; }

.loading-screen {
  min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 14px; color: var(--text-muted); font-size: 13px;
}
.spinner {
  width: 34px; height: 34px; border-radius: 50%;
  border: 3px solid var(--border); border-top-color: var(--accent);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.bottom-nav {
  position: fixed; left: 50%; bottom: 14px; transform: translateX(-50%); z-index: 15;
  width: min(calc(100% - 28px), 700px); height: 64px; display: grid;
  grid-template-columns: 1fr 1fr 60px 1fr 1fr; align-items: center; padding: 3px 6px;
  border-radius: 22px; background: var(--nav-bg); box-shadow: 0 12px 30px var(--shadow);
}
.bottom-nav button {
  height: 55px; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 3px; border: none; background: transparent; color: var(--text-muted);
}
.bottom-nav button small { font-size: 9px; }
.bottom-nav button.active { color: var(--accent); font-weight: 700; }
.nav-add {
  width: 52px !important; height: 52px !important; margin: auto; border-radius: 50% !important;
  background: var(--accent) !important; color: white !important;
}

.modal-overlay {
  position: fixed; inset: 0; z-index: 100; display: flex; align-items: flex-end; justify-content: center;
  background: rgba(8, 17, 45, 0.52);
}
.modal { width: min(100%, 520px); padding: 24px; border-radius: 27px 27px 0 0; background: var(--card-bg); box-shadow: 0 -10px 40px rgba(0,0,0,0.2); max-height: 88vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-header h2 { margin: 0; font-size: 20px; }
.modal-header button { width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 50%; background: var(--bg); color: var(--text-muted); }

.type-selector { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 5px; margin-bottom: 20px; border-radius: 14px; background: var(--bg); }
.type-selector button { padding: 12px; border: none; border-radius: 10px; background: transparent; color: var(--text-muted); font-weight: 700; }
.type-selector button.selected.income { background: var(--income-bg); color: var(--income); }
.type-selector button.selected.expense { background: var(--expense-bg); color: var(--expense); }

.modal form { display: flex; flex-direction: column; gap: 7px; }
.modal label { margin-top: 7px; color: var(--text); font-size: 13px; font-weight: 700; }
.modal input, .modal select {
  width: 100%; padding: 14px; border: 1px solid var(--border); border-radius: 13px;
  outline: none; background: var(--bg); color: var(--text);
}
.modal input:focus, .modal select:focus { border-color: var(--accent); }
.input-error { border-color: var(--expense) !important; }
.error-text { color: var(--expense); font-size: 11px; font-weight: 600; }

.submit-button { margin-top: 14px; padding: 15px; border: none; border-radius: 14px; background: var(--accent); color: white; font-weight: 800; box-shadow: 0 8px 20px rgba(41, 70, 199, 0.22); }

.toast {
  position: fixed; left: 50%; bottom: 100px; transform: translateX(-50%); z-index: 200;
  background: var(--accent-dark); color: white; padding: 11px 20px; border-radius: 30px;
  font-size: 13px; font-weight: 600; box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  animation: toast-in .25s ease;
}
@keyframes toast-in { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }

@media (max-width: 480px) {
  main { padding-left: 15px; padding-right: 15px; }
  .header { padding-left: 15px; padding-right: 15px; }
  .balance-card h2 { font-size: 34px; }
  .summary-card { padding: 16px; }
  .summary-card strong { font-size: 18px; }
  .card { padding: 17px; }
  .evolution-stats { grid-template-columns: 1fr; }
}
`;

export default App;
