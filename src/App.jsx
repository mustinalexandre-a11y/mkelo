import { useState, useMemo, useEffect } from "react";
import {
  Home,
  TrendingUp,
  TrendingDown,
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
  CheckCheck,
  HandCoins,
  PiggyBank,
  Lightbulb,
  Sparkles,
  ChevronLeft,
  Receipt,
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
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://adqktbvxhdkizrvygljc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_GZOL0J1W_Ekg65AISdvXCw_lMyNWEJN";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ============================================================
   DONNÉES DE RÉFÉRENCE
   ============================================================ */

const LOGO_DATA_URI = "data:image/png;base64,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";

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
const DEFAULT_EXCHANGE_RATE = 2200; // FC pour 1 USD, valeur de départ modifiable par l'utilisateur

let activeExchangeRate = DEFAULT_EXCHANGE_RATE;
function setActiveExchangeRate(rate) {
  if (rate && !isNaN(rate) && rate > 0) activeExchangeRate = rate;
}

const AVATARS = [
  { key: "lion", emoji: "🦁", color: "#F59E0B" },
  { key: "tigre", emoji: "🐯", color: "#EA580C" },
  { key: "panda", emoji: "🐼", color: "#0EA5E9" },
  { key: "renard", emoji: "🦊", color: "#DC2626" },
  { key: "grenouille", emoji: "🐸", color: "#16A34A" },
  { key: "singe", emoji: "🐵", color: "#92400E" },
  { key: "hibou", emoji: "🦉", color: "#7C3AED" },
  { key: "koala", emoji: "🐨", color: "#64748B" },
  { key: "pingouin", emoji: "🐧", color: "#1E293B" },
  { key: "licorne", emoji: "🦄", color: "#DB2777" },
];

function getAvatar(key) {
  return AVATARS.find((a) => a.key === key) || null;
}

const PAYMENT_METHODS = [
  { key: "especes", label: "Espèces", color: "#64748b", emoji: "💵" },
  { key: "airtel", label: "Airtel Money", color: "#E4032E", emoji: "📱" },
  { key: "orange", label: "Orange Money", color: "#FF7900", emoji: "📱" },
  { key: "vodacom", label: "Vodacom M-Pesa", color: "#E30613", emoji: "📱" },
  { key: "banque", label: "Banque", color: "#2946c7", emoji: "🏦" },
];

// Génère une date à J-n jours
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(9 + (n % 6), 0, 0, 0);
  return d;
};

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
    const value = Math.round(amountUSD * activeExchangeRate);
    return `${value.toLocaleString("fr-FR")} FC`;
  }
  return `$${amountUSD.toFixed(2)}`;
}

function getPaymentMethod(key) {
  return PAYMENT_METHODS.find((p) => p.key === key) || PAYMENT_METHODS[0];
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

/* ============================================================
   SUPABASE — chargement / sauvegarde des données par utilisateur
   ============================================================ */

async function loadProfile(userId) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error || !data) return null;
  return {
    name: data.name,
    avatar: data.avatar,
    theme: data.theme || "clair",
    currency: data.currency || "USD",
    exchangeRate: data.exchange_rate || DEFAULT_EXCHANGE_RATE,
  };
}

async function saveProfile(userId, profile) {
  try {
    await supabase.from("profiles").upsert({
      id: userId,
      name: profile.name,
      avatar: profile.avatar,
      theme: profile.theme,
      currency: profile.currency,
      exchange_rate: profile.exchangeRate,
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function loadTransactions(userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });
  if (error || !data) return [];
  return data.map((t) => ({
    id: t.id,
    type: t.type,
    category: t.category,
    description: t.description || "",
    amount: Number(t.amount),
    date: new Date(t.date),
    paymentMethod: t.payment_method,
  }));
}

async function loadDebts(userId) {
  const { data, error } = await supabase
    .from("debts")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });
  if (error || !data) return [];
  return data.map((d) => ({
    id: d.id,
    type: d.type,
    person: d.person,
    description: d.description || "",
    amount: Number(d.amount),
    date: new Date(d.date),
  }));
}

async function loadNotifications(userId) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(50);
  if (error || !data) return [];
  return data.map((n) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    message: n.message,
    read: n.read,
    date: new Date(n.date),
  }));
}

async function loadAlertSettings(userId) {
  const { data, error } = await supabase.from("alert_settings").select("*").eq("user_id", userId).maybeSingle();
  if (error || !data) return null;
  return {
    lowThreshold: data.low_threshold === null ? null : Number(data.low_threshold),
    highThreshold: data.high_threshold === null ? null : Number(data.high_threshold),
    lowTriggered: data.low_triggered,
    highTriggered: data.high_triggered,
  };
}

