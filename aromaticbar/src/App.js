import React, {useState} from 'react'
import Tabs from './components/Tabs'
import FormSection from './components/FormSection'
import Tables from './components/Tables'

const App = () => {
  const [activeTab, setactiveTab] = useState("tab1")

  const handleTab1 = () => {
    setactiveTab("tab1")
  }

  const handleTab2 = () => {
    setactiveTab("tab2")
  }
  return (
    <div className="App">
      <Tabs data={{handleTab1, handleTab2, activeTab}}/>
      {
        activeTab === "tab1" ? <FormSection/> : <Tables/>
      }
    </div>
  )
}

export default App