import { useMemo, useRef, useState } from "react";
import { ArrowLeft, Camera, CheckCircle2, KeyRound, Loader2, Mail, Phone, Save, Shield, Trash2, Upload, User } from "lucide-react";
export interface ProfilePageProps {
  onBack: () => void;
}

// Data models declared outside the component per rules
const notifOptions: {
  id: string;
  label: string;
  description: string;
}[] = [{
  id: "thesis",
  label: "Thesis alerts",
  description: "Updates when a thesis strengthens or weakens"
}, {
  id: "performance",
  label: "Performance updates",
  description: "Weekly and monthly performance summaries"
}, {
  id: "news",
  label: "News & market events",
  description: "Important headlines affecting your holdings"
}];
const privacyOptions: {
  id: string;
  label: string;
  description: string;
}[] = [{
  id: "profileVisible",
  label: "Profile visibility",
  description: "Allow your profile to be discoverable by your invited collaborators"
}, {
  id: "sharePerf",
  label: "Share performance",
  description: "Allow aggregate performance to be shared in private reports"
}, {
  id: "dataCollection",
  label: "Data collection",
  description: "Help us improve by sharing anonymized usage analytics"
}];
const riskLevels: {
  id: "conservative" | "moderate" | "aggressive";
  label: string;
  note: string;
}[] = [{
  id: "conservative",
  label: "Conservative",
  note: "Capital preservation first"
}, {
  id: "moderate",
  label: "Moderate",
  note: "Balanced growth and risk"
}, {
  id: "aggressive",
  label: "Aggressive",
  note: "Max growth, higher volatility"
}];
const sectors: {
  id: string;
  label: string;
}[] = [{
  id: "tech",
  label: "Technology"
}, {
  id: "health",
  label: "Healthcare"
}, {
  id: "energy",
  label: "Energy"
}, {
  id: "finance",
  label: "Financials"
}, {
  id: "consumer",
  label: "Consumer"
}, {
  id: "crypto",
  label: "Crypto"
}, {
  id: "bonds",
  label: "Bonds"
}, {
  id: "etf",
  label: "ETFs"
}];
const currencies: {
  id: string;
  label: string;
  symbol: string;
}[] = [{
  id: "USD",
  label: "US Dollar",
  symbol: "$"
}, {
  id: "EUR",
  label: "Euro",
  symbol: "€"
}, {
  id: "GBP",
  label: "British Pound",
  symbol: "£"
}, {
  id: "JPY",
  label: "Japanese Yen",
  symbol: "¥"
}];
export function ProfilePage({
  onBack
}: ProfilePageProps) {
  // Personal info state
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [info, setInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "",
    bio: "Long-term investor focused on quality growth and durable moats."
  });
  const [infoEditing, setInfoEditing] = useState(false);
  const [infoStatus, setInfoStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  } | null>(null);

  // Account settings state
  const [settingsEditing, setSettingsEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: ""
  });
  const [notif, setNotif] = useState<Record<string, boolean>>({
    thesis: true,
    performance: true,
    news: false
  });
  const [privacy, setPrivacy] = useState<Record<string, boolean>>({
    profileVisible: true,
    sharePerf: false,
    dataCollection: true
  });
  const [settingsStatus, setSettingsStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  } | null>(null);

  // Investment preferences state
  const [prefsEditing, setPrefsEditing] = useState(false);
  const [risk, setRisk] = useState<"conservative" | "moderate" | "aggressive">("moderate");
  const [selectedSectors, setSelectedSectors] = useState<Record<string, boolean>>({
    tech: true,
    crypto: true,
    bonds: false,
    etf: true
  });
  const [currency, setCurrency] = useState("USD");
  const [goals, setGoals] = useState("Outperform SPX by 3-5% annually with controlled drawdowns.");
  const [prefsStatus, setPrefsStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  } | null>(null);

  // Data management
  const [exporting, setExporting] = useState(false);
  const [dangerStatus, setDangerStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState("");
  const disabledExport = useMemo(() => exporting, [exporting]);
  function handleAvatarUpload(file: File) {
    const reader = new FileReader();
    reader.onload = () => setAvatar(String(reader.result));
    reader.readAsDataURL(file);
  }
  function validateEmail(v: string) {
    return /\S+@\S+\.\S+/.test(v);
  }
  function validatePhone(v: string) {
    return v.length === 0 || /^\+?[0-9\- ]{7,15}$/.test(v);
  }
  async function savePersonal() {
    setInfoStatus(null);
    if (!info.name.trim()) {
      setInfoStatus({
        type: "error",
        message: "Name is required."
      });
      return;
    }
    if (!validateEmail(info.email)) {
      setInfoStatus({
        type: "error",
        message: "Enter a valid email."
      });
      return;
    }
    if (!validatePhone(info.phone)) {
      setInfoStatus({
        type: "error",
        message: "Enter a valid phone number."
      });
      return;
    }
    setInfoEditing(false);
    setInfoStatus({
      type: "success",
      message: "Personal information saved."
    });
  }
  async function saveSettings() {
    setSettingsStatus(null);
    if (passwords.current || passwords.next || passwords.confirm) {
      if (passwords.next.length < 8) {
        setSettingsStatus({
          type: "error",
          message: "New password must be at least 8 characters."
        });
        return;
      }
      if (passwords.next !== passwords.confirm) {
        setSettingsStatus({
          type: "error",
          message: "Passwords do not match."
        });
        return;
      }
    }
    setPasswords({
      current: "",
      next: "",
      confirm: ""
    });
    setSettingsEditing(false);
    setSettingsStatus({
      type: "success",
      message: "Settings updated."
    });
  }
  async function savePrefs() {
    setPrefsStatus(null);
    if (!goals.trim()) {
      setPrefsStatus({
        type: "error",
        message: "Please describe your investment goals."
      });
      return;
    }
    setPrefsEditing(false);
    setPrefsStatus({
      type: "success",
      message: "Preferences saved."
    });
  }
  function exportData() {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setDangerStatus({
        type: "success",
        message: "Your portfolio data export has started. You'll receive an email shortly."
      });
    }, 1200);
  }
  function deleteAccount() {
    if (confirmDelete !== "DELETE") {
      setDangerStatus({
        type: "error",
        message: "Type DELETE in uppercase to confirm."
      });
      return;
    }
    setDangerStatus({
      type: "success",
      message: "Your account has been queued for deletion."
    });
  }
  return <section className="p-6 lg:p-8 max-w-6xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Dashboard</span>
        </button>
        <div className="inline-flex items-center gap-2 text-gray-500">
          <Shield className="h-4 w-4" />
          <span className="text-sm">Secure settings</span>
        </div>
      </header>

      <article className="space-y-8">
        <section aria-labelledby="personal-heading" className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 id="personal-heading" className="text-xl font-semibold text-gray-900">Personal Information</h1>
            {!infoEditing ? <button onClick={() => setInfoEditing(true)} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <User className="h-4 w-4" />
                <span className="font-medium">Edit</span>
              </button> : <div className="inline-flex items-center gap-2">
                <button onClick={savePersonal} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  <span className="text-sm">Save</span>
                </button>
                <button onClick={() => {
              setInfoEditing(false);
              setInfoStatus(null);
            }} className="text-gray-500 hover:text-gray-700">Cancel</button>
              </div>}
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                {avatar ? <img src={avatar} alt="User avatar" className="h-full w-full object-cover" /> : <User className="h-8 w-8 text-gray-400" />}
              </div>
              <div className="mt-3">
                <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={e => {
                const f = e.target.files?.[0];
                if (f) handleAvatarUpload(f);
              }} />
                <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Camera className="h-4 w-4" />
                  <span>Upload Photo</span>
                </button>
              </div>
            </div>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1" onSubmit={e => {
            e.preventDefault();
          }}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input id="name" disabled={!infoEditing} value={info.name} onChange={e => setInfo({
                ...info,
                name: e.target.value
              })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input id="email" type="email" disabled={!infoEditing} value={info.email} onChange={e => setInfo({
                  ...info,
                  email: e.target.value
                })} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input id="phone" type="tel" disabled={!infoEditing} value={info.phone} onChange={e => setInfo({
                  ...info,
                  phone: e.target.value
                })} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea id="bio" disabled={!infoEditing} value={info.bio} onChange={e => setInfo({
                ...info,
                bio: e.target.value
              })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-24" />
              </div>
            </form>
          </div>
          {infoStatus?.type && <p role="status" className={`mt-4 text-sm ${infoStatus.type === "success" ? "text-green-700" : "text-red-700"}`}>
              {infoStatus.message}
            </p>}
        </section>

        <section aria-labelledby="settings-heading" className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="settings-heading" className="text-xl font-semibold text-gray-900">Account Settings</h2>
            {!settingsEditing ? <button onClick={() => setSettingsEditing(true)} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Edit</span>
              </button> : <div className="inline-flex items-center gap-2">
                <button onClick={saveSettings} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  <span className="text-sm">Save</span>
                </button>
                <button onClick={() => {
              setSettingsEditing(false);
              setSettingsStatus(null);
              setPasswords({
                current: "",
                next: "",
                confirm: ""
              });
            }} className="text-gray-500 hover:text-gray-700">Cancel</button>
              </div>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form className="lg:col-span-2 space-y-4" onSubmit={e => {
            e.preventDefault();
          }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input type="password" placeholder="Current" disabled={!settingsEditing} value={passwords.current} onChange={e => setPasswords({
                    ...passwords,
                    current: e.target.value
                  })} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input type="password" placeholder="New (min 8)" disabled={!settingsEditing} value={passwords.next} onChange={e => setPasswords({
                    ...passwords,
                    next: e.target.value
                  })} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input type="password" placeholder="Confirm" disabled={!settingsEditing} value={passwords.confirm} onChange={e => setPasswords({
                    ...passwords,
                    confirm: e.target.value
                  })} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Email Notifications</p>
                <ul className="space-y-2">
                  {notifOptions.map(opt => <li key={opt.id} className="flex items-start justify-between rounded-lg border border-gray-200 p-3">
                      <div>
                        <p className="font-medium text-gray-900">{opt.label}</p>
                        <p className="text-sm text-gray-600">{opt.description}</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input aria-label={opt.label} type="checkbox" className="sr-only peer" disabled={!settingsEditing} checked={!!notif[opt.id]} onChange={e => setNotif({
                      ...notif,
                      [opt.id]: e.target.checked
                    })} />
                        <span className="w-10 h-6 bg-gray-200 rounded-full relative transition-colors peer-checked:bg-blue-600"></span>
                        <span className="absolute w-5 h-5 bg-white rounded-full shadow -ml-9 mt-0.5 transition-transform peer-checked:translate-x-4"></span>
                      </label>
                    </li>)}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Privacy</p>
                <ul className="space-y-2">
                  {privacyOptions.map(opt => <li key={opt.id} className="flex items-start justify-between rounded-lg border border-gray-200 p-3">
                      <div>
                        <p className="font-medium text-gray-900">{opt.label}</p>
                        <p className="text-sm text-gray-600">{opt.description}</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input aria-label={opt.label} type="checkbox" className="sr-only peer" disabled={!settingsEditing} checked={!!privacy[opt.id]} onChange={e => setPrivacy({
                      ...privacy,
                      [opt.id]: e.target.checked
                    })} />
                        <span className="w-10 h-6 bg-gray-200 rounded-full relative transition-colors peer-checked:bg-blue-600"></span>
                        <span className="absolute w-5 h-5 bg-white rounded-full shadow -ml-9 mt-0.5 transition-transform peer-checked:translate-x-4"></span>
                      </label>
                    </li>)}
                </ul>
              </div>
            </form>

            <aside className="lg:col-span-1 space-y-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-800">Two-factor authentication and SSO coming soon.</p>
              </div>
            </aside>
          </div>
          {settingsStatus?.type && <p role="status" className={`mt-4 text-sm ${settingsStatus.type === "success" ? "text-green-700" : "text-red-700"}`}>
              {settingsStatus.message}
            </p>}
        </section>

        <section aria-labelledby="prefs-heading" className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="prefs-heading" className="text-xl font-semibold text-gray-900">Investment Preferences</h2>
            {!prefsEditing ? <button onClick={() => setPrefsEditing(true)} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Upload className="h-4 w-4" />
                <span className="font-medium">Edit</span>
              </button> : <div className="inline-flex items-center gap-2">
                <button onClick={savePrefs} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  <span className="text-sm">Save</span>
                </button>
                <button onClick={() => {
              setPrefsEditing(false);
              setPrefsStatus(null);
            }} className="text-gray-500 hover:text-gray-700">Cancel</button>
              </div>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form className="space-y-4 lg:col-span-2" onSubmit={e => {
            e.preventDefault();
          }}>
              <fieldset>
                <legend className="text-sm font-medium text-gray-700 mb-2">Risk Tolerance</legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {riskLevels.map(r => <button key={r.id} type="button" disabled={!prefsEditing} onClick={() => setRisk(r.id)} className={`text-left rounded-lg border p-3 ${risk === r.id ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white"}`}>
                      <p className="font-medium text-gray-900">{r.label}</p>
                      <p className="text-xs text-gray-600">{r.note}</p>
                    </button>)}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-medium text-gray-700 mb-2">Preferred Sectors & Asset Types</legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sectors.map(s => <label key={s.id} className={`flex items-center justify-between rounded-lg border p-2 ${selectedSectors[s.id] ? "border-blue-300 bg-blue-50" : "border-gray-200"}`}>
                      <span className="text-sm text-gray-800">{s.label}</span>
                      <input type="checkbox" disabled={!prefsEditing} checked={!!selectedSectors[s.id]} onChange={e => setSelectedSectors({
                    ...selectedSectors,
                    [s.id]: e.target.checked
                  })} className="h-4 w-4" />
                    </label>)}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                  <select disabled={!prefsEditing} value={currency} onChange={e => setCurrency(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {currencies.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Investment Goals</label>
                  <textarea disabled={!prefsEditing} value={goals} onChange={e => setGoals(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-24" />
                </div>
              </div>
            </form>

            <aside className="lg:col-span-1 space-y-4">
              <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
                <p className="text-sm text-gray-700">These preferences guide insights, alerts, and suggested benchmarks across your dashboard.</p>
              </div>
            </aside>
          </div>
          {prefsStatus?.type && <p role="status" className={`mt-4 text-sm ${prefsStatus.type === "success" ? "text-green-700" : "text-red-700"}`}>
              {prefsStatus.message}
            </p>}
        </section>

        <section aria-labelledby="data-heading" className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="data-heading" className="text-xl font-semibold text-gray-900">Data Management</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={exportData} disabled={disabledExport} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  <span>Export Portfolio Data</span>
                </button>
                <div className="text-sm text-gray-600">Exports include holdings, performance, and activity in CSV format.</div>
              </div>

              <div className="border rounded-lg p-4 border-red-200 bg-red-50">
                <h3 className="font-semibold text-red-800 mb-2 inline-flex items-center gap-2"><Trash2 className="h-4 w-4" /><span>Delete Account</span></h3>
                <p className="text-sm text-red-700 mb-3">This action is permanent. Type DELETE to confirm, then click the button.</p>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <input aria-label="Type DELETE to confirm" value={confirmDelete} onChange={e => setConfirmDelete(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="DELETE" />
                  <button onClick={deleteAccount} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-100">
                    <Trash2 className="h-4 w-4" />
                    <span>Confirm Deletion</span>
                  </button>
                </div>
              </div>

              {dangerStatus?.type && <p role="status" className={`text-sm ${dangerStatus.type === "success" ? "text-green-700" : "text-red-700"}`}>{dangerStatus.message}</p>}
            </div>

            <aside className="lg:col-span-1">
              <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-1 inline-flex items-center gap-2"><Shield className="h-4 w-4" /><span>Data Privacy</span></h3>
                <p className="text-sm text-gray-700">We encrypt your data at rest and in transit. You control what gets exported and who can view your reports.</p>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>GDPR compliant</span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </section>;
}
export default ProfilePage;