async function saveAlertSettings(userId, alertSettings) {
  try {
    await supabase.from("alert_settings").upsert({
      user_id: userId,
      low_threshold: alertSettings.lowThreshold,
      high_threshold: alertSettings.highThreshold,
      low_triggered: alertSettings.lowTriggered,
      high_triggered: alertSettings.highTriggered,
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function loadSavingsGoal(userId) {
  const { data, error } = await supabase.from("savings_goals").select("*").eq("user_id", userId).maybeSingle();
  if (error || !data) return null;
  return {
    label: data.label,
    target: data.target === null ? null : Number(data.target),
    current: Number(data.current || 0),
  };
}

async function saveSavingsGoal(userId, savingsGoal) {
  try {
    await supabase.from("savings_goals").upsert({
      user_id: userId,
      label: savingsGoal.label,
      target: savingsGoal.target,
      current: savingsGoal.current,
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function loadBudgets(userId) {
  const { data, error } = await supabase.from("budgets").select("*").eq("user_id", userId);
  if (error || !data) return {};
  const map = {};
  data.forEach((b) => {
    map[b.category] = Number(b.amount);
  });
  return map;
}

async function saveBudgets(userId, budgetsMap) {
  try {
    await supabase.from("budgets").delete().eq("user_id", userId);
    const rows = Object.entries(budgetsMap)
      .filter(([, amount]) => amount > 0)
      .map(([category, amount]) => ({ user_id: userId, category, amount }));
    if (rows.length > 0) {
      await supabase.from("budgets").insert(rows);
    }
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
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_EXCHANGE_RATE);
  const [exchangeRateInput, setExchangeRateInput] = useState("");
  const [activeTab, setActiveTab] = useState("accueil");
  const [showAdd, setShowAdd] = useState(false);
  const [period, setPeriod] = useState("semaine");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("toutes");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [authView, setAuthView] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authAvatar, setAuthAvatar] = useState(AVATARS[0].key);
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editProfileName, setEditProfileName] = useState("");
  const [editProfileAvatar, setEditProfileAvatar] = useState(AVATARS[0].key);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showChangeProfileConfirm, setShowChangeProfileConfirm] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [alertSettings, setAlertSettings] = useState(null);
  const [alertLowInput, setAlertLowInput] = useState("");
  const [alertHighInput, setAlertHighInput] = useState("");
  const [alertInputCurrency, setAlertInputCurrency] = useState("USD");

  const [debts, setDebts] = useState([]);
  const [showAddDebt, setShowAddDebt] = useState(false);
  const [debtForm, setDebtForm] = useState({ type: "on-me-doit", person: "", amount: "", description: "" });
  const [debtErrors, setDebtErrors] = useState({});
  const [confirmDeleteDebtId, setConfirmDeleteDebtId] = useState(null);

  const [savingsGoal, setSavingsGoal] = useState(null);
  const [showEditSavings, setShowEditSavings] = useState(false);
  const [savingsLabelInput, setSavingsLabelInput] = useState("");
  const [savingsTargetInput, setSavingsTargetInput] = useState("");
  const [showAddContribution, setShowAddContribution] = useState(false);
  const [contributionInput, setContributionInput] = useState("");

  const [budgets, setBudgets] = useState({});
  const [showEditBudgets, setShowEditBudgets] = useState(false);
  const [budgetInputs, setBudgetInputs] = useState({});

  const [transactions, setTransactions] = useState([]);

  const [form, setForm] = useState({
    type: "depense",
    category: "Nourriture",
    customCategory: "",
    description: "",
    amount: "",
    amountCurrency: "USD",
    paymentMethod: "especes",
  });

  // Vérifie la session existante au démarrage, et écoute les connexions/déconnexions
  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      setAuthChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Charge toutes les données de l'utilisateur une fois connecté (et les vide à la déconnexion)
  useEffect(() => {
    let cancelled = false;

    if (!session?.user) {
      setProfile(null);
      setTransactions([]);
      setDebts([]);
      setNotifications([]);
      setAlertSettings(null);
      setSavingsGoal(null);
      setIsLoading(true);
      return;
    }

    setIsLoading(true);

    (async () => {
      const userId = session.user.id;
      const [
        loadedProfile,
        loadedTransactions,
        loadedDebts,
        loadedNotifications,
        loadedAlertSettings,
        loadedSavingsGoal,
        loadedBudgets,
      ] = await Promise.all([
        loadProfile(userId),
        loadTransactions(userId),
        loadDebts(userId),
        loadNotifications(userId),
        loadAlertSettings(userId),
        loadSavingsGoal(userId),
        loadBudgets(userId),
      ]);

      if (cancelled) return;

      if (loadedProfile) {
        setProfile({ name: loadedProfile.name, avatar: loadedProfile.avatar });
        setTheme(loadedProfile.theme);
        setCurrency(loadedProfile.currency);
        setExchangeRate(loadedProfile.exchangeRate);
      } else {
        // Le profil n'a pas été créé correctement à l'inscription (ex : confirmation email requise) —
        // on le recrée automatiquement avec un nom de secours, réparable ensuite via "Modifier mon profil"
        const fallbackName = session.user.email ? session.user.email.split("@")[0] : "Utilisateur";
        setProfile({ name: fallbackName, avatar: AVATARS[0].key });
      }
      setTransactions(loadedTransactions);
      setDebts(loadedDebts);
      setNotifications(loadedNotifications);
      if (loadedAlertSettings) setAlertSettings(loadedAlertSettings);
      if (loadedSavingsGoal) setSavingsGoal(loadedSavingsGoal);
      setBudgets(loadedBudgets);

      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  // Sauvegarde automatique du profil (nom, avatar, devise, thème, taux) dans Supabase
  useEffect(() => {
    if (isLoading || !session?.user || !profile) return;
    saveProfile(session.user.id, { name: profile.name, avatar: profile.avatar, theme, currency, exchangeRate });
  }, [profile, theme, currency, exchangeRate, isLoading, session?.user?.id]);

  // Sauvegarde automatique des seuils d'alerte
  useEffect(() => {
    if (isLoading || !alertSettings || !session?.user) return;
    saveAlertSettings(session.user.id, alertSettings);
  }, [alertSettings, isLoading, session?.user?.id]);

  // Sauvegarde automatique de l'objectif d'épargne
  useEffect(() => {
    if (isLoading || !savingsGoal || !session?.user) return;
    saveSavingsGoal(session.user.id, savingsGoal);
  }, [savingsGoal, isLoading, session?.user?.id]);

  // Sauvegarde automatique des budgets par catégorie
  useEffect(() => {
    if (isLoading || !session?.user) return;
    saveBudgets(session.user.id, budgets);
  }, [budgets, isLoading, session?.user?.id]);


  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  // Écoute les mises à jour détectées par le service worker (voir index.html)
  useEffect(() => {
    const handler = () => setUpdateAvailable(true);
    window.addEventListener("mkelo-update-available", handler);
    return () => window.removeEventListener("mkelo-update-available", handler);
  }, []);

  const totalRevenus = useMemo(
    () => transactions.filter((t) => t.type === "revenu").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalDepenses = useMemo(
    () => transactions.filter((t) => t.type === "depense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const solde = totalRevenus - totalDepenses;

  const totalOnMeDoit = useMemo(
    () => debts.filter((d) => d.type === "on-me-doit").reduce((s, d) => s + d.amount, 0),
    [debts]
  );
  const totalJeDois = useMemo(
    () => debts.filter((d) => d.type === "je-dois").reduce((s, d) => s + d.amount, 0),
    [debts]
  );

  const ajouterNotification = async ({ type, title, message }) => {
    if (!session?.user) return;
    const { data } = await supabase
      .from("notifications")
      .insert({ user_id: session.user.id, type, title, message })
      .select()
      .single();
    if (data) {
      setNotifications((prev) =>
        [
          { id: data.id, type: data.type, title: data.title, message: data.message, read: data.read, date: new Date(data.date) },
          ...prev,
        ].slice(0, 50)
      );
    }
  };

  // Initialise des seuils par défaut la première fois (30% et 150% du solde de départ)
  useEffect(() => {
    if (isLoading || alertSettings !== null || transactions.length === 0) return;
    setAlertSettings({
      lowThreshold: Math.max(Math.round(solde * 0.3 * 100) / 100, 0),
      highThreshold: Math.round(solde * 1.5 * 100) / 100,
      lowTriggered: false,
      highTriggered: false,
    });
  }, [isLoading, alertSettings, transactions.length, solde]);

  // Détecte les franchissements de seuil bas / haut et génère une notification
  useEffect(() => {
    if (isLoading || !alertSettings) return;
    const { lowThreshold, highThreshold, lowTriggered, highTriggered } = alertSettings;

    if (lowThreshold !== null && solde <= lowThreshold && !lowTriggered) {
      ajouterNotification({
        type: "bas",
        title: "Solde bas",
        message: `Ton solde est descendu à ${formatAmount(solde, currency)}, en dessous de ton seuil d'alerte (${formatAmount(lowThreshold, currency)}).`,
      });
      setToast("⚠️ Solde bas — notification envoyée");
      setAlertSettings((prev) => ({ ...prev, lowTriggered: true }));
    } else if (lowThreshold !== null && lowTriggered && solde > lowThreshold * 1.1) {
      setAlertSettings((prev) => ({ ...prev, lowTriggered: false }));
    }

    if (highThreshold !== null && solde >= highThreshold && !highTriggered) {
      ajouterNotification({
        type: "haut",
        title: "Nouveau sommet 🎉",
        message: `Ton solde a atteint ${formatAmount(solde, currency)}, au-dessus de ton seuil de plafond (${formatAmount(highThreshold, currency)}).`,
      });
      setToast("🎉 Nouveau sommet atteint");
      setAlertSettings((prev) => ({ ...prev, highTriggered: true }));
    } else if (highThreshold !== null && highTriggered && solde < highThreshold * 0.9) {
      setAlertSettings((prev) => ({ ...prev, highTriggered: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solde, alertSettings, isLoading]);

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

  const paymentBreakdown = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === "depense")
      .forEach((t) => {
        const key = t.paymentMethod || "especes";
        map[key] = (map[key] || 0) + t.amount;
      });
    const entries = Object.entries(map)
      .map(([key, value]) => ({ ...getPaymentMethod(key), value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value);
    const max = Math.max(...entries.map((e) => e.value), 1);
    return entries.map((e) => ({ ...e, pct: (e.value / max) * 100 }));
  }, [transactions]);

  const budgetProgress = useMemo(() => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const spentByCategory = {};
    transactions
      .filter((t) => t.type === "depense" && new Date(t.date) >= startOfMonth)
      .forEach((t) => {
        spentByCategory[t.category] = (spentByCategory[t.category] || 0) + t.amount;
      });

    return Object.entries(budgets)
      .map(([category, amount]) => {
        const spent = spentByCategory[category] || 0;
        return {
          category,
          budget: amount,
          spent,
          pct: amount > 0 ? Math.min(100, (spent / amount) * 100) : 0,
          over: spent > amount,
        };
      })
      .sort((a, b) => b.pct - a.pct);
  }, [transactions, budgets]);

  const insights = useMemo(() => {
    const list = [];
    const now = new Date();
    const daysSince = (d) => Math.floor((now - new Date(d)) / 86400000);

    const semaineActuelle = transactions
      .filter((t) => t.type === "depense" && daysSince(t.date) < 7)
      .reduce((s, t) => s + t.amount, 0);
    const semainePrecedente = transactions
      .filter((t) => t.type === "depense" && daysSince(t.date) >= 7 && daysSince(t.date) < 14)
      .reduce((s, t) => s + t.amount, 0);

    if (semainePrecedente > 0) {
      const pct = Math.round(((semaineActuelle - semainePrecedente) / semainePrecedente) * 100);
      if (pct > 5) {
        list.push({ icon: "up", text: `Tu as dépensé ${pct}% de plus cette semaine que la semaine dernière.` });
      } else if (pct < -5) {
        list.push({ icon: "down", text: `Tu as dépensé ${Math.abs(pct)}% de moins cette semaine que la semaine dernière. 👏` });
      }
    }

    if (categoryBreakdown.length > 0 && totalDepenses > 0) {
      const top = categoryBreakdown[0];
      const pct = Math.round((top.value / totalDepenses) * 100);
      list.push({ icon: "category", text: `${CATEGORY_ICONS[top.name] || ""} ${top.name} est ta plus grosse dépense (${pct}% du total).` });
    }

    if (paymentBreakdown.length > 0) {
      const top = paymentBreakdown[0];
      list.push({ icon: "payment", text: `${top.emoji} ${top.label} est ton mode de paiement le plus utilisé.` });
    }

    if (savingsGoal?.target) {
      const remaining = savingsGoal.target - savingsGoal.current;
      if (remaining > 0) {
        list.push({ icon: "savings", text: `Encore ${formatAmount(remaining, currency)} avant d'atteindre "${savingsGoal.label}".` });
      } else {
        list.push({ icon: "savings", text: `🎉 Objectif "${savingsGoal.label}" atteint !` });
      }
    }

    if (totalOnMeDoit > 0) {
      list.push({ icon: "debt", text: `On te doit au total ${formatAmount(totalOnMeDoit, currency)}.` });
    }
    if (totalJeDois > 0) {
      list.push({ icon: "debt", text: `Tu dois encore ${formatAmount(totalJeDois, currency)} à rembourser.` });
    }

    const budgetDepasse = budgetProgress.find((b) => b.over);
    const budgetProche = budgetProgress.find((b) => !b.over && b.pct >= 85);
    if (budgetDepasse) {
      list.push({ icon: "budget", text: `Budget dépassé pour ${CATEGORY_ICONS[budgetDepasse.category] || ""} ${budgetDepasse.category} ce mois-ci.` });
    } else if (budgetProche) {
      list.push({ icon: "budget", text: `Tu approches de ta limite pour ${CATEGORY_ICONS[budgetProche.category] || ""} ${budgetProche.category} (${Math.round(budgetProche.pct)}%).` });
    }

    return list;
  }, [transactions, categoryBreakdown, paymentBreakdown, totalDepenses, savingsGoal, totalOnMeDoit, totalJeDois, currency, budgetProgress]);

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

  const unreadCount = notifications.filter((n) => !n.read).length;

  const validateForm = () => {
    const next = {};
    if (!form.description.trim()) next.description = "Ajoute une courte description.";
    const numAmount = Number(form.amount);
    if (!form.amount || isNaN(numAmount) || numAmount <= 0) next.amount = "Entre un montant valide.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const ajouterTransaction = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!session?.user) return;

    const amountUSD = form.amountCurrency === "CDF" ? Number(form.amount) / exchangeRate : Number(form.amount);
    const categorieFinale =
      form.category === "Autre" && form.customCategory.trim() ? form.customCategory.trim() : form.category;

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        user_id: session.user.id,
        type: form.type,
        category: categorieFinale,
        description: form.description.trim(),
        amount: amountUSD,
        payment_method: form.paymentMethod,
      })
      .select()
      .single();

    if (error || !data) {
      setToast("❌ Erreur de connexion, réessaie");
      return;
    }

    setTransactions((prev) => [
      {
        id: data.id,
        type: data.type,
        category: data.category,
        description: data.description || "",
        amount: Number(data.amount),
        date: new Date(data.date),
        paymentMethod: data.payment_method,
      },
      ...prev,
    ]);
    setForm({
      type: "depense",
      category: "Nourriture",
      customCategory: "",
      description: "",
      amount: "",
      amountCurrency: currency,
      paymentMethod: "especes",
    });
    setErrors({});
    setShowAdd(false);
    setToast(form.type === "revenu" ? "Revenu ajouté ✅" : "Dépense ajoutée ✅");
  };

  const supprimerTransaction = async (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    setConfirmDeleteId(null);
    setToast("Transaction supprimée 🗑️");
    await supabase.from("transactions").delete().eq("id", id);
  };

  const reinitialiserDonnees = async () => {
    setTransactions([]);
    setShowResetConfirm(false);
    setToast("Données réinitialisées 🔄");
    if (session?.user) await supabase.from("transactions").delete().eq("user_id", session.user.id);
  };

  const gererInscription = async (e) => {
    e.preventDefault();
    setAuthError("");
    const name = authName.trim();
    if (!name) return setAuthError("Entre ton prénom.");
    if (!authEmail.trim()) return setAuthError("Entre ton email.");
    if (authPassword.length < 6) return setAuthError("Le mot de passe doit faire au moins 6 caractères.");

    setAuthSubmitting(true);
    const { data, error } = await supabase.auth.signUp({ email: authEmail.trim(), password: authPassword });

    if (error) {
      setAuthSubmitting(false);
      setAuthError(
        error.message.includes("already registered") || error.message.includes("already exists")
          ? "Ce compte existe déjà — connecte-toi plutôt."
          : "Erreur : " + error.message
      );
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        name,
        avatar: authAvatar,
        theme: "clair",
        currency: "USD",
        exchange_rate: DEFAULT_EXCHANGE_RATE,
      });
    }

    setAuthSubmitting(false);

    if (!data.session) {
      setAuthView("login");
      setAuthError("Compte créé ✅ Vérifie ta boîte mail si une confirmation est demandée, puis connecte-toi.");
    }
  };

  const gererConnexion = async (e) => {
    e.preventDefault();
    setAuthError("");
    if (!authEmail.trim() || !authPassword) {
      setAuthError("Entre ton email et ton mot de passe.");
      return;
    }

    setAuthSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail.trim(), password: authPassword });
    setAuthSubmitting(false);

    if (error) setAuthError("Email ou mot de passe incorrect.");
  };

  const enregistrerProfil = (e) => {
    e.preventDefault();
    const name = editProfileName.trim();
    if (!name) return;
    setProfile({ ...profile, name, avatar: editProfileAvatar });
    setShowEditProfile(false);
    setToast("Profil mis à jour ✅");
  };

  const seDeconnecter = async () => {
    await supabase.auth.signOut();
    setShowChangeProfileConfirm(false);
    setShowAdvancedSettings(false);
    setAuthEmail("");
    setAuthPassword("");
    setAuthName("");
    setAuthView("login");
  };

  const marquerLu = async (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await supabase.from("notifications").update({ read: true }).eq("id", id);
  };

  const marquerToutLu = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (session?.user) {
      await supabase.from("notifications").update({ read: true }).eq("user_id", session.user.id).eq("read", false);
    }
  };

  const supprimerNotification = async (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    await supabase.from("notifications").delete().eq("id", id);
  };

  const effacerToutesNotifications = async () => {
    setNotifications([]);
    setToast("Notifications effacées 🗑️");
    if (session?.user) await supabase.from("notifications").delete().eq("user_id", session.user.id);
  };

  const enregistrerSeuils = (e) => {
    e.preventDefault();
    const rawLow = alertLowInput === "" ? null : Number(alertLowInput);
    const rawHigh = alertHighInput === "" ? null : Number(alertHighInput);
    const toUSD = (v) => (v === null || isNaN(v) ? null : alertInputCurrency === "CDF" ? v / exchangeRate : v);
    setAlertSettings({
      lowThreshold: toUSD(rawLow),
      highThreshold: toUSD(rawHigh),
      lowTriggered: false,
      highTriggered: false,
    });
    setToast("Seuils d'alerte mis à jour ✅");
  };

  const enregistrerTauxDeChange = (e) => {
    e.preventDefault();
    const rate = Number(exchangeRateInput);
    if (!exchangeRateInput || isNaN(rate) || rate <= 0) return;
    setExchangeRate(rate);
    setToast("Taux de change mis à jour ✅");
  };

  const enregistrerBudgets = (e) => {
    e.preventDefault();
    const toUSD = (v) => (currency === "CDF" ? v / exchangeRate : v);
    const nouveauxBudgets = {};
    Object.entries(budgetInputs).forEach(([category, value]) => {
      const num = Number(value);
      if (value !== "" && !isNaN(num) && num > 0) {
        nouveauxBudgets[category] = toUSD(num);
      }
    });
    setBudgets(nouveauxBudgets);
    setShowEditBudgets(false);
    setToast("Budgets mis à jour ✅");
  };

  const ajouterDette = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!debtForm.person.trim()) errs.person = "Indique le nom de la personne.";
    const amt = Number(debtForm.amount);
    if (!debtForm.amount || isNaN(amt) || amt <= 0) errs.amount = "Entre un montant valide.";
    setDebtErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (!session?.user) return;

    const { data, error } = await supabase
      .from("debts")
      .insert({
        user_id: session.user.id,
        type: debtForm.type,
        person: debtForm.person.trim(),
        description: debtForm.description.trim(),
        amount: amt,
      })
      .select()
      .single();

    if (error || !data) {
      setToast("❌ Erreur de connexion, réessaie");
      return;
    }

    setDebts((prev) => [
      {
        id: data.id,
        type: data.type,
        person: data.person,
        description: data.description || "",
        amount: Number(data.amount),
        date: new Date(data.date),
      },
      ...prev,
    ]);
    setDebtForm({ type: "on-me-doit", person: "", amount: "", description: "" });
    setDebtErrors({});
    setShowAddDebt(false);
    setToast("Dette ajoutée ✅");
  };

  const supprimerDette = async (id) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
    setConfirmDeleteDebtId(null);
    setToast("Dette marquée comme remboursée 🎉");
    await supabase.from("debts").delete().eq("id", id);
  };

  const enregistrerObjectifEpargne = (e) => {
    e.preventDefault();
    const label = savingsLabelInput.trim() || "Mon épargne";
    const rawTarget = savingsTargetInput === "" ? null : Number(savingsTargetInput);
    const targetUSD = rawTarget === null || isNaN(rawTarget) ? null : currency === "CDF" ? rawTarget / exchangeRate : rawTarget;
    setSavingsGoal((prev) => ({ label, target: targetUSD, current: prev?.current || 0 }));
    setShowEditSavings(false);
    setToast("Objectif d'épargne mis à jour ✅");
  };

  const ajouterContribution = (e) => {
    e.preventDefault();
    const raw = Number(contributionInput);
    if (!contributionInput || isNaN(raw) || raw <= 0) return;
    const usdAmount = currency === "CDF" ? raw / exchangeRate : raw;
    setSavingsGoal((prev) => ({
      ...(prev || { label: "Mon épargne", target: null }),
      current: (prev?.current || 0) + usdAmount,
    }));
    setContributionInput("");
    setShowAddContribution(false);
    setToast("Ajouté à ton épargne 💰");
  };

  const renderTransactionRow = (t) => (
    <div className="transaction" key={t.id}>
      <div className="transaction-icon" style={{ background: `${CATEGORY_COLORS[t.category] || "#64748b"}1a` }}>
        {CATEGORY_ICONS[t.category] || "🔖"}
      </div>

      <div className="transaction-info">
        <strong>{t.category}</strong>
        <span>{t.description}</span>
        <div className="transaction-meta">
          <small>{formatRelativeDate(t.date)}</small>
          {t.paymentMethod && (
            <span className="payment-tag" style={{ color: getPaymentMethod(t.paymentMethod).color }}>
              {getPaymentMethod(t.paymentMethod).label}
            </span>
          )}
        </div>
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

  setActiveExchangeRate(exchangeRate);

  if (authChecking) {
    return (
      <div className="app" data-theme={theme}>
        <style>{STYLES}</style>
        <div className="loading-screen">
          <div className="spinner" />
          <p>Vérification de ta session…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="app" data-theme={theme}>
        <style>{STYLES}</style>
        <div className="onboarding-screen">
          <div className="onboarding-card">
            <img src={LOGO_DATA_URI} alt="Mkelo" className="onboarding-logo" />
            <h1>{authView === "login" ? "Content de te revoir" : "Bienvenue sur Mkelo"}</h1>
            <p>
              {authView === "login"
                ? "Connecte-toi pour retrouver tes données."
                : "Crée ton compte pour suivre ton argent au quotidien."}
            </p>

            <form onSubmit={authView === "login" ? gererConnexion : gererInscription}>
              {authView === "signup" && (
                <>
                  <label htmlFor="auth-name">Comment veux-tu qu'on t'appelle ?</label>
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Ton prénom"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    autoFocus
                  />
                </>
              )}

              <label htmlFor="auth-email">Email</label>
              <input
                id="auth-email"
                type="email"
                placeholder="toi@exemple.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
              />

              <label htmlFor="auth-password">Mot de passe</label>
              <input
                id="auth-password"
                type="password"
                placeholder={authView === "signup" ? "Au moins 6 caractères" : "••••••••"}
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
              />

              {authView === "signup" && (
                <>
                  <label>Choisis ton personnage</label>
                  <div className="avatar-picker">
                    {AVATARS.map((a) => (
                      <button
                        type="button"
                        key={a.key}
                        className={`avatar-option ${authAvatar === a.key ? "selected" : ""}`}
                        style={{ background: `${a.color}22`, borderColor: authAvatar === a.key ? a.color : "transparent" }}
                        onClick={() => setAuthAvatar(a.key)}
                        aria-label={a.key}
                      >
                        {a.emoji}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {authError && <span className="error-text">{authError}</span>}

              <button className="submit-button" type="submit" disabled={authSubmitting}>
                {authSubmitting ? "Un instant…" : authView === "login" ? "Se connecter" : "Créer mon compte"}
              </button>
            </form>

            <button
              type="button"
              className="auth-switch"
              onClick={() => {
                setAuthView((v) => (v === "login" ? "signup" : "login"));
                setAuthError("");
              }}
            >
              {authView === "login" ? "Pas encore de compte ? Inscris-toi" : "Déjà un compte ? Connecte-toi"}
            </button>
          </div>
        </div>
      </div>
    );
  }

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

      {updateAvailable && (
        <div className="update-banner">
          <span>Une nouvelle version de Mkelo est disponible</span>
          <button onClick={() => window.location.reload()}>Actualiser</button>
        </div>
      )}

      {/* ================= HEADER ================= */}
      <header className="header">
        <div>
          <p className="greeting">Bonjour, {profile?.name} 👋</p>
          <h1>Mkelo</h1>
        </div>

        <div className="notif-wrap">
          <button
            className="notification"
            aria-label="Notifications"
            onClick={() => setShowNotifPanel((v) => !v)}
          >
            <Bell size={19} />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
          </button>

          {showNotifPanel && (
            <>
              <div className="notif-scrim" onClick={() => setShowNotifPanel(false)} />
              <div className="notif-panel">
                <div className="notif-panel-header">
                  <strong>Notifications</strong>
                  {notifications.length > 0 && (
                    <div className="notif-panel-actions">
                      <button onClick={marquerToutLu} aria-label="Tout marquer comme lu">
                        <CheckCheck size={14} /> Tout lire
                      </button>
                      <button onClick={effacerToutesNotifications} aria-label="Tout effacer" className="notif-clear-all">
                        <Trash2 size={14} /> Tout effacer
                      </button>
                    </div>
                  )}
                </div>

                <div className="notif-list">
                  {notifications.length === 0 ? (
                    <EmptyState label="Aucune notification pour le moment" />
                  ) : (
                    notifications.slice(0, 20).map((n) => (
                      <div
                        key={n.id}
                        className={`notif-item ${n.read ? "" : "unread"}`}
                        onClick={() => marquerLu(n.id)}
                      >
                        <span className={`notif-icon ${n.type === "bas" ? "notif-icon-bas" : "notif-icon-haut"}`}>
                          {n.type === "bas" ? <TrendingDown size={15} /> : <TrendingUp size={15} />}
                        </span>
                        <div className="notif-item-info">
                          <strong>{n.title}</strong>
                          <span>{n.message}</span>
                          <small>{formatRelativeDate(n.date)}</small>
                        </div>
                        {!n.read && <span className="notif-dot" />}
                        <button
                          className="notif-delete-btn"
                          aria-label="Supprimer cette notification"
                          onClick={(e) => {
                            e.stopPropagation();
                            supprimerNotification(n.id);
                          }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
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

          <section className="card">
            <div className="section-header">
              <h2>Dettes & Épargne</h2>
              <button onClick={() => setActiveTab("dettes")}>Voir tout</button>
            </div>

            <div className="mini-stats">
              <div className="mini-stat">
                <span>On me doit</span>
                <strong className="income-text">{formatAmount(totalOnMeDoit, currency)}</strong>
              </div>
              <div className="mini-stat">
                <span>Je dois</span>
                <strong className="expense-text">{formatAmount(totalJeDois, currency)}</strong>
              </div>
            </div>

            {savingsGoal?.target ? (
              <div className="savings-progress-mini">
                <div className="savings-progress-mini-header">
                  <span>{savingsGoal.label}</span>
                  <strong>{formatAmount(savingsGoal.current, currency)} / {formatAmount(savingsGoal.target, currency)}</strong>
                </div>
                <div className="progress-bar-wrap">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(100, (savingsGoal.current / savingsGoal.target) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="settings-hint">Aucun objectif d'épargne défini pour l'instant.</p>
            )}
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

          <section className="card">
            <div className="section-header">
              <h2><Lightbulb size={17} className="section-icon" /> Insights intelligents</h2>
            </div>

            {insights.length === 0 ? (
              <EmptyState label="Ajoute quelques transactions pour débloquer tes premiers insights" />
            ) : (
              <div className="insights-list">
                {insights.map((ins, i) => (
                  <div className="insight-item" key={i}>
                    <span className="insight-icon">
                      {ins.icon === "up" && <TrendingUp size={15} />}
                      {ins.icon === "down" && <TrendingDown size={15} />}
                      {ins.icon === "category" && <Sparkles size={15} />}
                      {ins.icon === "payment" && <Wallet size={15} />}
                      {ins.icon === "savings" && <PiggyBank size={15} />}
                      {ins.icon === "debt" && <HandCoins size={15} />}
                      {ins.icon === "budget" && <Receipt size={15} />}
                    </span>
                    <span>{ins.text}</span>
                  </div>
                ))}
              </div>
            )}
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

          <section className="card">
            <div className="section-header">
              <h2><Receipt size={17} className="section-icon" /> Budget par catégorie</h2>
              <button
                onClick={() => {
                  const fromUSD = (v) => (currency === "CDF" ? String(Math.round(v * exchangeRate)) : String(v));
                  const inputs = {};
                  CATEGORIES.forEach((c) => {
                    inputs[c] = budgets[c] != null ? fromUSD(budgets[c]) : "";
                  });
                  setBudgetInputs(inputs);
                  setShowEditBudgets(true);
                }}
              >
                Gérer
              </button>
            </div>

            {budgetProgress.length === 0 ? (
              <EmptyState label="Aucun budget défini pour l'instant" />
            ) : (
              <div className="payment-breakdown">
                {budgetProgress.map((b) => (
                  <div className="budget-row" key={b.category}>
                    <div className="budget-row-header">
                      <span>{CATEGORY_ICONS[b.category] || "🔖"} {b.category}</span>
                      <span className={b.over ? "expense-text" : ""}>
                        {formatAmount(b.spent, currency)} / {formatAmount(b.budget, currency)}
                      </span>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${b.pct}%`, background: b.over ? "var(--expense)" : "var(--accent)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="card">
            <div className="section-header">
              <h2>Dépenses par mode de paiement</h2>
            </div>

            {paymentBreakdown.length === 0 ? (
              <EmptyState label="Pas encore de dépenses à répartir" />
            ) : (
              <div className="payment-breakdown">
                {paymentBreakdown.map((p) => (
                  <div className="payment-breakdown-row" key={p.key}>
                    <div className="payment-breakdown-label">
                      <span>{p.emoji}</span>
                      <span>{p.label}</span>
                    </div>
                    <div className="payment-breakdown-bar-wrap">
                      <div className="payment-breakdown-bar" style={{ width: `${p.pct}%`, background: p.color }} />
                    </div>
                    <strong>{formatAmount(p.value, currency)}</strong>
                  </div>
                ))}
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

      {/* ================= DETTES & ÉPARGNE ================= */}
      {activeTab === "dettes" && (
        <main>
          <button className="back-link" onClick={() => setActiveTab("accueil")}>
            <ChevronLeft size={16} /> Retour
          </button>

          <section className="page-title">
            <h2>Dettes & Épargne</h2>
            <p>Ce qu'on te doit, ce que tu dois, et ton objectif d'épargne</p>
          </section>

          <section className="card">
            <div className="section-header">
              <h2><PiggyBank size={17} className="section-icon" /> Objectif d'épargne</h2>
              <button
                onClick={() => {
                  setSavingsLabelInput(savingsGoal?.label || "");
                  const fromUSD = (v) => (v == null ? "" : String(currency === "CDF" ? Math.round(v * exchangeRate) : v));
                  setSavingsTargetInput(fromUSD(savingsGoal?.target));
                  setShowEditSavings(true);
                }}
              >
                Modifier
              </button>
            </div>

            {savingsGoal?.target ? (
              <>
                <div className="savings-progress-mini-header">
                  <span>{savingsGoal.label}</span>
                  <strong>{formatAmount(savingsGoal.current, currency)} / {formatAmount(savingsGoal.target, currency)}</strong>
                </div>
                <div className="progress-bar-wrap">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(100, (savingsGoal.current / savingsGoal.target) * 100)}%` }}
                  />
                </div>
                <button className="profile-button" onClick={() => setShowAddContribution(true)}>
                  Ajouter à mon épargne
                </button>
              </>
            ) : (
              <EmptyState label="Définis un objectif pour commencer à épargner" />
            )}
          </section>

          <section className="card">
            <div className="section-header">
              <h2><HandCoins size={17} className="section-icon" /> Dettes</h2>
              <button
                onClick={() => {
                  setDebtForm({ type: "on-me-doit", person: "", amount: "", description: "" });
                  setDebtErrors({});
                  setShowAddDebt(true);
                }}
              >
                + Ajouter
              </button>
            </div>

            <div className="mini-stats">
              <div className="mini-stat">
                <span>On me doit</span>
                <strong className="income-text">{formatAmount(totalOnMeDoit, currency)}</strong>
              </div>
              <div className="mini-stat">
                <span>Je dois</span>
                <strong className="expense-text">{formatAmount(totalJeDois, currency)}</strong>
              </div>
            </div>

            <div className="transaction-list">
              {debts.length === 0 ? (
                <EmptyState label="Aucune dette enregistrée" />
              ) : (
                [...debts]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((d) => (
                    <div className="transaction" key={d.id}>
                      <div
                        className="transaction-icon"
                        style={{ background: d.type === "on-me-doit" ? "var(--income-bg)" : "var(--expense-bg)" }}
                      >
                        {d.type === "on-me-doit" ? "🤝" : "💸"}
                      </div>

                      <div className="transaction-info">
                        <strong>{d.person}</strong>
                        <span>{d.description || (d.type === "on-me-doit" ? "On me doit" : "Je dois")}</span>
                        <small>{formatRelativeDate(d.date)}</small>
                      </div>

                      {confirmDeleteDebtId === d.id ? (
                        <div className="confirm-row">
                          <button className="confirm-yes" onClick={() => supprimerDette(d.id)}>Remboursé</button>
                          <button className="confirm-no" onClick={() => setConfirmDeleteDebtId(null)}>Annuler</button>
                        </div>
                      ) : (
                        <>
                          <strong className={d.type === "on-me-doit" ? "amount income-text" : "amount expense-text"}>
                            {formatAmount(d.amount, currency)}
                          </strong>
                          <button
                            className="delete-btn"
                            aria-label="Marquer comme remboursée"
                            onClick={() => setConfirmDeleteDebtId(d.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  ))
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
            {getAvatar(profile?.avatar) ? (
              <div className="profile-avatar" style={{ background: `${getAvatar(profile.avatar).color}22` }}>
                <span>{getAvatar(profile.avatar).emoji}</span>
              </div>
            ) : (
              <div className="profile-avatar">{profile?.name?.charAt(0).toUpperCase() || "?"}</div>
            )}
            <h2>{profile?.name}</h2>
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

            <button
              className="profile-button"
              onClick={() => {
                setEditProfileName(profile?.name || "");
                setEditProfileAvatar(profile?.avatar || AVATARS[0].key);
                setShowEditProfile(true);
              }}
            >
              Modifier mon profil
            </button>
            <button
              className="profile-button"
              onClick={() => {
                setAlertInputCurrency(currency);
                const fromUSD = (v) => (v == null ? "" : String(currency === "CDF" ? Math.round(v * exchangeRate) : v));
                setAlertLowInput(fromUSD(alertSettings?.lowThreshold));
                setAlertHighInput(fromUSD(alertSettings?.highThreshold));
                setExchangeRateInput(String(exchangeRate));
                setShowAdvancedSettings(true);
              }}
            >
              Paramètres avancés
            </button>
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

        <button
          className="nav-add"
          onClick={() => {
            setForm((f) => ({ ...f, amountCurrency: currency }));
            setShowAdd(true);
          }}
          aria-label="Ajouter une transaction"
        >
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

              <div className="amount-row">
                <label htmlFor="amount">Montant</label>
                <div className="mini-segmented">
                  <button
                    type="button"
                    className={form.amountCurrency === "USD" ? "active" : ""}
                    onClick={() => setForm({ ...form, amountCurrency: "USD" })}
                  >
                    USD
                  </button>
                  <button
                    type="button"
                    className={form.amountCurrency === "CDF" ? "active" : ""}
                    onClick={() => setForm({ ...form, amountCurrency: "CDF" })}
                  >
                    CDF
                  </button>
                </div>
              </div>
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

              {form.category === "Autre" && (
                <input
                  id="custom-category"
                  type="text"
                  placeholder="Précise la catégorie (ex : Cadeau, École...)"
                  value={form.customCategory}
                  onChange={(e) => setForm({ ...form, customCategory: e.target.value })}
                  style={{ marginTop: "-2px" }}
                />
              )}

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

              <label>Mode de paiement</label>
              <div className="payment-selector">
                {PAYMENT_METHODS.map((p) => (
                  <button
                    type="button"
                    key={p.key}
                    className={`payment-chip ${form.paymentMethod === p.key ? "selected" : ""}`}
                    style={form.paymentMethod === p.key ? { borderColor: p.color, color: p.color, background: `${p.color}14` } : {}}
                    onClick={() => setForm({ ...form, paymentMethod: p.key })}
                  >
                    <span>{p.emoji}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>

              <button className="submit-button" type="submit">
                Ajouter la transaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODALE MODIFIER PROFIL ================= */}
      {showEditProfile && (
        <div className="modal-overlay" onClick={() => setShowEditProfile(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Modifier mon profil</h2>
              <button onClick={() => setShowEditProfile(false)} aria-label="Fermer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={enregistrerProfil}>
              <label htmlFor="edit-name">Prénom</label>
              <input
                id="edit-name"
                type="text"
                value={editProfileName}
                onChange={(e) => setEditProfileName(e.target.value)}
                autoFocus
              />

              <label>Personnage</label>
              <div className="avatar-picker">
                {AVATARS.map((a) => (
                  <button
                    type="button"
                    key={a.key}
                    className={`avatar-option ${editProfileAvatar === a.key ? "selected" : ""}`}
                    style={{ background: `${a.color}22`, borderColor: editProfileAvatar === a.key ? a.color : "transparent" }}
                    onClick={() => setEditProfileAvatar(a.key)}
                    aria-label={a.key}
                  >
                    {a.emoji}
                  </button>
                ))}
              </div>

              <button className="submit-button" type="submit">
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODALE PARAMÈTRES AVANCÉS ================= */}
      {showAdvancedSettings && (
        <div
          className="modal-overlay"
          onClick={() => { setShowAdvancedSettings(false); setShowResetConfirm(false); setShowChangeProfileConfirm(false); }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Paramètres avancés</h2>
              <button
                onClick={() => { setShowAdvancedSettings(false); setShowResetConfirm(false); setShowChangeProfileConfirm(false); }}
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="settings-list">
              <div className="account-block">
                <div className="account-block-header">
                  <User size={16} />
                  <span>Compte</span>
                </div>
                <p className="account-email">{session?.user?.email}</p>

                {showChangeProfileConfirm ? (
                  <div className="reset-confirm">
                    <p>Tu vas être déconnecté. Tes données restent en sécurité sur ton compte, prêtes pour la prochaine connexion.</p>
                    <div className="reset-confirm-buttons">
                      <button className="confirm-yes" onClick={seDeconnecter}>Oui, me déconnecter</button>
                      <button className="confirm-no" onClick={() => setShowChangeProfileConfirm(false)}>Annuler</button>
                    </div>
                  </div>
                ) : (
                  <button className="profile-button" onClick={() => setShowChangeProfileConfirm(true)}>
                    Se déconnecter
                  </button>
                )}
              </div>

              <div className="alert-thresholds">
                <p className="settings-hint">
                  Taux utilisé pour convertir tes montants entre USD et CDF partout dans l'app.
                </p>
                <form onSubmit={enregistrerTauxDeChange}>
                  <label htmlFor="exchange-rate">1 USD = ? FC</label>
                  <input
                    id="exchange-rate"
                    type="number"
                    step="1"
                    placeholder="Ex : 2200"
                    value={exchangeRateInput}
                    onChange={(e) => setExchangeRateInput(e.target.value)}
                  />

                  <button className="submit-button" type="submit">
                    Enregistrer le taux
                  </button>
                </form>
              </div>

              <div className="alert-thresholds">
                <p className="settings-hint">
                  Mkelo t'envoie une notification quand ton solde descend sous ton seuil bas, ou dépasse ton seuil haut.
                </p>
                <form onSubmit={enregistrerSeuils}>
                  <div className="amount-row">
                    <label htmlFor="alert-low">Seuil bas</label>
                    <div className="mini-segmented">
                      <button
                        type="button"
                        className={alertInputCurrency === "USD" ? "active" : ""}
                        onClick={() => {
                          if (alertInputCurrency === "CDF") {
                            const conv = (v) => (v === "" || isNaN(Number(v)) ? "" : String(Math.round((Number(v) / exchangeRate) * 100) / 100));
                            setAlertLowInput(conv(alertLowInput));
                            setAlertHighInput(conv(alertHighInput));
                          }
                          setAlertInputCurrency("USD");
                        }}
                      >
                        USD
                      </button>
                      <button
                        type="button"
                        className={alertInputCurrency === "CDF" ? "active" : ""}
                        onClick={() => {
                          if (alertInputCurrency === "USD") {
                            const conv = (v) => (v === "" || isNaN(Number(v)) ? "" : String(Math.round(Number(v) * exchangeRate)));
                            setAlertLowInput(conv(alertLowInput));
                            setAlertHighInput(conv(alertHighInput));
                          }
                          setAlertInputCurrency("CDF");
                        }}
                      >
                        CDF
                      </button>
                    </div>
                  </div>
                  <input
                    id="alert-low"
                    type="number"
                    step="0.01"
                    placeholder="Ex : 50"
                    value={alertLowInput}
                    onChange={(e) => setAlertLowInput(e.target.value)}
                  />

                  <label htmlFor="alert-high">Seuil haut ({alertInputCurrency})</label>
                  <input
                    id="alert-high"
                    type="number"
                    step="0.01"
                    placeholder="Ex : 800"
                    value={alertHighInput}
                    onChange={(e) => setAlertHighInput(e.target.value)}
                  />

                  <button className="submit-button" type="submit">
                    Enregistrer les seuils
                  </button>
                </form>
              </div>

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

              <div className="about-block">
                <strong>Mkelo</strong>
                <span>Version 1.0.0 — Gestion financière personnelle pour la RDC</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODALE GÉRER LES BUDGETS ================= */}
      {showEditBudgets && (
        <div className="modal-overlay" onClick={() => setShowEditBudgets(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Gérer mes budgets</h2>
              <button onClick={() => setShowEditBudgets(false)} aria-label="Fermer">
                <X size={18} />
              </button>
            </div>

            <p className="settings-hint">
              Fixe un budget mensuel par catégorie (en {currency}). Laisse vide pour ne pas suivre une catégorie.
            </p>

            <form onSubmit={enregistrerBudgets}>
              <div className="budget-form-list">
                {CATEGORIES.map((c) => (
                  <div className="budget-form-row" key={c}>
                    <label htmlFor={`budget-${c}`}>{CATEGORY_ICONS[c]} {c}</label>
                    <input
                      id={`budget-${c}`}
                      type="number"
                      step="0.01"
                      placeholder="—"
                      value={budgetInputs[c] || ""}
                      onChange={(e) => setBudgetInputs({ ...budgetInputs, [c]: e.target.value })}
                    />
                  </div>
                ))}
              </div>

              <button className="submit-button" type="submit">
                Enregistrer les budgets
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODALE AJOUTER DETTE ================= */}
      {showAddDebt && (
        <div className="modal-overlay" onClick={() => setShowAddDebt(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Ajouter une dette</h2>
              <button onClick={() => setShowAddDebt(false)} aria-label="Fermer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={ajouterDette} noValidate>
              <div className="type-selector">
                <button
                  type="button"
                  className={debtForm.type === "on-me-doit" ? "selected income" : ""}
                  onClick={() => setDebtForm({ ...debtForm, type: "on-me-doit" })}
                >
                  🤝 On me doit
                </button>
                <button
                  type="button"
                  className={debtForm.type === "je-dois" ? "selected expense" : ""}
                  onClick={() => setDebtForm({ ...debtForm, type: "je-dois" })}
                >
                  💸 Je dois
                </button>
              </div>

              <label htmlFor="debt-person">Personne</label>
              <input
                id="debt-person"
                type="text"
                placeholder="Ex : Grâce, Patrick..."
                value={debtForm.person}
                onChange={(e) => setDebtForm({ ...debtForm, person: e.target.value })}
                className={debtErrors.person ? "input-error" : ""}
              />
              {debtErrors.person && <span className="error-text">{debtErrors.person}</span>}

              <label htmlFor="debt-amount">Montant (USD)</label>
              <input
                id="debt-amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={debtForm.amount}
                onChange={(e) => setDebtForm({ ...debtForm, amount: e.target.value })}
                className={debtErrors.amount ? "input-error" : ""}
              />
              {debtErrors.amount && <span className="error-text">{debtErrors.amount}</span>}

              <label htmlFor="debt-desc">Description (optionnel)</label>
              <input
                id="debt-desc"
                type="text"
                placeholder="Ex : Prêt pour le loyer"
                value={debtForm.description}
                onChange={(e) => setDebtForm({ ...debtForm, description: e.target.value })}
              />

              <button className="submit-button" type="submit">
                Ajouter la dette
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODALE OBJECTIF D'ÉPARGNE ================= */}
      {showEditSavings && (
        <div className="modal-overlay" onClick={() => setShowEditSavings(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Objectif d'épargne</h2>
              <button onClick={() => setShowEditSavings(false)} aria-label="Fermer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={enregistrerObjectifEpargne}>
              <label htmlFor="savings-label">Nom de l'objectif</label>
              <input
                id="savings-label"
                type="text"
                placeholder="Ex : Acheter une moto"
                value={savingsLabelInput}
                onChange={(e) => setSavingsLabelInput(e.target.value)}
                autoFocus
              />

              <label htmlFor="savings-target">Montant visé ({currency})</label>
              <input
                id="savings-target"
                type="number"
                step="0.01"
                placeholder="Ex : 500"
                value={savingsTargetInput}
                onChange={(e) => setSavingsTargetInput(e.target.value)}
              />

              <button className="submit-button" type="submit">
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODALE AJOUTER À L'ÉPARGNE ================= */}
      {showAddContribution && (
        <div className="modal-overlay" onClick={() => setShowAddContribution(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Ajouter à mon épargne</h2>
              <button onClick={() => setShowAddContribution(false)} aria-label="Fermer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={ajouterContribution}>
              <label htmlFor="contribution-amount">Montant ({currency})</label>
              <input
                id="contribution-amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={contributionInput}
                onChange={(e) => setContributionInput(e.target.value)}
                autoFocus
              />

              <button className="submit-button" type="submit">
                Ajouter
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
.transaction-meta { display: flex; align-items: center; gap: 7px; }
.payment-tag {
  display: inline-flex; align-items: center; font-size: 9px; font-weight: 700;
  padding: 2px 7px; border-radius: 20px; border: 1px solid currentColor;
}

.payment-selector { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 4px; }
.payment-chip {
  display: flex; align-items: center; gap: 6px; padding: 9px 12px; border-radius: 30px;
  border: 1.5px solid var(--border); background: var(--bg); color: var(--text-muted); font-size: 12px; font-weight: 600;
}
.payment-chip.selected { font-weight: 800; }

.payment-breakdown { display: flex; flex-direction: column; gap: 13px; }
.payment-breakdown-row { display: grid; grid-template-columns: 120px 1fr auto; align-items: center; gap: 10px; }
.payment-breakdown-label { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.payment-breakdown-bar-wrap { height: 8px; border-radius: 6px; background: var(--bg); overflow: hidden; }
.payment-breakdown-bar { height: 100%; border-radius: 6px; }
.payment-breakdown-row strong { font-size: 12px; white-space: nowrap; }

.budget-row { display: flex; flex-direction: column; gap: 6px; }
.budget-row-header { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; }
.budget-row-header span:first-child { color: var(--text); font-weight: 600; }
.budget-row-header span:last-child { color: var(--text-muted); font-size: 11.5px; }

.budget-form-list { display: flex; flex-direction: column; gap: 4px; max-height: 320px; overflow-y: auto; margin: 8px 0; }
.budget-form-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 6px 0; }
.budget-form-row label { margin: 0; font-size: 13px; font-weight: 600; color: var(--text); flex-shrink: 0; }
.budget-form-row input {
  width: 110px; padding: 9px 11px; border: 1px solid var(--border); border-radius: 10px;
  outline: none; background: var(--bg); color: var(--text); text-align: right;
}
.budget-form-row input:focus { border-color: var(--accent); }
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
.profile-avatar span { font-size: 34px; line-height: 1; }
.profile-card h2 { margin: 0; font-size: 21px; }
.profile-card p { margin: 5px 0 20px; color: var(--text-muted); }

.avatar-picker { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 4px; margin-bottom: 4px; }
.avatar-option {
  width: 46px; height: 46px; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; border: 2px solid transparent; font-size: 22px; line-height: 1;
}
.avatar-option.selected { box-shadow: 0 0 0 2px var(--card-bg), 0 0 0 4px currentColor; }

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

.onboarding-screen {
  min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px;
}
.onboarding-card { width: min(100%, 420px); text-align: center; }
.onboarding-logo {
  width: 68px; height: 68px; margin: 0 auto 18px; display: block;
  border-radius: 22px; box-shadow: 0 10px 25px var(--shadow);
}
.onboarding-card h1 { margin: 0 0 8px; font-size: 24px; color: var(--accent-dark); }
.onboarding-card p { margin: 0 0 26px; color: var(--text-muted); font-size: 14px; }
.onboarding-card form { display: flex; flex-direction: column; gap: 9px; text-align: left; }
.onboarding-card label { color: var(--text); font-size: 13px; font-weight: 700; }
.onboarding-card input {
  width: 100%; padding: 14px; border: 1px solid var(--border); border-radius: 13px;
  outline: none; background: var(--card-bg); color: var(--text); font-size: 15px;
}
.onboarding-card input:focus { border-color: var(--accent); }
.onboarding-card .submit-button { margin-top: 10px; }
.auth-switch {
  display: block; width: 100%; margin-top: 16px; border: none; background: none;
  color: var(--accent); font-size: 12.5px; font-weight: 700; text-align: center;
}
.submit-button:disabled { opacity: 0.6; }

.notif-wrap { position: relative; }
.notification { position: relative; }
.notif-badge {
  position: absolute; top: -4px; right: -4px; min-width: 18px; height: 18px; padding: 0 4px;
  display: flex; align-items: center; justify-content: center; border-radius: 20px;
  background: var(--expense); color: white; font-size: 10px; font-weight: 800;
  border: 2px solid var(--card-bg);
}

.notif-scrim { position: fixed; inset: 0; z-index: 90; background: transparent; }

.notif-panel {
  position: absolute; top: 52px; right: 0; z-index: 95; width: min(340px, 88vw);
  max-height: 420px; display: flex; flex-direction: column;
  border-radius: 18px; background: var(--card-bg); box-shadow: 0 15px 40px var(--shadow);
  overflow: hidden;
}
.notif-panel-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; border-bottom: 1px solid var(--border);
}
.notif-panel-header strong { font-size: 14px; }
.notif-panel-actions { display: flex; align-items: center; gap: 10px; }
.notif-panel-header button {
  display: flex; align-items: center; gap: 4px; border: none; background: none;
  color: var(--accent); font-size: 11px; font-weight: 700; white-space: nowrap;
}
.notif-clear-all { color: var(--expense) !important; }

.notif-list { overflow-y: auto; padding: 4px 8px; }
.notif-item {
  position: relative; display: flex; align-items: flex-start; gap: 10px; padding: 12px 30px 12px 8px;
  border-bottom: 1px solid var(--border); cursor: pointer;
}
.notif-item:last-child { border-bottom: none; }
.notif-item.unread { background: color-mix(in srgb, var(--accent) 6%, transparent); border-radius: 12px; }
.notif-icon {
  flex-shrink: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  border-radius: 10px;
}
.notif-icon-bas { background: var(--expense-bg); color: var(--expense); }
.notif-icon-haut { background: var(--income-bg); color: var(--income); }
.notif-item-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.notif-item-info strong { font-size: 12.5px; }
.notif-item-info span { font-size: 11.5px; color: var(--text-muted); line-height: 1.4; }
.notif-item-info small { font-size: 10px; color: var(--text-faint); }
.notif-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); margin-top: 6px; flex-shrink: 0; }
.notif-delete-btn {
  position: absolute; top: 10px; right: 4px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;
  border: none; border-radius: 50%; background: transparent; color: var(--text-faint);
}
.notif-delete-btn:hover { background: var(--expense-bg); color: var(--expense); }

.alert-thresholds { display: flex; flex-direction: column; gap: 4px; }
.settings-hint { margin: 0 0 6px; font-size: 12px; color: var(--text-muted); line-height: 1.5; }
.alert-thresholds form { display: flex; flex-direction: column; gap: 7px; }
.alert-thresholds label { color: var(--text); font-size: 13px; font-weight: 700; }
.alert-thresholds input {
  width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 12px;
  outline: none; background: var(--bg); color: var(--text);
}
.alert-thresholds input:focus { border-color: var(--accent); }
.alert-thresholds .submit-button { margin-top: 4px; padding: 12px; }

.settings-list { display: flex; flex-direction: column; gap: 16px; }

.update-banner {
  position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: center;
  gap: 12px; padding: 10px 16px; background: var(--accent); color: white; font-size: 12.5px; font-weight: 600;
  flex-wrap: wrap; text-align: center;
}
.update-banner button {
  border: none; padding: 6px 14px; border-radius: 20px; background: white; color: var(--accent);
  font-size: 11.5px; font-weight: 800;
}

.account-block { display: flex; flex-direction: column; gap: 4px; }
.account-block-header { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 700; color: var(--text); }
.account-email { margin: 0 0 8px; font-size: 12.5px; color: var(--text-muted); word-break: break-all; }

.section-icon { margin-right: 6px; vertical-align: -3px; color: var(--accent); }

.back-link {
  display: inline-flex; align-items: center; gap: 4px; border: none; background: none;
  color: var(--text-muted); font-size: 13px; font-weight: 600; padding: 4px 0; margin-bottom: 4px;
}
.back-link:hover { color: var(--accent); }

.mini-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
.mini-stat { display: flex; flex-direction: column; gap: 4px; padding: 12px; border-radius: 13px; background: var(--bg); }
.mini-stat span { font-size: 11px; color: var(--text-muted); }
.mini-stat strong { font-size: 16px; }

.savings-progress-mini { display: flex; flex-direction: column; gap: 8px; }
.savings-progress-mini-header { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; }
.savings-progress-mini-header span { color: var(--text-muted); }
.savings-progress-mini-header strong { color: var(--text); font-size: 13px; }

.progress-bar-wrap { height: 10px; border-radius: 8px; background: var(--bg); overflow: hidden; margin: 4px 0 12px; }
.progress-bar-fill { height: 100%; border-radius: 8px; background: var(--accent); transition: width 0.3s ease; }

.insights-list { display: flex; flex-direction: column; gap: 10px; }
.insight-item {
  display: flex; align-items: flex-start; gap: 10px; padding: 11px; border-radius: 13px; background: var(--bg);
  font-size: 12.5px; color: var(--text); line-height: 1.5;
}
.insight-icon {
  flex-shrink: 0; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  border-radius: 9px; background: var(--card-bg); color: var(--accent);
}
.about-block {
  margin-top: 8px; padding: 14px; border-radius: 13px; background: var(--bg);
  display: flex; flex-direction: column; gap: 4px; text-align: center;
}
.about-block strong { color: var(--text); font-size: 14px; }
.about-block span { color: var(--text-muted); font-size: 11px; }

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

.amount-row { display: flex; align-items: center; justify-content: space-between; margin-top: 7px; }
.amount-row label { margin-top: 0; }
.mini-segmented { display: flex; gap: 3px; padding: 3px; border-radius: 9px; background: var(--bg); }
.mini-segmented button {
  border: none; padding: 5px 10px; border-radius: 7px; background: transparent;
  color: var(--text-muted); font-size: 11px; font-weight: 700;
}
.mini-segmented button.active { background: var(--accent); color: white; }
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
