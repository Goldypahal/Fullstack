import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllDrafts } from '../features/drafts/draftsSelectors'
import { deleteDraft } from '../features/drafts/draftsSlice'
import DraftCard from '../components/DraftCard'

export default function Drafts(){
  const drafts = useSelector(selectAllDrafts)
  const dispatch = useDispatch()
  const onDelete = useCallback(id=>dispatch(deleteDraft(id)),[dispatch])

  return (
    <div>
      <h2>Drafts</h2>
      {drafts.length===0? <div className="muted">No drafts</div> : (
        <ul className="list">
          {drafts.map(d=> <DraftCard key={d.id} draft={d} onDelete={onDelete} />)}
        </ul>
      )}
    </div>
  )
}
