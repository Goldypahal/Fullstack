import React from 'react'

function DraftCard({ draft, onDelete }){
  return (
    <li className="card">
      <div><strong>{draft.title || '(untitled)'}</strong></div>
      <div className="meta">{draft.content?.slice(0,100)}</div>
      <div className="actions"><button onClick={() => onDelete(draft.id)}>Delete</button></div>
    </li>
  )
}

export default React.memo(DraftCard)
