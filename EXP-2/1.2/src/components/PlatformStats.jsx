import React from 'react'

function PlatformStats({ counts }){
  const entries = Object.entries(counts||{})
  if(entries.length===0) return <div className="muted">No platform data</div>
  return (
    <div className="platform-stats">
      {entries.map(([k,v])=> (
        <div key={k} className="stat">{k}: <strong>{v}</strong></div>
      ))}
    </div>
  )
}

export default React.memo(PlatformStats)
