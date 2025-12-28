import { useState } from 'react'
import { Activity, Database, Table2, Sun, Moon, Command } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import DataTableList from './components/DataTableList'
import DataTableEditor from './components/DataTableEditor'
import LanguageSwitcher from './components/LanguageSwitcher'
import { useWebSocket } from './hooks/useWebSocket'
import { useTheme } from './contexts/ThemeContext'

// Placeholder for missing components
const ProcessMonitor = () => <div className="p-4">Process Monitor Placeholder</div>
const ETLTaskList = () => <div className="p-4">ETL Task List Placeholder</div>
const ETLTaskEditor = () => <div className="p-4">ETL Task Editor Placeholder</div>

function App() {
  const { t } = useTranslation('translation', { keyPrefix: 'easyquant' })
  const [activeTab, setActiveTab] = useState('tables')
  const [editId, setEditId] = useState(null)
  const { theme, toggleTheme } = useTheme()
  
  // Global WebSocket Connection (for System Status)
  const { status, systemStatus } = useWebSocket()

  const handleNavigate = (tab: string, id: any = null) => {
    setActiveTab(tab)
    setEditId(id)
  }

  const tabs = [
    { id: 'tables', name: t('nav.schemas') || 'Schemas', icon: Table2 },
    { id: 'etl', name: t('nav.pipelines') || 'Pipelines', icon: Database },
    { id: 'monitor', name: t('nav.monitor') || 'Monitor', icon: Activity },
  ]

  return (
    <div className="min-h-screen bg-eq-bg-base text-eq-text-primary selection:bg-eq-primary-500/20 selection:text-eq-primary-600">
      {/* Header */}
      <header className="bg-eq-bg-surface border-b border-eq-border-subtle sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo Area */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-eq-primary-500 to-indigo-600 rounded-md shadow-sm flex items-center justify-center">
                <Command className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-sm font-bold text-eq-text-primary tracking-tight leading-none">
                  EasyQuant <span className="font-normal text-eq-text-muted">Pro</span>
                </h1>
              </div>
            </div>

            {/* Right Side: Stats & Theme */}
            <div className="flex items-center gap-4">
              {/* System Metrics (Minimalist) */}
              <div className="hidden md:flex items-center gap-4 text-xs font-mono text-eq-text-secondary border-r border-eq-border-subtle pr-4">
                 <div className="flex items-center gap-1.5" title="Server Status">
                    <span className={`w-1.5 h-1.5 rounded-full ${status === 'connected' ? 'bg-eq-success-solid animate-pulse' : 'bg-eq-danger-solid'}`}></span>
                    <span className={status === 'connected' ? 'text-eq-success-text font-medium' : 'text-eq-danger-text'}>
                        {status === 'connected' ? (t('status.online') || 'Online') : 'OFFLINE'}
                    </span>
                 </div>

                 {status === 'connected' && systemStatus && (
                    <>
                        <div className="flex items-center gap-1.5">
                            <span className="text-eq-text-muted">{t('status.cpu') || 'CPU'}</span>
                            <span className={`font-medium ${systemStatus.cpu_percent > 80 ? 'text-eq-danger-text' : 'text-eq-text-primary'}`}>
                                {systemStatus.cpu_percent.toFixed(1)}%
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-eq-text-muted">{t('status.mem') || 'MEM'}</span>
                            <span className="font-medium text-eq-text-primary">
                                {Math.round(systemStatus.memory_mb / 1024 * 10) / 10}G
                            </span>
                        </div>
                    </>
                 )}
              </div>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-md text-eq-text-muted hover:text-eq-text-primary hover:bg-eq-bg-elevated transition-all"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs - Underline Style */}
      <div className="bg-eq-bg-surface border-b border-eq-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id ||
                (tab.id === 'tables' && activeTab.startsWith('table')) ||
                (tab.id === 'etl' && activeTab.startsWith('etl'))
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavigate(tab.id)}
                  className={`relative flex items-center gap-2 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive 
                      ? 'text-eq-text-primary' 
                      : 'text-eq-text-secondary hover:text-eq-text-primary'
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${isActive ? 'text-eq-primary-500' : 'text-eq-text-muted'}`} />
                  {tab.name}
                  {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-eq-primary-500 rounded-t-full"></span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 animate-fadeIn">
        {activeTab === 'tables' && <DataTableList onNavigate={handleNavigate} />}
        {activeTab === 'table-new' && <DataTableEditor tableId={undefined} cloneFromId={editId} onNavigate={handleNavigate} />}
        {activeTab === 'table-edit' && <DataTableEditor tableId={editId} cloneFromId={undefined} onNavigate={handleNavigate} />}
        {activeTab === 'etl' && <ETLTaskList />}
        {activeTab === 'etl-edit' && <ETLTaskEditor />}
        {activeTab === 'monitor' && <ProcessMonitor />}
      </main>
    </div>
  )
}

export default App
