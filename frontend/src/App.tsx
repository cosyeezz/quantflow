import { useState } from 'react'
import { Database, Table2, Activity, Moon, Sun, Command } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import DataTableList from './components/DataTableList'
import DataTableEditor from './components/DataTableEditor'
import LanguageSwitcher from './components/LanguageSwitcher'
import { useWebSocket } from './hooks/useWebSocket'
import { useTheme } from './contexts/ThemeContext'
import { Button } from './components/ui/button'
import Select from './components/ui/Select'
import Input from './components/ui/input'
import Tooltip from './components/ui/tooltip'
import Modal from './components/ui/modal'

// Placeholder for missing components
const ProcessMonitor = () => <div className="p-4">Process Monitor Placeholder</div>
const ETLTaskList = () => <div className="p-4">ETL Task List Placeholder</div>
const ETLTaskEditor = () => <div className="p-4">ETL Task Editor Placeholder</div>

function App() {
  const { t } = useTranslation('translation', { keyPrefix: 'easyquant' })
  const [activeTab, setActiveTab] = useState('tables') // Default to tables
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
    // Temporarily hide other tabs or keep them as placeholders if needed for layout verification
    { id: 'etl', name: t('nav.pipelines') || 'Pipelines', icon: Database },
    { id: 'monitor', name: t('nav.monitor') || 'Monitor', icon: Activity },
    { id: 'playground', name: 'UI Playground', icon: Command },
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
        {activeTab === 'playground' && <UIPlayground />}
      </main>
    </div>
  )
}

import Checkbox from './components/ui/checkbox'
import Switch from './components/ui/switch'
import Toast from './components/ui/toast'
import { Heading, Text } from './components/ui/typography'

// Minimal Playground Component
const UIPlayground = () => {
  const [showModal, setShowModal] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isSwitched, setIsSwitched] = useState(false)

  const items = [
    { value: 1, name: 'Option 1' },
    { value: 2, name: 'Option 2' },
    { value: 3, name: 'Option 3 - Disabled', disabled: true },
  ]

  const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    Toast.notify({
      type,
      message: `This is a ${type} toast message!`,
    })
  }

  return (
    <div className="space-y-12 p-8 max-w-4xl mx-auto pb-32">
      <section className="space-y-6">
        <Heading level="h2" className="border-b pb-2">Typography</Heading>
        <div className="space-y-4">
          <div className="space-y-1">
            <Heading level="h1">Heading 1</Heading>
            <Text size="xl" dimmed>Extra Large Text (Dimmed)</Text>
          </div>
          <div className="space-y-1">
            <Heading level="h2">Heading 2</Heading>
            <Text size="lg">Large Text</Text>
          </div>
          <div className="space-y-1">
            <Heading level="h3">Heading 3</Heading>
            <Text size="md">Medium Text (Default)</Text>
          </div>
          <div className="space-y-1">
            <Heading level="h4">Heading 4</Heading>
            <Text size="sm">Small Text</Text>
          </div>
          <div className="space-y-1">
            <Heading level="h5">Heading 5</Heading>
            <Text size="xs">Extra Small Text</Text>
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <Text weight="bold">Bold Text</Text>
            <Text weight="semibold">Semibold Text</Text>
            <Text weight="medium">Medium Text</Text>
            <Text weight="normal">Normal Text</Text>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Heading level="h2" className="border-b pb-2">Buttons</Heading>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="large">Large</Button>
          <Button variant="primary" destructive>Destructive</Button>
        </div>
      </section>

      <section className="space-y-4">
        <Heading level="h2" className="border-b pb-2">Inputs & Controls</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input placeholder="Default Input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} showClearIcon onClear={() => setInputValue('')} />
          <Input placeholder="With Icon" showLeftIcon />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Destructive" destructive defaultValue="Error value" />
        </div>
        <div className="flex gap-8 items-center mt-4">
           <div className="flex items-center gap-2">
             <Checkbox id="chk1" checked={isChecked} onCheck={() => setIsChecked(!isChecked)} />
             <label htmlFor="chk1" className="cursor-pointer select-none text-sm" onClick={() => setIsChecked(!isChecked)}>Checkbox</label>
           </div>
           <div className="flex items-center gap-2">
             <Checkbox id="chk2" checked={true} disabled />
             <label htmlFor="chk2" className="text-sm text-text-tertiary">Disabled Checked</label>
           </div>
           <div className="flex items-center gap-2">
             <Switch checked={isSwitched} onChange={setIsSwitched} />
             <label className="cursor-pointer select-none text-sm" onClick={() => setIsSwitched(!isSwitched)}>Switch</label>
           </div>
            <div className="flex items-center gap-2">
             <Switch checked={true} disabled />
             <label className="text-sm text-text-tertiary">Disabled Switch</label>
           </div>
        </div>
      </section>

      <section className="space-y-4">
        <Heading level="h2" className="border-b pb-2">Selects</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-2">
            <Heading level="h3" as="h3" className="text-sm font-medium">Default Select</Heading>
            <Select
              options={[
                { value: 1, label: 'Option 1' },
                { value: 2, label: 'Option 2' },
                { value: 3, label: 'Option 3' },
              ]}
              value={1}
              onChange={(val) => console.log('Selected:', val)}
              placeholder="Select an option"
            />
          </div>
          <div className="space-y-2">
            <Heading level="h3" as="h3" className="text-sm font-medium">Clearable Select</Heading>
            <Select
              options={[
                { value: 'a', label: 'Alpha' },
                { value: 'b', label: 'Beta' },
                { value: 'c', label: 'Gamma' },
              ]}
              value="b"
              onChange={(val) => console.log('Selected:', val)}
              clearable
              onClear={() => console.log('Cleared')}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Heading level="h2" className="border-b pb-2">Overlays & Feedback</Heading>
        <div className="flex gap-4 items-center flex-wrap">
          <Tooltip popupContent="This is a nice tooltip!">
             <Button variant="secondary">Hover me (Tooltip)</Button>
          </Tooltip>

          <Button variant="primary" onClick={() => setShowModal(true)}>Open Modal</Button>
          
          <div className="h-8 w-px bg-gray-200 mx-2"></div>
          
          <Button variant="secondary" onClick={() => showToast('success')}>Success Toast</Button>
          <Button variant="secondary" onClick={() => showToast('error')}>Error Toast</Button>
          <Button variant="secondary" onClick={() => showToast('warning')}>Warning Toast</Button>
          <Button variant="secondary" onClick={() => showToast('info')}>Info Toast</Button>
        </div>
      </section>

      <Modal 
        isShow={showModal} 
        onClose={() => setShowModal(false)} 
        title="Example Modal"
        description="This is a standard modal dialog migrated from the legacy codebase."
        closable
      >
        <div className="mt-4 space-y-4">
          <p className="text-text-secondary">It uses Headless UI Dialog and supports various configurations.</p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>Confirm</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default App