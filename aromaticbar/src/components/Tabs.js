import React from 'react'
import '../assets/css/Tab.css'

const Tabs = (props) => {
  return (
    <div className='tabSec tabbg'>
        <ul className='tablist'>
            <li className={props.data.activeTab === "tab1" ? "tabitem tabitemActivecolor transition-transform" : "tabitem tabitemNonActivecolor transition-transform"} onClick={props.data.handleTab1}><a href='#'>Form</a></li>
            <li className={props.data.activeTab === "tab2" ? "tabitem tabitemActivecolor transition-transform" : "tabitem tabitemNonActivecolor transition-transform"} onClick={props.data.handleTab2}><a href='#'>Table</a></li>
        </ul>
    </div>
  )
}

export default Tabs